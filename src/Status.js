import React, { Component } from 'react';
//import logo from './logo.svg';
import PubNub from 'pubnub';
import Table from 'react-bootstrap/Table'
import './Status.css';

var currentStatus = [[],[]];
class Status extends Component {
  constructor(props) {
    super(props);
    this.pubnub = new PubNub({
      publishKey: 'pub-c-74f667c6-3fb9-426d-b8f6-80838600350c',
      subscribeKey: 'sub-c-b95070f4-3908-11e9-b86f-06e8d5f9a4fd',
      channel: 'percentFull'
      //here we are requesting our data from pubnub
      });
      this.datepub = [[],[]];
      this.state = {
        chartType: 'bar',
        datepub: this.datepub,
        pubnub: this.pubnub,
        channel: 'percentFull'
    };

    this.pubnub.history(
      {
    channel : 'percentFull',
    count : 1 //this defines our dataset for our graph
    },
    (function (status, response) {

        this.datepub[0][0] = response.messages[0]['entry']['eon']['bin1']; //reading response messages into array
        this.datepub[1][0] = response.messages[0]['entry']['eon']['bin2']; //reading response messages into array, choosing the bin2 message
     for(let i = 0; i < this.datepub.length; i++) { //loop through both items in this.datepub array
        if (this.datepub[i][0] === 100) { //if the percent full is equal to 100, status is full
        currentStatus[i] = ("FULL"); //set currentStatus variable as FULL
      } else if (this.datepub[i][0] >75 && this.datepub[i][0] <100){ //else if 76-99
        currentStatus[i] = ("NEARLY FULL");//status nearly full
      } else if (this.datepub[i][0] >10 && this.datepub[i][0] <76){ //else if 11-75
        currentStatus[i] = ("NOT FULL"); //not full status
      } else if (this.datepub[i][0] < 11){ //else if less than 11
        currentStatus[i] = ("EMPTY"); //empty status
      }
    }

      this.datepub[0].unshift('Bin 1'); // adding label to start of array 0
      this.datepub[1].unshift('Bin 2'); // adding label to start of array 1
      this.setState({datepub:this.datepub}); //update datepub
    }).bind(this)						//binding to present execution context
  );
  console.log(this.datepub);


}
render() {
 return (
//Here we are creating a table, this will then recieve data and display stats about the bin
<div className='Status'>
<header>
<h1>Bin Status</h1>
</header>
<Table responsive="sm">
 <thead>
   <tr>
     <th>Bin</th>
     <th>Type</th>
     <th>Status</th>
     <th>Percentage </th>
   </tr>
 </thead>
 <tbody>
   <tr>
     <td>{this.state.datepub[0][0]}</td>
     <td>General Waste</td>
     <td>{currentStatus[0]}</td>
     <td>{this.state.datepub[0][1]}</td>
   </tr>
   <tr>
     <td>{this.state.datepub[1][0]}</td>
     <td>Recycling</td>
     <td> {currentStatus[1]}</td>
     <td>{this.state.datepub[1][1]}</td>
   </tr>

 </tbody>
</Table>
<Table responsive="lg">
</Table>
<Table responsive="xl">
 <tbody>
 </tbody>
</Table>
</div>
 );
}
}

export default Status
