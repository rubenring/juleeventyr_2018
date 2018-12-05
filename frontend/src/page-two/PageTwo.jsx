import React, { Component } from 'react';
import './pageTwo.css';
import { apiCallGet, apiCallPost } from '../utils';
import queryString from 'query-string';
import { CheckUsername } from '../commen/CheckUsername';
import { NesteOppgaveLenke } from '../commen/NesteOppgaveLenke';
import { Redirect } from 'react-router-dom';
import lightbulbOn from '../content/lightbulb_on.png';
import lightbulbOff from '../content/lightbulb_off.png';
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
      console.log('svar')
  }
  render(){

    return (
      <CheckUsername
        hasUsername={this.state.hasUsername}
      >
        {/* {
          this.state.level < 1 ? <Redirect to={`/?username=${this.username}`}/> : null 
        } */}
        <section className='page-two'>
          <Lightbulbs lightbulbs={this.state.lightbulbs} changeLight={this.changeLight} />
          <Hint lightbulbs={this.state.lightbulbs} />
          <button 
            className='answer-button'
            onClick={this.svar}
          >
              <p className='button-text'>Send svar</p>
          </button>
        </section>  
      </CheckUsername>
    );
  }

};