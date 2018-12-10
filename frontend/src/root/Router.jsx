import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { NotFoundPage } from './NotFoundPage';
import { InfoPage } from './InfoPage';
import { PageOne } from "../page-one/PageOne";
import { PageTwo } from "../page-two/PageTwo";
import { PageThree } from "../page-three/PageThree";
import { PageFour } from "../page-four/PageFour";
import { PageFive } from "../page-five/PageFive";
import { CompletedPage } from '../completed-page/CompletedPage'
import { Header } from '../header/Header';
import { storyline } from '../Util/storyline'
import queryString from 'query-string'

const RouteWithHeader = ({ storyline, location, ...rest}) => {

  const { username } = queryString.parse(location.search);
    return (
      <Fragment>
        <Header storyline={storyline} username={username} />
        <Route {...rest} location={location}/>
      </Fragment>
    )
}

export const AppRouter = (props) => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' {...props} component={InfoPage}/>
        <RouteWithHeader path='/page-one' {...props} component={PageOne} storyline={storyline[1]} />
        <RouteWithHeader path='/page-two' {...props} component={PageTwo} storyline={storyline[2]}/>
        <RouteWithHeader path='/page-three' {...props} component={PageThree} storyline={storyline[3]} />
        <RouteWithHeader path='/page-four' {...props} component={PageFour} storyline={storyline[4]} />
        <RouteWithHeader path='/page-five' {...props} component={PageFive} storyline={storyline[5]}/>
        <RouteWithHeader path='/completed-page' {...props} component={CompletedPage} storyline={storyline[6]}/>

        <Route {...props} component={NotFoundPage} />
      </Switch>
    </Router>
  )
};