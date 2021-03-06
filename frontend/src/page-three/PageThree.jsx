import React, { Component } from 'react';
import { CheckUsername } from '../commen/CheckUsername';
import './pageThree.css';
import queryString from 'query-string'
import { apiCallPost } from '../utils';

export class PageThree extends Component {
  constructor(props){
    super(props)
    const { username } = queryString.parse(props.location.search);
    this.username = username;
    this.state = {
      inputWord: '',
      hasUsername: false,
      isCompleted: false
    }
    this.cipher = this.cipher.bind(this);
    this.endreTekst = this.endreTekst.bind(this);
    this.lagreSvar = this.lagreSvar.bind(this);

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

  lagreSvar(){
    if(this.state.inputWord){
      const url = `/api/users/${this.username}/answers`;
      const reqModel = {
        room: 2,
        answer: this.state.inputWord
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

  endreTekst (e) {
    this.setState({
      ...this.state,
      inputWord: e.target.value
    })
  };

  cipher(verdi, amount) {
      let output = '';
      const input = verdi.toLowerCase();
      for (let i = 0; i < verdi.length; i++) {
        let c = input[i];
        if (c.match(/[a-z]/i)) {
          const code = input.charCodeAt(i);
          if ((code >= 97) && (code <= 122)){
            c = String.fromCharCode(((code - 97 + (input.length-1) * (i+1)) % 26) + 97);
          }
        }
        output += c;
      }
      return output;
  }

  render(){
    
    const answer = '';
    return (
      <CheckUsername
        hasUsername={this.state.hasUsername}
      >
        {this.state.isCompleted ? <p className='completed'>Dere har løst oppgaven, gå videre til neste rom!</p>: null}
        {!this.state.fetchingUser ? <section className='page-Three'>
          <div className='cipher-konteiner'>
          <p className='input-word'><a>axpg-vbq</a></p>
          <div className='cipher-input-konteiner'>
            <input className='cipher-input' type="text" onChange={this.endreTekst}/>
          </div>
            <p className='input-word'><a>{this.cipher(this.state.inputWord, this.state.amount)}</a></p>
            <p>{answer}</p>
            <div className='three-btn-container'>
              <button
                className='answer-three-button'
                onClick={this.lagreSvar}
              >
                Prøv lykken
              </button>
            </div>
          </div>

        </section> : null}
      </CheckUsername>
    );
  }

};