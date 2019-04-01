import React, { Component } from 'react';
//import logo from './logo.svg';
import c3 from 'c3';

class Chart extends Component {

    componentWillReceiveProps() {

       this.chart = c3.generate({
        bindto: '#'+this.props.ident,
        data: {
          columns: this.props.datepub,
          type: this.props.chartType,
          colors: {
              data1: '#1AA086',
              data2: '#1AA086',
              data3: '#1AA086'
          }
        },
        axis: {
          y: {
            min: 0, //Minimum and maximum values for our % calculation
            max: 100,
            padding: {top:15, bottom:0} //here we are telling the graph to fully display with the padding option
          }
        }
      });
    }

    componentDidUpdate() {
      this._updateChart();
    }
    _updateChart() {
      this.chart.load({columns: this.props.datepub, type: this.props.chartType});

    }
    render() {
      return <div id={this.props.ident}></div>;
    }
   }

   Chart.defaultProps = {
    chartType: 'spline'
   }

   export default Chart;
