import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './pageFive.css';
import { CheckUsername } from '../commen/CheckUsername';
import SudokuBoard from './SudokuBoard';
import initialBoardState from '../Util/initialBoardState';

import queryString from 'query-string'
import { apiCallPost, apiCallGet } from '../utils';

export class PageFive extends Component {
  constructor(props){
    super(props)
    const { username } = queryString.parse(props.location.search);
    this.username = username;
    this.changeValue = this.changeValue.bind(this);
    this.sendAnswer = this.sendAnswer.bind(this);
    this.state = {
      hasUsername: false,
      sudokuBoard: initialBoardState
    }
    // this.lagreSvar = this.lagreSvar.bind(this);

  }
  // componentDidMount(){
  //   if(this.username){
  //     const url = `/api/${this.username}/progress`;
  //     apiCallGet(url)
  //       .then(res => {
  //         this.setState({
  //           level: res.level,
  //           hasUsername: res.hasUsername,
  //           username: res.username
  //         })
  //       })
  //   }
  // }
  // lagreSvar(){
  //   const svar = {
  //     svar: this.state.value
  //   };
  //   if(svar.svar){
  //     const url = `/api/${this.username}/answerlast`;
  //     apiCallPost(url, svar)
  //       .then(res => {
  //         this.setState({
  //           long: res.long,
  //           lat: res.lat
  //         })
  //       })
  //   }
  // }
  sendAnswer(){
    //     const url = `/api/${this.username}/answerlast`;
    //     apiCallPost(url, this.state.sudokuBoard)
    //       .then(res => {
    //          console.log(res)
    //       })
  }
  changeValue(e, input){
    this.setState({
      ...this.state,
      sudokuBoard: this.state.sudokuBoard.map(x => {
        if(x.id === input.id){
          return {
            ...x,
            value: e.target.value
          }
        }
        return x;
      })
    })
  }
  render(){
  
    return (
      <CheckUsername
        hasUsername={this.state.hasUsername}
      >
      {/* {
        this.state.level < 4 ? <Redirect to={`/?username=${this.username}`}/> : null 
      } */}
      <section className='page-five'>
        <div
          className='page-five-content'
        >
          <SudokuBoard changeValue={this.changeValue} sudokuBoard={this.state.sudokuBoard} />
        </div>
        <div
          className='page-five-btn-content'
        >
          <button
            className='answer-three-button'
            onClick={this.sendAnswer}
          > 
              Prøv lykken
          </button>
        </div>

      </section>
      </CheckUsername>
    );
  }
};