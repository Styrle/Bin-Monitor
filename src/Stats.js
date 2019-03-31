import React, { Component } from 'react';
//import logo from './logo.svg';
import PubNub from 'pubnub';
import Chart from './Chart';

import Table from 'react-bootstrap/Table'
import './Stats.css';


class Stats extends Component {
  constructor(props) {
    super(props);
    this.pubnub = new PubNub({
      publishKey: 'pub-c-74f667c6-3fb9-426d-b8f6-80838600350c',
      subscribeKey: 'sub-c-b95070f4-3908-11e9-b86f-06e8d5f9a4fd'

      });
      this.datepub = [[]];
      this.state = {
        chartType: 'bar',
        datepub: this.datepub,
        pubnub: this.pubnub,
        channel: 'test'
    };
    this.pubnub.history(
      {
    channel : 'test',
    count : 10
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
     <td>Table cell</td>
     <td>Table cell</td>
   </tr>
   <tr>
     <td>2</td>
     <td>Table cell</td>
     <td>Table cell</td>
     <td>Table cell</td>
   </tr>
   <tr>
     <td>3</td>
     <td>Table cell</td>
     <td>Table cell</td>
     <td>Table cell</td>
   </tr>
   <tr>
     <td>4</td>
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

export default Stats
