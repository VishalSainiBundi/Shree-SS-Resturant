import axiosApiInstance from "../helper"

const getUser=async ()=>{
    const user= await axiosApiInstance.get('/user/get')
    console.log(user.data.data)
    return user.data.data
}

export default getUser