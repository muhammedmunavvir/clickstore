import { getproductsModel } from "../models/productsScheama.js"

export const fetchAllProducts = async () => {
  return await getproductsModel.find()
}

export const  fetchProductsByCategory = async (category) => {
  return await getproductsModel.find({ catogory: category })
}

export const fetchProductById = async (id) => {
  return await getproductsModel.findById({ _id: id })
}
   
export const fetchFeaturedProducts = async () => {  
  const products = await getproductsModel.find()
  return products.filter((item) => item.rating >= 4.5)
}


 
