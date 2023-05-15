import axios from 'axios';
import createAxiosInstance from './createAxiosInstance';

const baseURL = import.meta.env.VITE_REACT_APP_AXIOS

const axiosInstance = createAxiosInstance()

export const getAllExistEvents = async () => {
    try {
        const response = await axiosInstance.get(`${baseURL}data/event/`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            // Handle token expiration error that throw error. This allows the caller to handle the token expiration error
            console.log('Token has expired.');
            throw error;
        } else {
            // Handle other errors
            console.log('Error while fetching event data: ', error);
            throw error;
        }
    }
};

export const getAllExistActivities = async (data) => {
    try {
        const response = await axiosInstance.post(`${baseURL}data/event-activity/`, data)
        return response.data
    }catch (error) {
        if (error.response && error.response.status === 401) {
            // Handle token expiration error
            console.log('Token has expired.');
            throw error;
        } else {
            // Handle other errors
            console.log('Error while fetching event activity data :' + error)
            throw error;
        }
    }
}

export const getAllVolunteers = async (data) => {
    try {
        const response = await axiosInstance.post(`${baseURL}data/volunteer-shift/`, data)
        return response.data
    }catch (error) {
        if (error.response && error.response.status === 401) {
            // Handle token expiration error
            console.log('Token has expired.');
            throw error;
        } else {
            // Handle other errors
            console.log('Error while fetching event volunteer data :' + error)
            throw error;
        }
    }
}

export const createEvent = async (data) => {
    try {
        const response = await axiosInstance.post(`${baseURL}data/event/`, data)
        return response
    }catch (error) {
        if (error.response && error.response.status === 401) {
            // Handle token expiration error
            console.log('Token has expired.');
            throw error;
        } else {
            // Handle other errors
            console.log('Error while fetching event volunteer data :' + error)
            throw error;
        }
    }
}

export const sendOutVolunteerForm = async (data) => {
    try {
        const response = await axios.post(`${baseURL}data/volunteer-signup/`, data)
        return response.data
    } catch (error) {
        console.log('Error while fetching event data :' + error)
    }
}
