
import React, { Component } from 'react';
import PubNub from 'pubnub';
import Chart from './Chart';
import './Stats.css';



  class Stats extends Component {
    _setBarChart = () => {
      console.log("Bar");
      this.setState({ chartType: 'bar' });
  }
    constructor(props) {
      super(props);
      this.pubnub = new PubNub({
        publishKey: 'pub-c-74f667c6-3fb9-426d-b8f6-80838600350c',
        subscribeKey: 'sub-c-b95070f4-3908-11e9-b86f-06e8d5f9a4fd'

        });
        this.datepub = [[],[]];//define datepub as array with multiple items
        this.state = {
          chartType: 'bar',//define chart state as bar chart
          datepub: this.datepub,
          pubnub: this.pubnub,
          channel: 'cycles'
      };
      this.pubnub.history(
        {
      channel : 'cycles',
      count : 8
      },
      (function (status, response) {
        for(let i = 0; i < response.messages.length; i++) {
          this.datepub[0][i] = response.messages[i]['entry']['eon']['bin1']; //reading response messages into array, choosing the bin1 message
          this.datepub[1][i] = response.messages[i]['entry']['eon']['bin2']; //reading response messages into array, choosing the bin2 message
        }
      //  this.datepub[1] = this.datepub[0].slice().reverse();	// reversing second array
        this.datepub[0].unshift('Bin 1'); // adding label to start of array 0
        this.datepub[1].unshift('Bin 2'); //adding label to start of array 1
        this.setState({datepub:this.datepub}); //update datepub
      }).bind(this)						//binding to present execution context
    );
    }
    render() {
      return (
          <div className="stats">
          <header>
          <h1>Historical Bin Statistics</h1>
          </header> {/*giving our page a name and the graph below, adding all of our data which is above and specifying where it is coming from using chart*/}
          <Chart ident="chart1" datepub = {this.state.datepub} pubnub={this.state.pubnub} channel={this.state.channel} chartType={this.state.chartType}/>
        </div>

      );
    }
  }

export default Stats;
