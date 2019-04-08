import React, { Component } from 'react';
//import logo from './logo.svg';
import c3 from 'c3';

class Chart extends Component {

    componentWillReceiveProps() {

       this.chart = c3.generate({
        bindto: '#'+this.props.ident,
        size: {
    height: 500
},
        data: {
          columns: this.props.datepub,
          type: this.props.chartType,
          colors: {
              "Bin 1": '#1AA086',
              "Bin 2": '#25484a',
          }
        },
        axis: {
          y: {
            label: {
                text: 'Bin cycles',
                position: 'outer-middle'
              },
            min: 0, //Minimum and maximum values for our % calculation
            max: 10,
            padding: {top:15, bottom:0} //here we are telling the graph to fully display with the padding option
          },
          x: {
            label: {
                text: 'Days',
                position: 'outer-center-top'
              },
              min: 1,
              max: 7
          }
        },
        legend: {
            position: 'right'
        },
        padding: {
  bottom: 30
},
      });
    }


    render() {
      return <div id={this.props.ident}></div>;
    }
   }

   Chart.defaultProps = {
    chartType: 'spline'
   }

   export default Chart;
