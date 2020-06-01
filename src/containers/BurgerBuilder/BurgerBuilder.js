import React, { Component } from 'react'
import Burger from './../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from './../../components/UI/Modal/Modal'
import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary'
import axios from './../../axios-order';
import Spinner from "./../../components/UI/Spinner/Spinner"
import errorHandler from "./../../components/ErrorHandler/ErrorHandler"

const INGREDIENT_PRICES = {
  salad: 25,
  cheese: 20,
  meat: 30,
  bacon: 40
}

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
    axios.get('https://burger-builder-6fd8f.firebaseio.com/ingredients.json')
      .then(response => {
        this.setState({ ingredients: response.data })
      })
      .catch(err => {
        this.setState({ error: true })
      })
  }

  updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igkey => {
        return ingredients[igkey]
      })
      .reduce((sum, el) => {
        return sum + el
      }, 0)

    this.setState({
      purchaseable: sum > 0
    })
  }

  addIngredientHandler = type => {
    const oldcount = this.state.ingredients[type]
    const updatedcount = oldcount + 1
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedcount

    const priceAddition = INGREDIENT_PRICES[type]
    const oldPrice = this.state.totalPrice
    const newPrice = oldPrice + priceAddition

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    })
    this.updatePurchaseState(updatedIngredients)
  }

  removeIngredientHandler = type => {
    const oldcount = this.state.ingredients[type]
    if (oldcount <= 0) {
      return
    }
    const updatedcount = oldcount - 1
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedcount

    const priceDeduction = INGREDIENT_PRICES[type]
    const oldPrice = this.state.totalPrice
    const newPrice = oldPrice - priceDeduction

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    })
    this.updatePurchaseState(updatedIngredients)
  }

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
    this.setState({ loading: true })
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Divyaansh',
        address: 'Delhi',
        email: 'paprejadivyaansh@gmail.com'
      },
      deliveryMethod: 'fastest'
    }
    axios
      .post('/orders.json', order)
      .then(response => this.setState({ loading: false, purchasing: false }))
      .catch(err => this.setState({ loading: false, purchasing: false }))
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null;

    let burger = this.state.error ? <p>Ingredients Can't Be Loaded</p> : <Spinner />;

    if (this.state.ingredients) {
      burger = (
        <div>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            totalprice={this.state.totalPrice}
            purchaseable={this.state.purchaseable}
            ordered={this.purchaseHandler} />
        </div>
      );
      orderSummary = <OrderSummary
        ingredients={this.state.ingredients}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        totalPrice={this.state.totalPrice}
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

export default errorHandler(BurgerBuilder, axios)
