import apis from '../util/utilities'
// const api = 'https://taskr99.herokuapp.com/'

//Register user
const register = async (userData) => {
    // const response = await axios.post(apis.apiAuth_URL + 'register', userData)
    const response = await apis.api.post('register', userData)
    console.log(response)
    return response.data
}

//Login user
const authenticate = async (userData) => {
    // const response = await axios.post(apis.apiAuth_URL + 'authenticate', userData)
    const response = await apis.api.post('authenticate', userData)
    console.log(response)
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

//Update user
const updateUser = async (userData, token) => {
    const response = await apis.apiAuth.put(`users/edit`, userData)
    console.log(response)
    if (response.data && response.status === 200) {
        const updatedUser = response.data;
        updatedUser.token = token;
        localStorage.setItem('user', JSON.stringify(updatedUser))
    }
    return response.data
}

//Change password
const changePassword = async (password) => {
    const response = await apis.apiAuth.post(`users/password/change`, password)
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