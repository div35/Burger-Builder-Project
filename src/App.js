import React, { Component } from "react";
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders"
import { Route, Switch , withRouter} from "react-router-dom";
import Auth from "./containers/Auth/Auth"
import Logout from "./containers/Auth/Logout/logout"
import {connect} from "react-redux"
import * as action from "./store/action/index"

class App extends Component {
  componentDidMount(){
    this.props.onTryAutoSignUp();
  }
  render(){
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/orders" component={Orders} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/auth" component={Auth} />
            <Route path="/logout" component={Logout} />
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return({
    onTryAutoSignUp : () => dispatch(action.authCheckState())
  })
}

export default withRouter(connect(null, mapDispatchToProps)(App));