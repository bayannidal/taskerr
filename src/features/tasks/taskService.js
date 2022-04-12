import axios from 'axios'

const API_URL = 'http://localhost:8080/'

const createTask = async (taskData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
        }
    }
    const response = await axios.post(API_URL + 'task/insert', taskData, config)
    console.log(response)
    return response.data
}

const getTasks = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
        }
    }
    const response = await axios.get(API_URL + 'task/user', config)
    console.log(response)
    return response.data
}

const taskService = {
    createTask,
    getTasks
}

export default taskService