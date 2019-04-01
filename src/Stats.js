
import React, { Component } from 'react';
import PubNub from 'pubnub';
import Chart from './Chart';
import './Status.css';



  class Stats extends Component {
    _setBarChart = () => {
      console.log("Bar");
      this.setState({ chartType: 'bar' });
  }
  _setLineChart = () => {
      console.log("Line");
      this.setState({ chartType: 'spline' })
  }
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
    console.log(this.datepub[0]);
    console.log(this.datepub[[0][0]]);
    }
    render() {
      return (
          <div className="Status">
          <header>
          <Chart ident="chart1" datepub = {this.state.datepub} pubnub={this.state.pubnub} channel={this.state.channel} chartType={this.state.chartType}/>
          <button className="chart" onClick={this._setLineChart}>Line Chart</button>
          <button className="chart" onClick={this._setBarChart}>Bar Chart</button>
          </header>
        </div>

      );
    }
  }

export default Stats;
