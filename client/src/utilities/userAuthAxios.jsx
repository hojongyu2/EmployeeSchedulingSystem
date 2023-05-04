import { axiosWithCSRF } from "./axiosWithCSRF";

export const userSignUp = async (userInfo) => {
    const response = await axiosWithCSRF.post('api/register/', userInfo)
    console.log(response)
    return response.data
}

export const userLogIn = async (userInfo) => {
    try {
        const response = await axiosWithCSRF.post('api/login/', userInfo)
        console.log(response)
        return response.data
    } catch (e) {
        console.log('Error while fetching user log in :' + e)
    }
}

export const userSignOut = async () => {
    try {
        const response = await axiosWithCSRF.post('api/logout/')
        console.log(response)
        return response.data
    }catch (e) {
        console.log('Error while fetching user logout :' + e)
    }
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