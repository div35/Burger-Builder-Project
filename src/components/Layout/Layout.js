import React, { Component } from "react";
import classes from "./Layout.module.css";
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from "./../Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    }
    showSideBarHandler = () => {
        this.setState({ showSideDrawer: true });
    }

    render() {
        return (
            <div>
                <Toolbar showSideBar={this.showSideBarHandler}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </div>
        );
    }
};

export default Layout;