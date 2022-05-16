import axios from 'axios'

// const API_URL = 'https://taskr99.herokuapp.com/'
const API_URL = 'http://localhost:8080/'
// const API_URL = 'https://5b5e-188-24-71-26.ngrok.io/'

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
    const { username, emailAddress, firstName, lastName } = userData
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
            "subject": username
        },
    }

    const response = await axios.put(API_URL + `user/edit`, {
        username, emailAddress, firstName, lastName
    }, config)

    console.log(response)
    if (response.data) {
        const updatedUser = response.data;
        updatedUser.token = token;
        localStorage.setItem('user', JSON.stringify(updatedUser))
    }
    return response.data
}
const resetPassowrd = async (password, token) => {

    const username = JSON.parse(localStorage.getItem("user")).username
    console.log(username)
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
            "subject": username
        },
    }

    const { oldPassword, newPassword } = password
    const response = await axios.post(API_URL + `user/password/reset`, {
        oldPassword, newPassword
    }, config)

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