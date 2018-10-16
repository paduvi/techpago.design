import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './index.css';

const NotFound = ({ home }) => (
    <div className="error-page error">
        <div>
            <h1>404</h1>
            <div className="desc">
                <h2>
                    This page could not be found. Are you got lost? Go <Link to={home}>Home</Link>
                </h2>
            </div>
        </div>
    </div>
);

NotFound.propTypes = {
    home: PropTypes.string
};

NotFound.defaultProps = {
    home: '/'
};

export default NotFound;
