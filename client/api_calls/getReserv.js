import axiosApiInstance from "../helper"

const get_Reserve= async()=>{
try {
    const data = await axiosApiInstance.get('/reserve/get')
    console.log(data,"dataReserve")
    return data.data
    
} catch (error) {
    console.log(error)
    return ("Error")
}

}