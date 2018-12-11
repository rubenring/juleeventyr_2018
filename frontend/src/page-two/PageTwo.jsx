import React, { Component } from 'react';
import './pageTwo.css';
import { apiCallPost } from '../utils';
import queryString from 'query-string';
import { CheckUsername } from '../commen/CheckUsername';
import Lightbulbs from './Lightbulbs';
import Hint from './Hint';

export class PageTwo extends Component {
  constructor(props){
    super(props);
    const { username } = queryString.parse(props.location.search);
    this.username = username;
    this.changeLight = this.changeLight.bind(this);
    this.svar = this.svar.bind(this);

    this.state = {
      hint:'http://spellbackwards.com/',
      lightbulbs: [{
        id: 1,
        on: false
      },{
        id: 2,
        on: false
      },{
        id: 3,
        on: false
      },{
        id: 4,
        on: false
      },{
        id: 5,
        on: false
      },{
        id: 6,
        on: false
      },{
        id: 7,
        on: false
      },{
        id: 8,
        on: false
      },{
        id: 9,
        on: false
      },{
        id: 10,
        on: false
      }],
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
  changeLight(id) {
      const lightbulbs = this.state.lightbulbs.map(x => {
        if(x.id === id){
          return {
            ...x,
            on: !x.on
          }
        }else{
          return x
        }
      })
      this.setState({
        ...this.state,
        lightbulbs 
      })
  };
  svar() {
    const url = `/api/users/${this.username}/answers`;
    const reqModel = {
      room: 1,
      answer: this.state.lightbulbs
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
  render(){

    return (
      <CheckUsername
        hasUsername={this.state.hasUsername}
      >
        {this.state.isCompleted ? <p className='completed'>Dere har løst oppgaven, gå videre til neste rom!</p>: null}
        {!this.state.fetchingUser ?  <section className='page-two'>
          <Lightbulbs lightbulbs={this.state.lightbulbs} changeLight={this.changeLight} />
          <Hint lightbulbs={this.state.lightbulbs} />
          <button 
            className='answer-button'
            onClick={this.svar}
          >
              <p className='button-text'>Send svar</p>
          </button>
        </section> : null }
      </CheckUsername>
    );
  }

};