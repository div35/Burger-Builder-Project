import axios from "axios";

const instance = axios.create({
    baseURL: 'https://burger-builder-6fd8f.firebaseio.com/'
})

export default instance;