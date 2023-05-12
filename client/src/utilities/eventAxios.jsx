import axios from 'axios';
import createAxiosInstance from './createAxiosInstance';

const axiosInstance = createAxiosInstance()

export const getAllExistEvents = async () => {
    const response = await axios.get('data/allEvent/')
    console.log(response)
}

export const createEvent = async (data) => {
    const response = await axiosInstance.post('data/create-event/', data)
    console.log(response)
}

export const sendOutVolunteerForm = async (data) => {
    const response = await axiosInstance.post('data/volunteer-signup/', data)
    console.log(response)
}
