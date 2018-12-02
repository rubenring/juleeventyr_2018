import React, { Component } from 'react';
import { CheckUsername } from '../commen/CheckUsername';
import './pageThree.css';
import queryString from 'query-string'

export class PageThree extends Component {
  constructor(props){
    super(props)
    const { username } = queryString.parse(props.location.search);
    this.username = username;
    this.state = {
      inputWord: '',
      reg: '',
      hasUsername: false,
      amount: 8
    }
    this.svar = this.svar.bind(this);
    this.cipher = this.cipher.bind(this);
    this.endreTekst = this.endreTekst.bind(this);
    // this.lagreSvar = this.lagreSvar.bind(this);

  }
  // componentDidMount(){
  //   if(this.username){
  //     const url = `/api/${this.username}/progress`;
  //     apiCallGet(url)
  //       .then(res => {
  //         this.setState({
  //           level: res.level,
  //           hasUsername: res.hasUsername
  //         })
  //       })
  //   }
  // }

  // lagreSvar(){
  //   const svar = {
  //     svar: this.state.value
  //   };
  //   if(svar.svar){
  //     const url = `/api/${this.username}/answerthree`;
  //     apiCallPost(url, svar)
  //       .then(res => {
  //         this.setState({
  //           isCompleted: res.answer,
  //           toLowLevel: res.toLowLevel
  //         })
  //       })
  //   }
  // }

  svar(){

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
        <section className='page-Three'>
          <div className='cipher-konteiner'>
          <p className='input-word'><a href="">{this.cipher('tjuefem', this.state.amount)}</a></p>
          <div className='cipher-input-konteiner'>
            <input className='cipher-input' type="text" onChange={this.endreTekst}/>
          </div>
            <p className='input-word'><a href="">{this.cipher(this.state.inputWord, this.state.amount)}</a></p>
            <p>{answer}</p>
            <button
              className='answer-button'
              onClick={this.svar}
            >
              Send svar
            </button>
          </div>

        </section>
      </CheckUsername>
    );
  }

};