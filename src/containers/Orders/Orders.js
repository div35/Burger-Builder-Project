import React, { Component } from "react"
import Order from "./../../components/Order/Order"
import axios from "./../../axios-order"
import Spinner from "./../../components/UI/Spinner/Spinner"
import withErrorHandler from "./../../components/ErrorHandler/ErrorHandler"
import * as actions from "./../../store/action/index"
import { connect } from "react-redux"

class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrder(this.props.token, this.props.userId)
    }

    render() {
        let order = <Spinner />

        if (!this.props.loading) {
            let orderEmpty = { "textAlign": "center" };
            order = this.props.token ? <p style={orderEmpty}>SORRY !!! You Don't Have Any Previous Order</p> : null
            if (this.props.orders.length > 0)
                order = this.props.orders.map((order) => <Order order={order} key={order.id} />)
        }
        return (
            <div>
                {this.props.token ? <h2 style={{ textAlign: "center", padding: "20px" }}>Your Orders</h2> : <h2 style={{ textAlign: "center", padding: "20px" }}>Please Login First !!!</h2>}
                {order}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return (
        {
            onFetchOrder: (token) => dispatch(actions.fetchOrders(token))
        }
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));