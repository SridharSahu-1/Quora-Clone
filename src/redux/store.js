import { configureStore } from "@reduxjs/toolkit"
import QNAReducer, {
  authReducer,
  questionIdReducer,
  selectAnswerReducer,
  showAddQnsReducer,
  updateAnswerReducer
} from "./reducer"


export const store = configureStore({
  reducer: {
    question: QNAReducer,
    questionId: questionIdReducer,
    showQnsModel: showAddQnsReducer,
    auth: authReducer,
    select: selectAnswerReducer,
    updateAnswer: updateAnswerReducer
  }
})

export default store
