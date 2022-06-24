import { GET_CATEGORY } from "../types";

export const getCategories=(data:any)=>(dispatch:any)=>{
    try {
        dispatch({
            type: GET_CATEGORY,
            payload: data
          });
    } catch (err) {
        console.log(err)
    }
}