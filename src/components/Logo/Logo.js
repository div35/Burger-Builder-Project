import React from "react";
import Logo from "./../../logo.png"
import classes from "./Logo.module.css"

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={Logo} alt="Logo"/>
    </div>
);

export default logo;