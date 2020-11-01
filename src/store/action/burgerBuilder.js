import * as actionTypes from "./actionTypes"
import axios from './../../axios-order';

export const addIngredient = (ingName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingName
    }
}

export const removeIngredient = (ingName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName
    }
}

export const setIngredient = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const FetchIngredientsFailed = () =>{
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    return (dispatch) => {
        axios.get('https://burger-builder-6fd8f.firebaseio.com/ingredients.json')
        .then(response => {
          dispatch(setIngredient(response.data))
        })
        .catch(err => {
          dispatch(FetchIngredientsFailed());
        })
    }
}