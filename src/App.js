import React, { Component } from 'react';
import GamesPage from './GamesPage'
import GameFormPage from './GameFormPage'
import './App.css';
import { Route, NavLink } from 'react-router-dom'


class App extends Component {
  render() {
    return (
      <div className="ui container">
        <div className="ui three item menu">
          <NavLink className="item" activeClassName="active" activeonlywhenexact="true" to="/">Home</NavLink>
          <NavLink className="item" activeClassName="active" activeonlywhenexact="true" to="/games">All Games</NavLink>
          <NavLink className="item" activeClassName="active" activeonlywhenexact="true" to="/games/new">Add/Update  Game</NavLink>
        </div>
        <Route exact path="/games" component={GamesPage} />
        <Route path="/games/new" component={GameFormPage} />
        <Route path="/game/:_id" component={GameFormPage} />
      </div>
   );
  }
}

export default App;
