
import api from '../util/utilities'
const API_URL = 'http://localhost:8080/'



//Create Task
const createTask = async (taskData) => {
    const response = await api.post('tasks/insert', taskData)
    console.log(response)
    return response.data
}

//Get All Tasks
const getTasks = async () => {
    const response = await api.get(`tasks/user`)
    // console.log(response)
    return response.data
}

const getTaskById = async () => {
    const response = await api.get()
}

//Delete task
const trashTask = async (id) => {
    const response = await api.put(`tasks/${id}/trash`)
    console.log(response)
    if (response.status === 200) {
        return { id }
    }
    else
        return response.data
}

//Get All Binned Tasks
const getBinnedTasks = async () => {
    const response = await api.get(`tasks/user/binned`)
    // console.log(response)
    return response.data
}

//Restore Binned Tasks
const restoreBinnedTask = async (id) => {
    const response = await api.put(`tasks/${id}/restore`, id)
    console.log(response)
    if (response.status === 200) {
        console.log(id)
        return { id }
    }

}

//Delete binned task
const deleteBinnedTask = async (id) => {
    const response = await api.delete(`tasks/${id}`)
    console.log(response)
    if (response.status === 200) {
        return { id }
    }
}

//Update Task
const updateTask = async (taskData) => {
    const { id } = taskData
    const response = await api.put(`tasks/${id}/edit`, taskData)
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