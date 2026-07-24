import axiosApiInstance from "../helper"

const Get_Table=async ()=>{

const table = await axiosApiInstance.get('/add_table/get')
// console.log(table,"table")
// console.log(table.data.data,"data")
return table.data.data
}

export default Get_Table