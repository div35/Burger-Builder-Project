import * as actionTypes from "./actionTypes"
import axios from "./../../axios-order";

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILURE,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return{
        type:actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData, redirect) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios
            .post("/orders.json", orderData)
            .then((response) => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
                alert("You Have Successfully Placed Your Order");
                redirect.push("/");
            })
            .catch((err) => dispatch(purchaseBurgerFail(err)));
    }
}

export const fetchOrdersSuccess = (orders) => {
    return{
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = (error) => {
    return{
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrdersStart = () => {
    return{
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersStart())
        axios.get("/orders.json")
            .then(res => {
                // console.log(res.data)
                const fetchedOrder = [];

                for (let key in res.data) {
                    // console.log(res.data[key])
                    fetchedOrder.push({ ...res.data[key], id: key })
                }

                dispatch(fetchOrdersSuccess(fetchedOrder))
            })
            .catch(err => dispatch(fetchOrdersFail(err)))
    }
}