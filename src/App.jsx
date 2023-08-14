import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom"
import LogIn from "./pages/LogIn"
import Home from "./pages/Home"
import Answer from "./pages/Answer"
import Question from "./pages/Question"
import { userData } from "./firebase"
import { useEffect } from "react"
import Following from "./pages/Following"
import ComingSoon from "./pages/ComingSoon"
import NotFound from "./pages/NotFound"
import { useDispatch, useSelector } from "react-redux"
import { setAuth } from "./redux/reducer"
import { fetchQNAThunk } from "./redux/thunks"

export default function App() {
  const [USER, data] = useSelector(state => [
    state.auth.value,
    state.question.value
  ])
  const dispatch = useDispatch()

  useEffect(() => {
    if (Object.keys(data.qna).length === 0 && USER) {
      dispatch(fetchQNAThunk(USER.uid))
    }
  }, [data, dispatch, USER])
  const NotLoggedInLoader = async () => {
    const user = await userData(USER)
    dispatch(setAuth(user))
    if (!user) {
      return redirect("/login")
    }
    return null
  }
  const LoggedInLoader = async () => {
    const user = await userData(USER)
    dispatch(setAuth(user))
    if (user) {
      return redirect("/")
    }
    return null
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      loader: NotLoggedInLoader
    },
    {
      path: "/login",
      element: <LogIn />,
      loader: LoggedInLoader
    },
    {
      path: "/answer",
      element: <Answer />,
      loader: NotLoggedInLoader
    },
    {
      path: "/question/:id",
      element: <Question />,
      loader: NotLoggedInLoader
    },
    {
      path: "/following",
      element: <Following />,
      loader: NotLoggedInLoader
    },
    {
      path: "/spaces",
      element: <ComingSoon />,
      loader: NotLoggedInLoader  
    },
    {
      path: "/notifications",
      element: <ComingSoon />,
      loader: NotLoggedInLoader
    },
    {
      path: "*",
      element: <NotFound />
    }
  ])
  
  return <RouterProvider router={router} />

}
