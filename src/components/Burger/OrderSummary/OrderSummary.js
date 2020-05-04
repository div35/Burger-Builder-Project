import React from "react";
import Button from "./../../UI/Button/Button"

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igkey => {
            return <li key={igkey}>
                <span style={{ textTransform: 'capitalize' }}>{igkey}</span>
                : {props.ingredients[igkey]}
            </li>
        })

    return (
        <div>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients :</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price : {props.totalPrice} INR</strong></p>
            <br />
            <p>Do You Want To Continue With This?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </div>
    );
}

export default orderSummary;