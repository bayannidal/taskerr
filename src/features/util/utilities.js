import axios from "axios"
const API_URL = 'http://localhost:8080/'
let username = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).username : null
let token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null
const api = axios.create({
    baseURL: API_URL,
    headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
        "subject": username
    }
})

api.interceptors.request.use(async (req) => {
    token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null
    username = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).username : null
    req.headers.Authorization = `Bearer ${token}`
    req.headers.subject = username
    return req
})


export default api