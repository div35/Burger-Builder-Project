import React, { Component } from "react";
import Button from "./../../../UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "./../../../../axios-order";
import Spinner from "./../../../UI/Spinner/Spinner";
import Input from "./../../../UI/Input/Input";
import { connect } from "react-redux"
import * as actions from "./../../../../store/action/index"

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      address: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Address",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false
      },
      state: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your State",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Zip-Code",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Country",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "ringBell", displayValue: "Ring the Bell" },
            { value: "dontRingBell", displayValue: "Don't Ring the Bell" },
            { value: "neighbour", displayValue: "Handover to the Neighbour" },
          ],
        },
        value: "Ring the Bell",
        validation: {},
        valid: true
      }
    },
    formIsValid: false
  };

  orderHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for (let formDataIden in this.state.orderForm) {
      formData[formDataIden] = this.state.orderForm[formDataIden].value;
    }

    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
    };
    this.props.onOrderBurger(order, this.props.history, this.props.token)

  };

  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid
    }

    return isValid;
  }

  changeInputHandler = (inputIdentifier, event) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    // console.log(formElementsArray);

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map((formElement) => {
          return (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
              required={formElement.config.validation ? formElement.config.validation.required : false}
              changed={this.changeInputHandler.bind("this", formElement.id)}

            />
          );
        })}
        <Button btnType="Success" type="submit" disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter Your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return (
    {
      ings: state.burgerBuilder.ingredients,
      price: state.burgerBuilder.totalPrice,
      loading: state.order.loading,
      token: state.auth.token
    }
  )
}

const mapDispatchtoProps = dispatch => {
  return {
    onOrderBurger: (orderData, redirect, token) => dispatch(actions.purchaseBurger(orderData, redirect, token))
  }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(ContactData);
