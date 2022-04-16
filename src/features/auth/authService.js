import axios from 'axios'


const API_URL = 'https://taskr99.herokuapp.com/'
// const API_URL = 'http://localhost:8080/'

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
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
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

//Logout user
const logout = async () => {
    localStorage.removeItem('user')
}


const authService = {
    register,
    logout,
    authenticate,
}

export default authService