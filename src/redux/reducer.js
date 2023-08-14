import { createSlice } from "@reduxjs/toolkit"
import {
  AUTH,
  QUESTION_ID,
  QUESTION_LIST,
  SELECTED_TYPE,
  SHOW_QNS_MODEL,
  UPDATE_ANSWER
} from "./actionsType"
import { auth } from "../firebase"

import { removeSpecials } from "../utils/utils"
import {
  addAnswerThunk,
  addQuestionThunk,
  fetchQNAThunk,
  removeAnsThunk,
  voteThunk
} from "./thunks"

export const questionSlice = createSlice({
  name: QUESTION_LIST,
  initialState: {
    value: {
      qna: {},
      ans: {}
    },
    error: ""
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchQNAThunk.fulfilled, (state, action) => {
      state.value.qna = action.payload.qna
      state.value.ans = action.payload.ans
    })
    builder.addCase(addQuestionThunk.fulfilled, (state, action) => {
      const { question, questionedBy, profilePicture } = action.payload
      state.value.qna[removeSpecials(question)] = {
        answers: {},
        question,
        questionedBy,
        profilePicture
      }
    })
    builder.addCase(addAnswerThunk.fulfilled, (state, action) => {
      const {
        answer,
        answeredBy,
        imgUrl,
        question,
        answerKey,
        profilePicture
      } = action.payload
      const questionKey = removeSpecials(question)
      if (!Object.hasOwn(state.value.qna[questionKey], "answers")) {
        state.value.qna[questionKey]["answers"] = {}
      }
      if (!Object.hasOwn(state.value.ans, "questionKey")) {
        state.value.ans[questionKey] = {}
      }

      state.value.qna[questionKey].answers[answerKey] = {
        answer,
        answeredBy,
        imgUrl,
        profilePicture,
        voters: {},
        downVoters: {}
      }
      state.value.ans[questionKey][answerKey] = {
        answer,
        answeredBy,
        imgUrl,
        profilePicture
      }
    })
    builder.addCase(voteThunk.fulfilled, (state, action) => {
      const { ansKey, question, inc, uid, downVoted } = action.payload
      const questionKey = removeSpecials(question)
      if (
        !Object.hasOwn(state.value.qna[questionKey].answers[ansKey], "voters")
      ) {
        state.value.qna[questionKey].answers[ansKey]["voters"] = {}
      }
      if (
        !Object.hasOwn(
          state.value.qna[questionKey].answers[ansKey],
          "downVoters"
        )
      ) {
        state.value.qna[questionKey].answers[ansKey]["downVoters"] = {}
      }
      if (downVoted) {
        delete state.value.qna[questionKey].answers[ansKey].voters[uid]
        inc
          ? (state.value.qna[questionKey].answers[ansKey].downVoters[uid] = uid)
          : delete state.value.qna[questionKey].answers[ansKey].downVoters[uid]
      } else {
        delete state.value.qna[questionKey].answers[ansKey].downVoters[uid]
        if (inc) {
          state.value.qna[questionKey].answers[ansKey].voters[uid] = uid
        } else {
          delete state.value.qna[questionKey].answers[ansKey].voters[uid]
        }
      }
    })
    builder.addCase(removeAnsThunk.fulfilled, (state, action) => {
      const questionKey = removeSpecials(action.payload.question)
      delete state.value.qna[questionKey].answers[action.payload.answerKey]
      delete state.value.ans[questionKey][action.payload.answerKey]
    })
  }
})

const questionIdSlice = createSlice({
  name: QUESTION_ID,
  initialState: {
    value: ""
  },
  reducers: {
    setQuestionId: (state, action) => {
      state.value = action.payload
    }
  }
})
const showAddQnsSlice = createSlice({
  name: SHOW_QNS_MODEL,
  initialState: {
    value: false
  },
  reducers: {
    setShowQns: (state, action) => {
      state.value = action.payload
    }
  }
})
const authSlice = createSlice({
  initialState: {
    value: auth.currentUser
      ? {
          displayName: auth.currentUser.displayName,
          photoURL: auth.currentUser.photoURL,
          uid: auth.currentUser.uid || null
        }
      : null
  },
  name: AUTH,
  reducers: {
    setAuth: (state, action) => {
      state.value = action.payload
    }
  }
})

const selectAnswerSlice = createSlice({
  name: SELECTED_TYPE,
  initialState: {
    value: "all"
  },
  reducers: {
    setSelected: (state, action) => {
      state.value = action.payload
    }
  }
})

const updateAnswerSlice = createSlice({
  name: UPDATE_ANSWER,
  initialState: {
    value: {
      questionKey: "",
      answerKey: ""
    }
  },
  reducers: {
    setQuestionAndAnswerKey: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { setQuestionId } = questionIdSlice.actions
export const questionIdReducer = questionIdSlice.reducer

export const { setShowQns } = showAddQnsSlice.actions
export const showAddQnsReducer = showAddQnsSlice.reducer

export default questionSlice.reducer
export const { setAuth } = authSlice.actions
export const authReducer = authSlice.reducer

export const selectAnswerReducer = selectAnswerSlice.reducer
export const { setSelected } = selectAnswerSlice.actions

export const updateAnswerReducer = updateAnswerSlice.reducer
export const { setQuestionAndAnswerKey } = updateAnswerSlice.actions
