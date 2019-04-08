import React, { Component } from 'react';
//import logo from './logo.svg';
import PubNub from 'pubnub';
import Table from 'react-bootstrap/Table'
import './Status.css';


class Status extends Component {
  constructor(props) {
    super(props);
    this.pubnub = new PubNub({
      publishKey: 'pub-c-74f667c6-3fb9-426d-b8f6-80838600350c',
      subscribeKey: 'sub-c-b95070f4-3908-11e9-b86f-06e8d5f9a4fd',
      channel: 'percentFull'
      //here we are requesting our data from pubnub
      });
      this.datepub = [[]];
      this.state = {
        chartType: 'bar',
        datepub: this.datepub,
        pubnub: this.pubnub,
        channel: 'percentFull'
    };

    this.pubnub.history(
      {
    channel : 'percentFull',
    count : 5 //this defines our dataset for our graph
    },
    (function (status, response) {
      for(let i = 0; i < response.messages.length; i++) {
        this.datepub[0][i] = response.messages[i]['entry']['eon']['sensor']; //reading response messages into array
      }
      this.datepub[0].unshift('Bin 1'); // adding label to start of array 0
      this.setState({datepub:this.datepub}); //update datepub
    }).bind(this)						//binding to present execution context
  );
  console.log(this.datepub);
}
render() {
 return (
//Here we are creating a table, this will then recieve data and display stats about the bin
<div className='Stats'>
<h1>BIN STATUS</h1>
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
     <td>1</td>
     <td>Table cell</td>
     <td>hello</td>
     <td>{this.state.datepub[0][1]}</td>
   </tr>
   <tr>
     <td>2</td>
     <td>Table cell</td>
     <td>Table cell</td>
     <td>Table cell</td>
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
