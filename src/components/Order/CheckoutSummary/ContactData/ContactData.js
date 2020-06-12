import React, { Component } from "react";
import Button from "./../../../UI/Button/Button"
import classes from "./ContactData.module.css";
import axios from "./../../../../axios-order"
import Spinner from "./../../../UI/Spinner/Spinner"
import Input from "./../../../UI/Input/Input"

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: ''
            },
            address: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Address'
                },
                value: ''
            },
            state: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your State'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Zip-Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: "ringBell", displayValue: "Ring the Bell" },
                        { value: "dontRingBell", displayValue: "Don't Ring the Bell" },
                        { value: "neighbour", displayValue: "Handover to the Neighbour" }
                    ]
                },
                value: ''
            }
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        // console.log(this.props.ingredients);
        this.setState({ loading: true })
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: this.state.orderForm.name.value,
                email: this.state.orderForm.email.value,
                address: this.state.orderForm.address.value,
                state: this.state.orderForm.state.value,
                zipCode: this.state.orderForm.zipCode.value,
                country: this.state.orderForm.country.value,
                deliveryMethod: this.state.orderForm.deliveryMethod.value
            }
        }
        axios
            .post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false })
                alert("Your Order Is Placed Successfully")
                this.props.history.push("/");
            }
            )
            .catch(err => this.setState({ loading: false }))
    }

    changeInputHandler = (inputIdentifier , event) => {
        // console.log(inputIdentifier);
        const orderDetails = {
            ...this.state.orderForm
        };

        const orderDetailsElem = {
            ...orderDetails[inputIdentifier]
        }
        orderDetailsElem.value = event.target.value;

        orderDetails[inputIdentifier] = orderDetailsElem;

        this.setState({orderForm : orderDetails});
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        // console.log(formElementsArray);

        let form = (<form>
            {formElementsArray.map(formElement => {
                return (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={this.changeInputHandler.bind('this' , formElement.id)} />
                )
            })}
            <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>);
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;