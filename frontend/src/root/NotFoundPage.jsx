import React from 'react';
import './notFoundPage.css';
import { Link } from 'react-router-dom';
import notFound from '../content/pagenotfound-img.png';
import queryString from 'query-string'

export const NotFoundPage = (props) => {
  const { username } = queryString.parse(props.location.search);
  return (

    <section className='not-found-page'>
    <div className='not-found-img'>
      <img  src={notFound} alt="Side ikke funnet"/>
    </div>
      <Link 
        className='go-back-link'
        to={`/?username=${username || ''}`}
      >
        Gå til forsiden
      </Link>
    </section>

  );
};