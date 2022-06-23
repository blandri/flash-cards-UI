import { combineReducers } from "redux";
import { allCardsReducer } from "./all_cards_reducer";
import { createCardReducer } from "./create_card_reducer";

const rootReducer = combineReducers({
   allCardsReducer,
   createCardReducer
})

export default rootReducer