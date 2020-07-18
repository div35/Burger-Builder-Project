import React, { Component } from 'react'
import Burger from './../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from './../../components/UI/Modal/Modal'
import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary'
import axios from './../../axios-order';
import Spinner from "./../../components/UI/Spinner/Spinner"
import errorHandler from "./../../components/ErrorHandler/ErrorHandler"
import { connect } from "react-redux"
import * as actionTypes from "./../../store/actions"

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 60,
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount = () => {
    // axios.get('https://burger-builder-6fd8f.firebaseio.com/ingredients.json')
    //   .then(response => {
    //     this.setState({ ingredients: response.data })
    //   })
    //   .catch(err => {
    //     this.setState({ error: true })
    //   })
  }

  updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igkey => {
        return ingredients[igkey]
      })
      .reduce((sum, el) => {
        return sum + el
      }, 0)

    return sum > 0;
  }

  // addIngredientHandler = type => {
  //   const oldcount = this.state.ingredients[type]
  //   const updatedcount = oldcount + 1
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   }
  //   updatedIngredients[type] = updatedcount

  //   const priceAddition = INGREDIENT_PRICES[type]
  //   const oldPrice = this.state.totalPrice
  //   const newPrice = oldPrice + priceAddition

  //   this.setState({
  //     ingredients: updatedIngredients,
  //     totalPrice: newPrice
  //   })
  //   this.updatePurchaseState(updatedIngredients)
  // }

  // removeIngredientHandler = type => {
  //   const oldcount = this.state.ingredients[type]
  //   if (oldcount <= 0) {
  //     return
  //   }
  //   const updatedcount = oldcount - 1
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   }
  //   updatedIngredients[type] = updatedcount

  //   const priceDeduction = INGREDIENT_PRICES[type]
  //   const oldPrice = this.state.totalPrice
  //   const newPrice = oldPrice - priceDeduction

  //   this.setState({
  //     ingredients: updatedIngredients,
  //     totalPrice: newPrice
  //   })
  //   this.updatePurchaseState(updatedIngredients)
  // }

  purchaseHandler = () => {
    this.setState({ purchasing: true })
  }

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    })
  }

  purchaseContinueHandler = () => {
    // alert("You Continue !");
    // const queryParams = [];
    // for (let i in this.state.ingredients) {
    //   queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]))
    // }
    // queryParams.push('price=' + this.props.Price)
    // const queryString = queryParams.join("&");
    // this.props.history.push({
    //   pathname: '/checkout',
    //   search: '?' + queryString
    // });
    
    this.props.history.push('/checkout')
  }

  render() {
    const disabledInfo = {
      ...this.props.ings
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null;

    let burger = this.state.error ? <p>Ingredients Can't Be Loaded</p> : <Spinner />;

    if (this.props.ings) {
      burger = (
        <div>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            totalprice={this.props.price}
            purchaseable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler} />
        </div>
      );
      orderSummary = <OrderSummary
        ingredients={this.props.ings}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        totalPrice={this.props.price}
      />
    }
    if (this.state.loading) {
      orderSummary = <Spinner />
    }

    return (
      <div>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler} >
          {orderSummary}
        </Modal>
        {burger}
      </div>
    )
  }
}

const mapStatetoProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  }
};

const mapDispatchtoProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
    onIngredientRemoved: (ingName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
  }
};

export default connect(mapStatetoProps, mapDispatchtoProps)(errorHandler(BurgerBuilder, axios));
