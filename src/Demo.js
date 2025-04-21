import React from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import { Layout, Icon } from 'antd';
import { LoadingScreen, MarkdownEditor, RichTextEditor } from './lib';
import watermark from './logo.svg';
import logo from './logo.svg';

const { Header, Content, Footer } = Layout;

const LoadingLogo = (
    <img
        src={logo}
        className="App-logo-spin"
        alt="logo"
        style={{ maxWidth: '5vw', marginTop: 30, marginBottom: 10 }}
    />
);

const Demo = () => (
    <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ zIndex: 99 }}>
            <Link to="/" style={styles.back}><Icon type="left" theme="outlined" /> Back To Home</Link>
        </Header>
        <Content style={{ padding: '30px 0px', alignSelf: 'center', width: '90%' }}>
            <Switch>
                <Route exact path="/markdown-editor" component={MarkdownEditor} />
                <Route exact path="/rich-text-editor" component={RichTextEditor} />
                <Route exact path="/loading-screen" render={
                    () => <LoadingScreen logo={LoadingLogo} />
                } />
                <Redirect to="/404" />
            </Switch>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
            ©2018 Created by <img src={watermark} alt="Techpago" style={{ height: 20, marginLeft: 2 }} />
        </Footer>
    </Layout>
);

const styles = {
    back: {
        lineHeight: '31px',
        height: 31,
        margin: "16px 24px 16px 0",
        float: "left",
    }
};

export default Demo;