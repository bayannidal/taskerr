import axios from 'axios'
import { config } from '../util/utilities'

// const API_URL = 'https://taskr99.herokuapp.com/'
const API_URL = 'http://localhost:8080/'
// const API_URL = 'https://b86c-188-24-71-26.ngrok.io/'

const api = axios.create({
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});
//Register user
const register = async (userData) => {
    const response = await api.post(API_URL + 'register', userData)
    console.log(response)
    return response.data
}

//Login user
const authenticate = async (userData) => {
    const response = await api.post(API_URL + 'authenticate', userData)
    console.log(response)
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}



const updateUser = async (userData, token) => {
    const { username, emailAddress, firstName, lastName } = userData;
    const response = await axios.put(API_URL + `user/edit`, {
        username, emailAddress, firstName, lastName
    }, config(token))

    console.log(response)

    if (response.data) {
        const updatedUser = response.data;
        updatedUser.token = token;
        localStorage.setItem('user', JSON.stringify(updatedUser))
    }
    return response.data
}
const resetPassowrd = async (password, token) => {
    const { oldPass, newPass } = password
    const response = await axios.post(API_URL + `user/password/reset`, {
        oldPass, newPass
    }, config(token))

    console.log(response)
    return response.data
}
//Logout user
const logout = async () => {
    localStorage.removeItem('user')
}


const authService = {
    register,
    logout,
    authenticate,
    updateUser,
    resetPassowrd
}

export default authService