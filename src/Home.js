import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import logo from './logo-full.svg';

const Home = () => (
    <Fragment>
        <sider className="App-sider">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
                Edit <code>src/App.js</code> and save to reload.
            </p>
        </sider>
        <main className="App-menu">
            <h2>Components:</h2>
            <ol>
                <li><Link to="/markdown-editor">Markdown Editor</Link></li>
                <li><Link to="/rich-text-editor">Simple Rich Text Editor</Link></li>
                <li><Link to="/loading-screen">Loading Screen</Link></li>
                <li><Link to="/404">Page Not Found</Link></li>
            </ol>
        </main>
    </Fragment>
);

export default Home;

