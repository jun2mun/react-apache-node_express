//import React, { Component } from "react";
import { render } from '@testing-library/react';
import axios from 'axios';
//import { response } from 'express';
import React from 'react';
import {Line} from 'react-chartjs-2'
//import Search from 'react-search'
import Search from '../components/Search'
//import "./Graph.css";


class Graph extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      keyword : ' ',
      Search_result : [],
      labels: [],
      datasets: [
        {
          label: 'station_4',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: []
        }
      ]
  };
}

  getDB_name = async () => {
    await axios.get('/Graph')
      .then((response) => {
        const result = response['data'];
        const label_result =[];
        const data_result =[];
        //console.log(result[0]['StationName']);
        for (var i in result){
          label_result.push(result[i]['StationName']);
          data_result.push(result[i]['StationName']);
        }
        //this.setState({labels : label_result})  --> test
      })
      //.then( response => { console.log(response)})
      .catch( response => { console.log(response)});
      //console.log(this.state.labels);
  };

  getDB_data = async () => {
    await axios.get('/Data')
      .then((response) => {
        const result = response['data'];
        const parkingBikeTotCnt_result =[];
        let { datasets} = this.state;
        datasets = datasets[0]
        //console.log(datasets);
        //const data_result =[];
        //console.log(result[0]['parkingBikeTotCnt']);
        for (var i in result){
          //console.log(result[i]);
          parkingBikeTotCnt_result.push(result[i]['parkingBikeTotCnt']);
        }
        this.setState(prevstate =>({
          datasets : prevstate.datasets.map(
            obj => Object.assign(obj, { data : parkingBikeTotCnt_result})
          )
        }));
      })
      //.then( response => { console.log(response)})
      .catch( response => { console.log(response)});
      //console.log(this.state.datasets[0].data);
  };

  getDB_Time = async () => {
    await axios.get('/Data')
      .then((response) => {
        const result = response['data'];
        const Time_result =[];
        let { datasets} = this.state;
        datasets = datasets[0]
        //console.log(datasets);
        //const data_result =[];
        //console.log(result[0]['parkingBikeTotCnt']);
        for (var i in result){
          //console.log(result[i]);
          Time_result.push(result[i]['Time']);
        }
        this.setState({labels : Time_result})
        
      })
      //.then( response => { console.log(response)})
      .catch( response => { console.log(response)});
      //console.log(this.state.datasets[0].data);
  };

  Search_result(searchValue, cb){
    axios.get('/Graph')
        .then((response) => {
        const result = response['data'];
        const label_result =[];
        //console.log(result[0]['StationName']);
        for (var i in result){
            if(result[i]['StationName'].indexOf(this.items) !== -1){
                label_result.push(result[i]['StationName']);
            }
        }
        console.log(label_result);
        this.setState({Search_result : label_result})
        cb(searchValue)
  })
  //.then( response => { console.log(response)})
  .catch( response => { console.log(response)});
  //console.log(this.state.labels);
  };

  handleChange(e) {
    this.setState({
      keyword : e.target.value
    });
  }
  componentDidMount() {
    this.timeID = setInterval(
      () => this.getDB_data(),
      100000
    )
    this.time_TIME = setInterval(
      () => this.getDB_Time(),
      100000
    )
    this.getDB_name();
    this.getDB_data();
    this.getDB_Time();
  }
  componentWillUnmount() {
    clearInterval(this.timeID)
    clearInterval(this.time_TIME)
  }

  render() {
    //console.log(this.state);
    let items = this.state.Search_result
    return (
      <div>
          <h2>따릉이 시간대별 거치 대수(10분 마다 업데이트)</h2>
          <button type="button" onclick="../components/Search.js">1시간</button>
          <button type="button" onclick="../components/Search.js">12시간</button>
          <button type="button" onclick="../components/Search.js">1일</button>
          <Line data={this.state} />
          
          <input className="input_search" type="text"  placeholder="검색어를 입력하세요."/>
          <button> 검색</button>
      </div>
    );
    }
}
/*
function Graph(props) {
  console.log(props);
  return (
    <div className="about__container">
      <span>
        “Freedom is the freedom to say that two plus two make four. If that is
        granted, all else follows.”
      </span>
      <span>− George Orwell, 1984</span>
    </div>
  );
}
*/

export default Graph;


///https://stackoverflow.com/questions/49477547/setstate-of-an-array-of-objects-in-react
