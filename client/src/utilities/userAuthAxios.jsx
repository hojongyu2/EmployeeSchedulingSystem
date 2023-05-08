import axios from 'axios';
const baseURL = import.meta.env.VITE_REACT_APP_AXIOS
export const userSignUp = async (userInfo) => {
    try {
        const response = await axios.post(`${baseURL}api/register/`, userInfo)
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);
        // JSON.stringify is neccessary since Local storage can only store key-value pairs in which the keys and values are strings.
        localStorage.setItem('currentUser', JSON.stringify(response.data.current_user))
        return response.data
    } catch (e) {
        const jsonParsed = JSON.parse(e.response.data.form_errors) 
        if (jsonParsed.email){
            return jsonParsed.email[0].message
        } else if (jsonParsed.password2) {
            return jsonParsed.password2[0].message
        } else {
            return `${jsonParsed.email[0].message} "\br" ${jsonParsed.password2[0].message}`
        }
    }
}

export const userLogIn = async (userInfo) => {
    try {
        const response = await axios.post(`${baseURL}api/login/`, userInfo)
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);
        localStorage.setItem('currentUser', JSON.stringify(response.data.current_user))
        return response.data
    } catch (e) {
        console.log(e.response.data.detail)
        return e.response.data.detail
    }
}

export const userSignOut = async () => {
    const response = await axios.post(`${baseURL}api/logout/`)
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