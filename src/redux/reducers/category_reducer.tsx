import { GET_CATEGORY } from "../types"

const initialState ={
    categories:[]
}

export const allCategoriesReducer =(state=initialState,action:{type:string,payload:any})=>{
     switch (action.type) {
        case GET_CATEGORY:
             return {
                ...state,
                categories: action.payload
             }
        default:
            return state
     }
}