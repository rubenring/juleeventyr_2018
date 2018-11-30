import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './pageFive.css';
import { CheckUsername } from '../commen/CheckUsername';
import { InputAndButton } from '../commen/InputAndButton';
import queryString from 'query-string'
import { apiCallPost, apiCallGet } from '../utils';

export class PageFive extends Component {
  constructor(props){
    super(props)
    const { username } = queryString.parse(props.location.search);
    this.username = username;
    this.state = {
      hasUsername: false,
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

  render(){
    return (
      <CheckUsername
        hasUsername={this.state.hasUsername}
      >
      {/* {
        this.state.level < 4 ? <Redirect to={`/?username=${this.username}`}/> : null 
      } */}
      <section className='page-five'>


      </section>
      </CheckUsername>
    );
  }
};