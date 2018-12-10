import React, { Component, Fragment } from 'react';
import './completePage.css';
import queryString from 'query-string';
import { CheckUsername } from '../commen/CheckUsername';
import { apiCallPost, apiCallGet } from '../utils';
import bankGold from '../content/bank_gold.jpg';

export class CompletedPage extends Component {
  constructor(props){
    super(props);
    const { username } = queryString.parse(props.location.search);
    this.username = username;
    this.state = {
      hasUsername: false,
      username: '',
      fetchingUser: false
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
      })
      .then(() => {
        apiCallGet(`/api/users/${this.username}/levels/next`)
        .then(res => {
          this.setState({
            ...this.state,
            allCompleted: res.completed,
            url: res.url
          }) 
        })
        .catch(x => {
          console.log(x);
        })
      })
    }
  }

  render(){
    return (
      <CheckUsername
        hasUsername={this.state.hasUsername}
      >
        <section className='completed-page'>
            {this.state.allCompleted ? 
              <Fragment>
                <h2 className='completed-tekst'>Gratulerer! Gullet er deres! Nå kan dere bevege dere videre til neste oppgave</h2> 
                <h1 className='completed-tekst-url'>{this.state.url}</h1>
                <img className='gullet-img' src={bankGold} alt="gullet"/>
              </Fragment>  
            : null }
        </section>
      </CheckUsername>

    );
  }

};

export default CompletedPage;