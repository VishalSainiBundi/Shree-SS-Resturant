import axiosApiInstance from '../helper'
  const getOrder= async ()=>{

try {
    const order= await axiosApiInstance.get('/order/get')
    // console.log(order.data.data)
    return order.data.data
 
} catch (error) {
    console.log(error)
}
  }


export default getOrder