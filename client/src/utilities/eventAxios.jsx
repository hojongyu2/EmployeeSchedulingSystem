import axios from 'axios';
import createAxiosInstance from './createAxiosInstance';

const baseURL = import.meta.env.VITE_REACT_APP_AXIOS
const axiosInstance = createAxiosInstance()

export const getAllExistEvents = async () => {
    const response = await axios.get(`${baseURL}data/event/`)
    console.log(response)
    return response
}

export const getAllExistActivities = async () => {
    const response = await axios.get(`${baseURL}data/event-activity/`)
    console.log(response)
}

export const getAllVolunteers = async () => {
    const response = await axios.get(`${baseURL}data/volunteer-shift/`)
    console.log(response)
}

export const createEvent = async (data) => {
    const response = await axios.post(`${baseURL}data/event/`, data)
    console.log(response)
}

export const sendOutVolunteerForm = async (data) => {
    const response = await axios.post(`${baseURL}data/volunteer-signup/`, data)
    console.log(response)
}
