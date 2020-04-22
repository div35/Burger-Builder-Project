import React from "react";
import Logo from "./../../logo.png"
import classes from "./Logo.module.css"

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height , marginBottom: props.marginbottom} }>
        <img src={Logo} alt="Logo"/>
    </div>
);

export default logo;