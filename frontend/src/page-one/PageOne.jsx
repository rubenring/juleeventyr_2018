import React, { Component } from 'react';
import './pageOne.css';
import queryString from 'query-string';
import { CheckUsername } from '../commen/CheckUsername';
import { apiCallPost, apiCallGet } from '../utils';

export class PageOne extends Component {
  constructor(props){
    super(props);
    const { username } = queryString.parse(props.location.search);
    this.username = username;
    this.state = {
      hasUsername: false,
      room1: {},
      room2: {},
      room3: {},
      room4: {},
      allCompleted: false
    };
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
        if(res.hasUsername){
          apiCallGet(`/api/users/${res.username}/progress`)
            .then(res => {
              this.setState({
                ...this.state,
                ...res,
              })
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
        <section className='page-one'>
            <div className='answer-input-container'>
                <input className='answer-input' value={this.state.room1.answer || ''} disabled type="text"/>
                <input className='answer-input' value={this.state.room2.answer || ''} disabled type="text"/>
                <input className='answer-input' value={this.state.room3.answer || ''} disabled type="text"/>
                <input className='answer-input' value={this.state.room4.answer || ''} disabled type="text"/>
            </div>
        </section>
      </CheckUsername>

    );
  }

};