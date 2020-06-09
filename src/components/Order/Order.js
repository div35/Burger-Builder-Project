import React from "react"
import classes from "./Order.module.css";

const order = (props) => {
    let ingredients = [];

    for (let ingName in props.order.ingredients) {
        ingredients.push({
            name: ingName,
            amount: props.order.ingredients[ingName]
        })
    }

    const ingredientOutput = ingredients.map(ig => {
        return <span key={ig.name} style={{ textTransform: "capitalize", display: "inline-block", margin: "0 8px 6px", border: "1px solid #ccc", padding: "5px" }}>{ig.name} ({ig.amount})</span>
    })

    return (
        <div className={classes.Order}>
            <p>Ingredients : {ingredientOutput}</p>
            <p>Total Price : <strong>{props.order.price} INR</strong></p>
        </div>
    )
}

export default order;