import axiosApiInstance from "../helper"

const Get_dish=async ()=>{
    try {
        const dish= await axiosApiInstance.get('/dish/get')
        return dish.data
    } catch (error) {
        console.log(error)
        
    }
}