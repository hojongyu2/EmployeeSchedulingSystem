import axios from 'axios';
import createAxiosInstance from './createAxiosInstance';

const baseURL = import.meta.env.VITE_REACT_APP_AXIOS

const axiosInstance = createAxiosInstance()

export const getAllExistEvents = async () => {
    try {
        const response = await axios.get(`${baseURL}data/event/`)
        // console.log(response)
        return response.data
    }catch (e) {
        console.log('Error while fetching event data :' + e)
    }
}

export const getAllExistActivities = async (data) => {
    try {
        const response = await axios.post(`${baseURL}data/event-activity/`, data)
        // console.log(response.data)
        return response.data
    }catch (e) {
        console.log('Error while fetching event activity data :' + e)
    }
}
// getAllExistActivities({eventID:15})
export const getAllVolunteers = async (data) => {
    try {
        const response = await axios.post(`${baseURL}data/volunteer-shift/`, data)
        return response.data
    }catch (e) {
        console.log('Error while fetching event volunteer data :' + e)
    }
}
// getAllVolunteers({eventActivityID: 1})
export const createEvent = async (data) => {
    try {
        const response = await axios.post(`${baseURL}data/event/`, data)
        return response
    }catch (e) {
        console.log('Error while fetching event data :' + e)
    }
}

export const sendOutVolunteerForm = async (data) => {
    try {
        const response = await axios.post(`${baseURL}data/volunteer-signup/`, data)
        return response.data
    } catch (e) {
        console.log('Error while fetching event data :' + e)
    }
}
