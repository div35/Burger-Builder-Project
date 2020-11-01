import React, { Component } from "react";
import Button from "./../../../UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "./../../../../axios-order";
import Spinner from "./../../../UI/Spinner/Spinner";
import Input from "./../../../UI/Input/Input";
import { connect } from "react-redux"

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
        // valid: false,
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
        },
        // valid: false,
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
        // valid: false,
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
        // valid: false,
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
        // valid: false,
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
        // valid: false,
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
      },
    },
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    // console.log(this.props.ingredients);
    this.setState({ loading: true });
    const formData = {};
    for (let formDataIden in this.state.orderForm) {
      formData[formDataIden] = this.state.orderForm[formDataIden].value;
    }

    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ loading: false });
        alert("Your Order Is Placed Successfully");
        this.props.history.push("/");
      })
      .catch((err) => this.setState({ loading: false }));
  };

  //   checkValidity = (value, rules) => {
  //     let isValid = true;

  //     if (rules.required) {
  //       isValid = value.trim() !== "";
  //     }

  //     return isValid;
  //   };

  changeInputHandler = (inputIdentifier, event) => {
    // console.log(inputIdentifier);
    const orderDetails = {
      ...this.state.orderForm,
    };

    const orderDetailsElem = {
      ...orderDetails[inputIdentifier],
    };
    orderDetailsElem.value = event.target.value;
    // if (orderDetailsElem.validation)
    //   orderDetailsElem.valid = this.checkValidity(
    //     orderDetailsElem.value,
    //     orderDetailsElem.validation
    //   );
    // console.log(orderDetailsElem);
    orderDetails[inputIdentifier] = orderDetailsElem;

    this.setState({ orderForm: orderDetails });
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
              required={formElement.config.validation ? formElement.config.validation.required : false}
              changed={this.changeInputHandler.bind("this", formElement.id)}

            />
          );
        })}
        <Button btnType="Success" type="submit">
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
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
  return(
    {
      ings: state.ingredients,
      price: state.totalPrice
    }
  )
}

export default connect(mapStatetoProps)(ContactData);
