import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import styles from './App.module.css';
import Home from './components/Home/Home';

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
          <Layout>
            <Route exact path="/" component={Home} />
          </Layout> 
      </div>
   
      
    );
  }
}

export default App;
