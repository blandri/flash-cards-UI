import { CREATE_CARD } from "../types"

const initialState ={
    message:""
}

export const createCardReducer =(state=initialState,action:{type:string,payload:any})=>{
     switch (action.type) {
        case CREATE_CARD:
             return {
                ...state,
                message: action.payload
             }
        default:
            return state
     }
}
