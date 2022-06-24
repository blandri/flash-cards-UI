import { CREATE_CARD, UPDATE } from "../types"

const initialState ={
    createMessage:""
}

export const createCardReducer =(state=initialState,action:{type:string,payload:any})=>{
     switch (action.type) {
        case CREATE_CARD:
             return {
                ...state,
                createMessage: action.payload
             }
        case UPDATE:
             return {
               ...state,
               updateMessage: action.payload
             }
        default:
            return state
     }
}
