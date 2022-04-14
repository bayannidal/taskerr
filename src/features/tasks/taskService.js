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
    console.log(response)
    const response = await axios.post(API_URL + 'task/insert', taskData, config)
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

//Delete task
const deleteTask = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
        }
    }
    const response = await axios.delete(API_URL + `task/${id}`, config)
    console.log(response)

    if (response.status === 200)
        return { id }
    else
        return response.data
}

const taskService = {
    createTask,
    getTasks,
    deleteTask
}

export default taskService