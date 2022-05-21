import axios from 'axios'
import { config } from '../util/utilities'
// const API_URL = 'https://taskr99.herokuapp.com/'
const username = JSON.parse(localStorage.getItem("user")).username
const token = JSON.parse(localStorage.getItem("user")).token

const API_URL = 'http://localhost:8080/'
// const API_URL = 'https://11e7-188-24-71-26.ngrok.io/'
const api = axios.create({
    baseURL: API_URL,

    headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
        "subject": username
    }
})

//Create Task
const createTask = async (taskData, token) => {
    const response = await axios.post(API_URL + 'tasks/insert', taskData, config(token))
    console.log(response)
    return response.data
}

//Get All Tasks
const getTasks = async (token) => {
    const response = await axios.get(API_URL + 'tasks/user', config(token))
    console.log(response)
    return response.data
}

//Delete task
const trashTask = async (id, token) => {
    const username = JSON.parse(localStorage.getItem("user")).username

    const response = await api.put(`tasks/${id}/trash`)

    console.log(response)
    if (response.status === 200) {
        return { id }
    }
    else
        return response.data
}

//Get All Binned Tasks
const getBinnedTasks = async (token) => {
    const response = await api.get(`tasks/user/binned`)
    console.log(response)
    return response.data
}

//Restore Binned Tasks
const restoreBinnedTask = async (id, token) => {
    console.log(token)
    console.log(id)
    const response = await axios.put(API_URL + `tasks/${id}/restore`, config(token))
    console.log(response)
    if (response.status === 200) {
        console.log(id)
        return { id }
    }

}

//Delete binned task
const deleteBinnedTask = async (id, token) => {
    const response = await axios.delete(API_URL + `tasks/${id}`, config(token))
    console.log(response)
    if (response.status === 200) {
        return { id }
    }
    // else
    //     return response.data
}

//Update Task
const updateTask = async (taskData, token) => {
    const { id, title, description, completed, pinned, expiresAt } = taskData
    const response = await axios.put(API_URL + `tasks/${id}/edit`, {
        title, description, completed, pinned, expiresAt
    }, config(token))
    console.log(response)
    return response.data
}

const taskService = {
    createTask,
    getTasks,
    trashTask,
    updateTask,
    getBinnedTasks,
    restoreBinnedTask,
    deleteBinnedTask
}

export default taskService