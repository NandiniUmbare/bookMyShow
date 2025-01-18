const {axiosInstance} = require('./index.js');

export const registerUser = async (userData) => {
    try {
        const response = await axiosInstance.post('api/users/register', userData)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const loginUser = async (userData) => {
    try {
        const response = await axiosInstance.post('api/users/login', userData)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const GetCurrentUser = async () => {
    try {
        const response = await axiosInstance.get('api/users/current')
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const forgetPassword = async(payload) => {
    try {
        const response  = await axiosInstance.patch('api/users/forgetpassword', payload)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const resetPassword = async(values, email) => {
    try {
        const response = await axiosInstance.patch(`api/users/resetpassword/${email}`, values)
        return response.data
    } catch (error) {
        console.log(error)
    }
}