import { createAsyncThunk } from "@reduxjs/toolkit"
import { QUESTION_LIST } from "./actionsType"
import {
  VoteDb,
  addAnswerToDb,
  addQuestionToDb,
  deleteAnswer,
  generateRandomUid,
  getAllQuestions
} from "../firebase/utils"

export const fetchQNAThunk = createAsyncThunk(
  `${QUESTION_LIST}/fetchQNA`,
  uid => {
    return getAllQuestions(uid)
  }
)

export const addQuestionThunk = createAsyncThunk(
  `${QUESTION_LIST}/addQuestion`,
  async data => {
    await addQuestionToDb(data.question, data.questionedBy, data.profilePicture)
    return {
      question: data.question,
      questionedBy: data.questionedBy,
      profilePicture: data.profilePicture
    }
  }
)
export const addAnswerThunk = createAsyncThunk(
  `${QUESTION_LIST}/addAnswer`,
  async data => {
    const {
      answer,
      answeredBy,
      imgUrl,
      question,
      profilePicture,
      uid,
      answerID
    } = data
    const answerKey = answerID || generateRandomUid()
    await addAnswerToDb(
      question,
      answer,
      answeredBy,
      imgUrl,
      answerKey,
      profilePicture,
      uid
    )
    return { answer, answeredBy, imgUrl, question, answerKey, profilePicture }
  }
)
export const voteThunk = createAsyncThunk(
  `${QUESTION_LIST}/upVote`,
  async ({ ansKey, question, inc, uid, downVoted }) => {
    await VoteDb(question, ansKey, uid, inc, downVoted)
    return { question, ansKey, inc, uid, downVoted }
  }
)
export const removeAnsThunk = createAsyncThunk(
  `${QUESTION_LIST}/removeAnswer`,
  async ({ question, answerKey, uid }) => {
    await deleteAnswer(question, answerKey, uid)
    return { question, answerKey }
  }
)
