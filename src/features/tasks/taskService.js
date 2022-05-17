import axios from 'axios'
import { config } from '../util/utilities'
// const API_URL = 'https://taskr99.herokuapp.com/'

const API_URL = 'http://localhost:8080/'
// const API_URL = 'https://b86c-188-24-71-26.ngrok.io/'



const createTask = async (taskData, token) => {
    const response = await axios.post(API_URL + 'task/insert', taskData, config(token))
    console.log(response)
    return response.data
}

const getTasks = async (token) => {
    const response = await axios.get(API_URL + 'task/user', config(token))
    console.log(response)
    if (response.status === 403) {
        return response.status
    }
    return response.data
}

//Delete task
const deleteTask = async (id, token) => {
    const response = await axios.delete(API_URL + `task/${id}`, config(token))
    console.log(response)
    if (response.status === 200) {
        return { id }
    }

    else
        return response.data
}

//Update Task
const updateTask = async (taskData, token) => {
    const { id, title, description, completed, pinned, expiresAt } = taskData
    const response = await axios.put(API_URL + `task/${id}`, {
        title, description, completed, pinned, expiresAt
    }, config(token))
    console.log(response)
    return response.data
}

const taskService = {
    createTask,
    getTasks,
    deleteTask,
    updateTask
}

export default taskService