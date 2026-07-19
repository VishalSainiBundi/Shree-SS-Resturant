import axiosApiInstance from "../helper"

const GetMenu= async ()=>{
try {
    
    const menu= await axiosApiInstance.get('/menu/get')
    return menu.data
    // console.log(menu,"maindat")
} catch (error) {
   console.log(error) 
}
}

export default GetMenu