import axios from 'axios'

const instance = axios.create({
    baseURL:"https://internshala-full-stack-projects.onrender.com/",
    withCredentials:true

})

export default instance;;