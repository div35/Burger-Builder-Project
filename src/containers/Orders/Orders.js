import React, { Component } from "react"
import Order from "./../../components/Order/Order"
import axios from "./../../axios-order"
import Spinner from "./../../components/UI/Spinner/Spinner"
import withErrorHandler from "./../../components/ErrorHandler/ErrorHandler"
import * as actions from "./../../store/action/index"
import { connect } from "react-redux"

class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrder()
    }

    render() {
        let order = <Spinner />

        if (!this.props.loading) {
            let orderEmpty = { "textAlign": "center" };
            order = <p style={orderEmpty}>SORRY !!! You Don't Have Any Previous Order</p>
            if (this.props.orders.length > 0)
                order = this.props.orders.map((order) => <Order order={order} key={order.id} />)
        }
        return (
            <div>
                <h2 style={{ textAlign: "center", padding: "20px" }}>Your Orders</h2>
                {order}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return (
        {
            onFetchOrder: () => dispatch(actions.fetchOrders())
        }
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));