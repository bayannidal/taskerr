import axios from 'axios'
import api from '../util/utilities'

// const API_URL = 'https://taskr99.herokuapp.com/'
const API_URL = 'http://localhost:8080/'
// const API_URL = 'https://11e7-188-24-71-26.ngrok.io/'

//Register user
const register = async (userData) => {
    const response = await axios.post(API_URL + 'register', userData)
    console.log(response)
    return response.data
}

//Login user
const authenticate = async (userData) => {
    const response = await axios.post(API_URL + 'authenticate', userData)
    console.log(response)
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

//Update user
const updateUser = async (userData, token) => {
    const { username, emailAddress, firstName, lastName } = userData;
    const response = await api.put(`users/edit`, userData)
    console.log(response)
    if (response.data && response.status === 200) {
        const updatedUser = response.data;
        updatedUser.token = token;
        localStorage.setItem('user', JSON.stringify(updatedUser))
    }
    return response.data
}

//Change password
const changePassword = async (password, token) => {
    const { oldPass, newPass } = password
    const response = await api.post(`users/password/change`, password)
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
    changePassword
}

export default authService