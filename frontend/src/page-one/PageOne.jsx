import React, { Component } from 'react';
import './pageOne.css';
import queryString from 'query-string';
import { CheckUsername } from '../commen/CheckUsername';

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
                <input className='answer-input' disabled type="text"/>
                <input className='answer-input' disabled type="text"/>
                <input className='answer-input' disabled type="text"/>
                <input className='answer-input' disabled type="text"/>
            </div>
        </section>
      </CheckUsername>

    );
  }

};