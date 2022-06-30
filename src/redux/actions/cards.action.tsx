import { CREATE_CARD, GET_CARDS, UPDATE } from "../types";

export const getAllCards = (payload:any) => (dispatch:any) => {
    dispatch({
      type: GET_CARDS,
      payload,
    });
  };
  
  export const getCards = (data:any) => async (dispatch:any) => {
  dispatch(getAllCards(data))
  };

  export const createCard = (data:any) => async (dispatch:any) => {
    try {
      dispatch({
        type: CREATE_CARD,
        payload: data,
      });
    } catch (error) {
      console.log(error)
    }
  };

  export const updateCard = (payload:any) => (dispatch:any) => {
    dispatch({
      type: UPDATE,
      payload,
    });
  };

  export const upCard = (data:any) => async (dispatch:any) => {
    dispatch(updateCard(data))
    };