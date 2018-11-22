import React, { Component } from 'react';
import './infoPage.css';
import { Link } from 'react-router-dom';
import { apiCallPost } from '../utils';
import queryString from 'query-string';
import {CheckUsername} from '../commen/CheckUsername';
import Poster from '../content/movie_poster.jpg';
export class InfoPage extends Component{
  constructor(props){
    super(props);
    const { username } = queryString.parse(this.props.location.search);
    this.username = username;
    this.state = {
      hasUsername: false,
      username: ''
    }
  }
  componentDidMount(){
    if(this.username){
      const url = `/api/${this.username}/addusernametodb`;
      apiCallPost(url, {username: this.username})
      .then(res => {
        this.setState({
          hasUsername: res.hasUsername,
          username: res.username
        })
      })
    }
  }
  render(){
    return (
      <CheckUsername
        hasUsername={this.state.hasUsername}
      >
        <section className='info-page'>
            <div className='content'>
              <img src={Poster} style={{width: '30%'}} alt='movie poster'/>
              <div>
                  {this.state.hasUsername ? <Link 
                      className='link'
                      to={`/page-one?username=${this.username}`} 
                    >
                      Klikk her for å starte
                    </Link>
                    : null
                  }
                  <p className='tekst'>
                    Du er inne i skyskraperen sammen med flere terrorister.
                    Du må hindre bomben i å eksplodere for å komme redde gisslene.
                  </p>
              </div>
            </div>


        </section>
      </CheckUsername>

    );
  }
};