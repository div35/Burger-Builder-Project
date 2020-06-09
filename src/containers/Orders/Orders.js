import React, { Component } from "react"
import Order from "./../../components/Order/Order"
import axios from "./../../axios-order"
import Spinner from "./../../components/UI/Spinner/Spinner"
import withErrorHandler from "./../../components/ErrorHandler/ErrorHandler"

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get("/orders.json")
            .then(res => {
                // console.log(res.data)
                const fetchedOrder = [];

                for (let key in res.data) {
                    // console.log(res.data[key])
                    fetchedOrder.push({ ...res.data[key], id: key })
                }

                this.setState({ loading: false, orders: fetchedOrder })
            })
            .catch(err => this.setState({ loading: false }))
    }

    render() {
        let order = this.state.orders.map((order) => <Order order={order} key={order.id} />)
        if (this.state.loading) {
            order = <Spinner />
        }
        return (
            <div>
                <h2 style={{textAlign:"center" , padding:"20px"}}>Your Orders</h2>
                {order}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);