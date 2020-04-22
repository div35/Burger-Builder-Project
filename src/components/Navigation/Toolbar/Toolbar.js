import React from "react";
import classes from "./Toolbar.module.css"
import Logo from "./../../Logo/Logo";
import NavigationItems from "./../NavigationItems/NavigationItems"

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div className={classes.DrawerToggle} onClick={props.showSideBar}>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <Logo height="80%"/>
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;