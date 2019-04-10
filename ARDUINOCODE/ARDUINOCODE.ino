#include <EthernetClient.h>
#include <Ethernet.h>
#include <Dhcp.h>
#include <EthernetServer.h>
#include <Dns.h>
#include <EthernetUdp.h>
#include <SPI.h>
#include <PubNub.h>
#include <SharpIR.h>
#include <LiquidCrystal.h>

byte mac[] = { 0x00, 0x0E, 0xEF, 0x00, 0x00, 0x94 }; //define mac as mac address

char pubkey[] = "pub-c-74f667c6-3fb9-426d-b8f6-80838600350c"; //define PubNub publish key
char subkey[] = "sub-c-b95070f4-3908-11e9-b86f-06e8d5f9a4fd"; //define PubNub subscribe key
char channel[] = "percentFull"; //define channel as PubNub percentFull channel
char cyclesChannel[] = "cycles"; //define cyclesChannel as PubNub cycles channe;

int count = 0; //define count as global variable(integer) with starting value of 0
int distance = 0; //define distance as global variable(integer) with starting value of 0
int previousDistance = 0; //define distance as global variable(integer) with starting value of 0
int percentFull = 0; //define percentFull as global variable(integer) with starting value of 0

SharpIR sensor( SharpIR::GP2Y0A02YK0F, A0 ); //define Sharp Infared Sensor model and input pin A0

LiquidCrystal lcd(2, 3, 4, 5, 6, 7); //set LCD pins making sure to not use 10-13 as they are used by the ethernet shield

// the setup routine runs once when you press reset:
void setup() {

    lcd.begin(16, 4); //call lcd begin function passing through the size of the lcd screen(16:4)

    Serial.begin(9600);  //initialize serial communication at 9600 bits per second:

    while (!Ethernet.begin(mac)) { //while ethernet has not successfully begun
        Serial.println("Ethernet setup error"); //print ethernet setup error
        delay(1000); //delay 1 sec
    }
    Serial.println("Ethernet set up"); //print ethernet set up to serial once set up

    PubNub.begin(pubkey, subkey); //call PubNub begin function passing in publish key and subscription key as parameters
    Serial.println("PubNub set up"); //print PubNub set up to serial

}


// the loop routine runs over and over again forever:
void loop() {

//FOR LOOP GETTING THE HOURLY PERCENTAGE FULL, DISPLAYING IT ON THE LCD AND FILLING VARIABLES WHICH AT THE END OF THE DAY ARE SENT TO PUBNUB
    for (int i = 0; i <= 24; i++) { //loop 24 times for every hour



        Serial.println("Count:");
        Serial.println(count); //print count to serial

        distance = sensor.getDistance(); //set distance as sensor value

        Serial.println("Current Distance:");
        Serial.println(distance); //print the distance to serial


        if (distance >60) { //if distance is greater than 60 (the height of the bin) 
            percentFull=100; //then percentFull=100
        } else { //else
            percentFull = map(distance, 19, 60, 100, 0); //set percentFull as distance variable mapped into a percentage 
        }

        if (percentFull == 100) { //if percentfull is 100
            Serial.println("BIN FULL!!!"); //print bin full to log
            lcd.clear(); //clear lcd
            lcd.setCursor(0,0); //set cursor to top left corner
            lcd.print("BIN FULL"); //print bin full to LCD

        } else if (percentFull > 75 && percentFull <100) { //else if percentfull is between 76 and 99
            Serial.println("BIN NEARLY FULL");
            lcd.clear();
            lcd.setCursor(0,0); 
            lcd.print("BIN NEARLY FULL");

        } else if (percentFull > 10 && percentFull <76) { //else if percentfull is between 11 and 75
            Serial.println("BIN NOT FULL");
            lcd.clear();
            lcd.setCursor(0,0); 
            lcd.print("BIN NOT FULL");

        } else if (percentFull < 11) { //else if percentfull is less than 11
            Serial.println("BIN NOT FULL");
            lcd.clear();
            lcd.setCursor(0,0); 
            lcd.print("BIN EMPTY");

        }

//CHECK IF BIN CYCLE HAS OCCURED 

        int change = previousDistance-distance; //change is equal to the previous distance minus current distance
        Serial.println("Change:"); 
        Serial.println(change); //print the change to serial

        if (change>0 && percentFull==100) { //if the distance has changed positively and the bin is full
            count++; //then add 1 to count 
            Serial.println("Day Count:");
            Serial.println(count); //print updated count to serial
        }

        delay(1500); //half the delay before doing loop again, should be set to 43200000m/s for half day when running in a real bin, for testing purposes delay is set to only 1.5 seconds
        
        previousDistance = distance; //set previousDistance as the distance
        Serial.println("previousDistance:");
        Serial.println(previousDistance); //print this previousDistance to serial

        delay(1500); //other half of delay, split up so that previous distance can be obtained before getting the new distance, should be set to 43200000m/s for half day when running in a real bin, for testing purposes delay is set to only 1.5 seconds

    }


//ONCE THE DAY FOR LOOP IS COMPLETE:

//setting up Ethernet so we can send data

    Ethernet.maintain(); //allows for the renewal of DHCP leases

    EthernetClient *client; //create a client which connects to client variable(will be PubNub publish)

//SENDING PUBNUB MESSAGE 1: BIN CYCLES

    int bin2Count = random(1, 10); //set bin2 count as fake value between 1 and 10

    char msgCycle[50] = "{\"eon\":{\"bin1\":"; //create msgCycle char value with 50 character length
    char endofmessage[30] = ",\"bin2\":"; //create endofmessage char value with 30 character length

    sprintf(msgCycle + strlen(msgCycle), "%d", count); //format msgCycle and count integer interger to string
    sprintf(endofmessage + strlen(endofmessage), "%d", bin2Count); //format endofmessage and bin2Count integer to string

    strcat(msgCycle, endofmessage);
    strcat(msgCycle, "}}");

    Serial.print("publishing message: "); //print to serial
    Serial.println(msgCycle); //print msgCycle to serial
    client = PubNub.publish(cyclesChannel, msgCycle); //set client to Pubnub publish function taking CyclesChannel and msgCycle as parameters
    if (!client) { //if not client aka PubNub publish didn't work
        Serial.println("publishing error");  //print publishing error to serial
    } else {
        client->stop(); //else (if it worked), stop publishing(we don't want it to continually loop)
    }


//SENDING PUBNUB MESSAGE 2: PERCENT FULL

//same proccess as 1st message

    int percentFullBin2 = random(1, 100);

    char msg[50] = "{\"eon\":{\"bin1\":";
    char endMessage[30] = ",\"bin2\":";


    sprintf(msg + strlen(msg), "%d", percentFull);
    sprintf(endMessage + strlen(endMessage), "%d", percentFullBin2);

    strcat(msg, endMessage);
    strcat(msg, "}}");

    Serial.print("publishing message: ");
    Serial.println(msg);
    client = PubNub.publish(channel, msg);
    if (!client) {
        Serial.println("publishing error");
    } else {
        client->stop();
    }

    //RESETTING DAY BIN CYCLE COUNT

    delay(1); // smallest possible 1 m/s delay to allow reset of count before new day

    count = 0; //reset the count to 0 at the end of the day
 

}
