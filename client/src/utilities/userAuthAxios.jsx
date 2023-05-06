import axios from 'axios';
const baseURL = import.meta.env.VITE_REACT_APP_AXIOS
export const userSignUp = async (userInfo) => {
    const response = await axios.post(`${baseURL}api/register/`, userInfo)
    localStorage.setItem("access_token", response.data.access);
    localStorage.setItem("refresh_token", response.data.refresh);
    localStorage.setItem('currentUser', )
    console.log(response)
    return response.data
}

export const userLogIn = async (userInfo) => {
    try {
        const response = await axios.post(`${baseURL}api/login/`, userInfo)
        console.log(response)
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);
        localStorage.setItem('currentUser', )
        return response.data
    } catch (e) {
        console.log('Error while fetching user log in :' + e)
    }
}

export const userSignOut = async () => {
    const response = await axiosWithCSRF.post('api/logout/')
    console.log(response)
    return response.data
}

export const getUser = async () => {
    try {
        const response = await axiosWithCSRF.get()
        console.log(response)
        return response.data
    }catch (e) {
        console.log('Error while fetching user data :' + e)
    }
}