import React, { Component } from 'react';
import './infoPage.css';
import { Link } from 'react-router-dom';
import { apiCallPost } from '../utils';
import queryString from 'query-string';
import {CheckUsername} from '../commen/CheckUsername';
import Poster from '../content/movie_poster.jpg';
import Storyline from '../header/Storyline';

export class InfoPage extends Component{
  constructor(props){
    super(props);
    const { username } = queryString.parse(this.props.location.search);
    this.username = username;
    this.state = {
      hasUsername: false,
      username: '',
      fetchingUser: false
    }
  }
  componentDidMount(){
    if(this.username){
      this.setState({
        ...this.state,
        fetchingUser: true
      })
      const url = `/api/${this.username}/addusernametodb`;
      apiCallPost(url, {username: this.username})
      .then(res => {
        this.setState({
          hasUsername: res.hasUsername,
          username: res.username,
          fetchingUser: false
        })
      })
    }
  }
  render(){
    const storyline = `Du og dine medterrorister skal overraske gjestene i et juleselskap i Nakatomi Tower. Målet deres er å rane hvelvet i byggingen hvor det befinner seg store verdier. Klikk på start for å komme igang med ranet av hvelvet!`
    return (
      <CheckUsername
        hasUsername={this.state.hasUsername}
      >
        <section className='info-page'>
            <div className='content'>
            <div className='info-img-container'>
              <img src={Poster} alt='movie poster'/>
              {this.state.hasUsername && !this.state.fetchingUser  ? <Link 
                      className='infopage-link'
                      to={`/page-one?username=${this.username}`} 
                    >
                      start
                    </Link>
                    : null
                  }
            </div>
              {!this.state.hasUsername && !this.state.fetchingUser ? <p className='no-user-tekst'>Dere trenger et brukernavn for å fortsette. Skriv inn burkernavnet dere is url slik: \?username=deresbrukernavn' </p>: null}
              <Storyline storyline={storyline} />
            </div>


        </section>
      </CheckUsername>

    );
  }
};