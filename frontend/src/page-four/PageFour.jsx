import React, { Component } from 'react';
import totalBlack from '../content/totalblack.png';
import './pageFour.css';
import { CheckUsername } from '../commen/CheckUsername';
import queryString from 'query-string'
import { apiCallPost } from '../utils';

export class PageFour extends Component {
  constructor(props){
    super(props)
    const { username } = queryString.parse(props.location.search);
    this.username = username;
    this.state = {
      value: '',
      fetchingUser: false,
      hasUsername: false,
    }
    this.sendSvar = this.sendSvar.bind(this);

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

  sendSvar(){
    if(this.state.value){
      const url = `/api/users/${this.username}/answers`;
      const reqModel = {
        room: 3,
        answer: this.state.value
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
  }

  render(){
    return (
      <CheckUsername
        hasUsername={this.state.hasUsername}
      >
      {this.state.isCompleted ? <p className='completed'>Dere har løst oppgaven, gå videre til neste rom!</p>: null}
      {!this.state.fetchingUser ? <section className='page-Four'>
        <div className='four-container-img'>
            <img src={totalBlack} alt='hidden' />
        </div>
        <div className='input-and-button'>
            <input 
              className='dark-room-input'
              type="text" 
              value={this.state.value}
              onChange={(e) => this.setState({value: e.target.value})}  
            />
            <div className='three-btn-container'>
              <button
                className='answer-three-button black'
                onClick={this.sendSvar}
              >
                Prøv lykken
              </button>
            </div>
        </div>
      </section>: null}
      </CheckUsername>
    );
  }

};