import axiosApiInstance from "../helper"

const get_Reserve= async()=>{
try {
    const data = await axiosApiInstance.get('/reserve/get')
    console.log(data,"dataReserve")
    console.log(data.data?.reserdata)

    return data.data.reserdata
    
} catch (error) {
    console.log(error)
    return ("Error")
}

}

export default get_Reserve