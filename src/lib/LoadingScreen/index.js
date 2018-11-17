/**
 * Created by chotoxautinh on 5/28/17.
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import memorize from 'memoize-one';

import loadingImage from './loading-image.gif';
import loadingLine from './loading-line.svg';

const styles = {
    layout: {
        backgroundColor: 'white',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    wrapper: {
        position: 'relative',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: 30,
        textAlign: 'center',
        maxWidth: 800
    },
    wrapperModal: {
        margin: 'auto',
        padding: 30,
        textAlign: 'center',
        maxWidth: 800,
        zIndex: 999
    },
    dotWrapper: {
        width: 20,
        display: 'inline-block',
        textAlign: 'left'
    }
};

class LoadingPage extends PureComponent {

    state = {
        dot: 0
    };

    static defaultProps = {
        isModal: false,
        spin: false
    };

    repeatDot = memorize(
        n => '.'.repeat(n)
    );

    componentDidMount = () => {
        // componentDidMount is called by react when the component
        // has been rendered on the page. We can set the interval here:
        this.timer = setInterval(this.tick, 350);
    };

    componentWillUnmount = () => {
        // This method is called immediately before the component is removed
        // from the page and destroyed. We can clear the interval here:
        if (this.timer) {
            clearInterval(this.timer);
        }
    };

    tick = () => {
        this.setState(prevState => ({ dot: (prevState.dot + 1) % 4 }));
    };


    render() {
        const dots = this.repeatDot(this.state.dot);
        const { isModal, logo } = this.props;

        return (
            <div style={isModal ? {} : styles.layout}>
                <div style={isModal ? styles.wrapperModal : styles.wrapper}>
                    {!isModal && (
                        logo ||
                        <img
                            alt="logo"
                            src={loadingImage}
                            style={{ maxWidth: '30%', marginTop: 30 }}
                        />
                    )}
                    <p style={{
                        display: 'block',
                        color: '#25A69A',
                        margin: 15
                    }}
                    >
                        Please wait for a while <span style={styles.dotWrapper}>{dots}</span>
                    </p>
                    <img
                        alt="loading-line'"
                        src={loadingLine}
                        style={{ margin: 30, maxWidth: '100%' }}
                    />
                </div>
            </div>
        );
    }
}

LoadingPage.propTypes = {
    isModal: PropTypes.bool,
    logo: PropTypes.string,
};

export default LoadingPage;
