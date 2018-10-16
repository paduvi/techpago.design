import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home';
import Demo from './Demo';
import { NotFound } from './lib';

import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/404" component={NotFound} />
                        <Route component={Demo} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
