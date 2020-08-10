import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './components/Layout/Layout';
import styles from './App.module.css';
import Home from './components/Home/Home';
import AuthLoader from './components/AuthLoader/AuthLoader';
import Dashboard from './components/Dashboard/Dashboard';
import DebtorDetails from './components/Order/DebtorDetails/DebtorDetails';
import VehicleDetails from './components/Order/VehicleDetails/VehicleDetails';
import OrderDetails from './components/Order/OrderDetails/OrderDetails';
import OrderSummary from './components/Order/OrderSummary/OrderSummary';
import * as actions from './store/actions/index';

class App extends Component {

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={AuthLoader} />
        <Route exact path="/" component={Home} />
        <Redirect to="/" />
      </Switch>
    );
  
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route path="/create-order/debtor-details" component={DebtorDetails} />
          <Route path="/create-order/vehicle-details" component={VehicleDetails} />
          <Route path="/create-order/order-details" component={OrderDetails} />
          <Route path="/create-order/order-summary" component={OrderSummary} />
          <Route exact path="/edit-order" component={OrderSummary} />
          <Route path="/edit-order/debtor-details" component={DebtorDetails} />
          <Route path="/edit-order/vehicle-details" component={VehicleDetails} />
          <Route path="/edit-order/order-details" component={OrderDetails} />
          <Redirect to="/dashboard" />
        </Switch>
      );
    }
    return (
      <div className={styles.App}>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authCheck: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
