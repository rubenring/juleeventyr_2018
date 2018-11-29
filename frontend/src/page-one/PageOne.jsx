import React, { Component } from 'react';
import './pageOne.css';
import {Letter} from './Letter';
import { letters } from './letters'
import { InputAndButton } from '../commen/InputAndButton';
import queryString from 'query-string';
import { apiCallPost, apiCallGet } from '../utils';
import { NesteOppgaveLenke } from '../commen/NesteOppgaveLenke';
import { CheckUsername } from '../commen/CheckUsername';
import Vault from '../content/bank_vault_door.jpg'

export class PageOne extends Component {
  constructor(props){
    super(props);
    const { username } = queryString.parse(props.location.search);
    this.username = username;
    this.state = {
      value: '',
      isCompleted: null,
      hasUsername: false
    };
  }
  // componentDidMount(){
  //   const url = `/api/${this.username}/progress`;
  //   if(this.username){
  //     apiCallGet(url)
  //       .then(res => {
  //         this.setState({
  //           level: res.level,
  //           hasUsername: res.hasUsername,
  //         })
  //       });
  //   }
  // }

  render(){
    return (
      <CheckUsername
        hasUsername={this.state.hasUsername}
      >
        <section className='page-one'>
            <div className='answer-input-container'>
                <input className='answer-input' type="text"/>
                <input className='answer-input' type="text"/>
                <input className='answer-input' type="text"/>
                <input className='answer-input' type="text"/>
            </div>
        </section>
      </CheckUsername>

    );
  }

};