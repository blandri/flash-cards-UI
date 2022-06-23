import { GET_CARDS } from "../types";

const initialState ={
    cards:[]
}

export const allCardsReducer =(state=initialState,action:{type:string,payload:any})=>{
     switch (action.type) {
        case GET_CARDS:
             return {
                ...state,
                cards: action.payload
             }
        default:
            return state
     }
}