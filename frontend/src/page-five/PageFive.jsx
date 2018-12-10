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
  }
  componentDidMount(){
    if(this.username){
      this.setState({
        ...this.state,
        fetchingUser: true
      })
      const url = `/api/users/${this.username}`;
      apiCallPost(url)
      .then(res => {
        this.setState({
          hasUsername: res.hasUsername,
          username: res.username,
          fetchingUser: false
        })

      })
    }
  }

  sendAnswer(){

    const url = `/api/users/${this.username}/answers`;
    const reqModel = {
      room: 4,
      answer: this.state.sudokuBoard
    }
    apiCallPost(url, reqModel)
      .then(res => {
        if(res && res.success){
          this.setState({
            isCompleted: true,
          })
        }
      })
    
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
      {this.state.isCompleted ? <p className='completed'>Dere har løst oppgaven, gå videre til neste rom!</p>: null}
      {!this.state.fetchingUser ? <section className='page-five'>
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

      </section> : null }
      </CheckUsername>
    );
  }
};