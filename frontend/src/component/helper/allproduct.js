import axios from'axios'
export const AllProducts = async () => {
   
      const { data } = await axios.get(`/api/v1/allproducts`);
      return data
};
