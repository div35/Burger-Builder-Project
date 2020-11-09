import React, { Component } from "react";
import Input from "./../../components/UI/Input/Input"
import { Redirect } from "react-router-dom"
import Button from "./../../components/UI/Button/Button"
import classes from "./Auth.module.css"
import * as action from "./../../store/action/index"
import { connect } from "react-redux"
import Spinner from "./../../components/UI/Spinner/Spinner"

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Your Email Id",
                },
                value: "",
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: "input",
                elementConfig: {
                    type: "password",
                    placeholder: "Your Password",
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
            confirm_password: {
                elementType: "input",
                elementConfig: {
                    type: "password",
                    placeholder: "Confirm Your Password",
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }

        },
        isSignup: true
    }

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== "/") {
            this.props.onSetAuthRedirectPath();
        }
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true
        }

        if (rules.required) {
            isValid = value.trim() !== "" && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.minLength && isValid
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

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({ controls: updatedControls })
    }

    submitHandler = (event) => {
        event.preventDefault();
        if (this.state.isSignup == false || (this.state.isSignup == true && (this.state.controls.password.value === this.state.controls.confirm_password.value)))
            this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup)

        else
            alert("Password Doesn't Match");
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return { isSignup: !prevState.isSignup }
        })
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            if (this.state.isSignup == true || (this.state.isSignup == false && key !== "confirm_password")) {
                formElementsArray.push({
                    id: key,
                    config: this.state.controls[key],
                });
            }

        }

        let form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                required={formElement.config.validation ? formElement.config.validation.required : false}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />
        ));

        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMsg = null;

        if (this.props.error) {
            errorMsg = (<p style={{ color: "maroon" }} >ERROR : {this.props.error.message} !!!</p>)
        }

        let authRedirect = null;
        if (this.props.isAuth) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />;
        }
        return (
            <div>
                <br />
                <div className={classes.Auth}>
                    {authRedirect}
                    <h2 style={{ color: "maroon" }}>{this.state.isSignup ? "SIGNUP" : "LOGIN"}</h2>
                    {errorMsg}
                    <form onSubmit={this.submitHandler}>
                        {form}
                        <Button btnType="Success" type="submit">SUBMIT</Button>
                    </form>
                    <Button clicked={this.switchAuthModeHandler} btnType="Danger">SWITCH TO {this.state.isSignup ? "LOGIN" : "SIGNUP"}</Button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignup) => dispatch(action.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(action.setAuthRedirectPath('/'))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Auth);