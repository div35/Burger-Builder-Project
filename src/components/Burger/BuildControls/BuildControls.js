import React from 'react';
import BuildControl from "./BuildControl/BuildControl"
import classes from './BuildControls.module.css';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
];

const buildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>Current Price : <strong>{props.totalprice} INR</strong></p>
            {controls.map(ctrl => (
                <BuildControl
                    key={ctrl.label}
                    label={ctrl.label}
                    added={props.ingredientAdded.bind('this', ctrl.type)}
                    removed={props.ingredientRemoved.bind('this', ctrl.type)}
                    disabled={props.disabled[ctrl.type]} />
            ))}
            <button className={classes.OrderButton} disabled={!props.purchaseable} onClick={props.ordered}>ORDER NOW</button>
            <p className={classes.Note}><strong>NOTE : </strong>Don't worry about the placement of the ingredients , we will do it for you. <strong>HAPPY EATING!!</strong></p>
        </div>
    );
}

export default buildControls;