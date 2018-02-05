import React, { Component } from 'react';
import logo from './logo.svg';
import GamesPage from './GamesPage'
import GameForm from './GameForm'
import './App.css';
import { Route, NavLink } from 'react-router-dom'


class App extends Component {
  render() {
    return (
      <div className="ui container">
      <div className="ui three item menu">
        <NavLink className="item" activeClassName="active" activeonlywhenexact="true" to="/">Home</NavLink>
        <NavLink className="item" activeClassName="active" activeonlywhenexact="true" to="/games">Games</NavLink>
        <NavLink className="item" activeClassName="active" activeonlywhenexact="true" to="/games/new">Add New Game</NavLink>
      </div>
      <Route exact path="/games" component={GamesPage}/>
      <Route  path="/games/new" component={GameForm}/>
      <Route  path="/game/:_id" component={GameForm}/>

      </div>
     
       
     
    );
  }
}

export default App;
