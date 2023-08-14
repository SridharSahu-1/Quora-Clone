import { initializeApp } from "firebase/app"
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword
} from "firebase/auth"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"

import { useEffect, useState } from "react"
import { generateRandomUid } from "./utils"
import { getDatabase } from "firebase/database"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  databaseURL: process.env.REACT_APP_DATABASEURL
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getDatabase(app)

export const signInWithFacebookOrGoogle = async providerType => {
  const provider =
    providerType === "google"
      ? new GoogleAuthProvider()
      : new FacebookAuthProvider()
  providerType === "google"
    ? provider.addScope("profile")
    : provider.addScope("public_profile") && provider.addScope("user_photos")
  provider.addScope("email")
  try {
    const user = (await signInWithPopup(auth, provider)).user
    return {
      displayName: user.displayName,
      photoURL: user.photoURL,
      uid: user.uid
    }
  } catch {
    return null
  }
}

export function useAuth() {
  const [user, setUser] = useState(null)
  useEffect(() => {
    const subscribe = auth.onAuthStateChanged(user => {
      setUser(user)
    })
    return subscribe
  }, [])
  return user
}
export function userData(USER) {
  return new Promise((resolve, reject) => {
    if (USER) {
      resolve(USER)
    }
    auth.onAuthStateChanged(
      user => {
        const data = user
          ? {
              displayName: user.displayName,
              photoURL: user.photoURL,
              uid: user.uid
            }
          : null
        resolve(data)
      },
      error => {
        reject(error)
      }
    )
  })
}
export async function signUpWithEmailAndPassword(user) {
  try {
    const res = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    )
    updateProfile(res.user, {
      displayName: user.name
    })
    return res.user
  } catch (e) {
    throw e
  }
}
export async function LogInWithEmailAndPassword(email, password) {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password)
    return {
      displayName: res.user.displayName,
      photoURL: res.user.photoURL,
      uid: res.user.uid
    }
  } catch (e) {
    throw e
  }
}

export async function uploadImage(file) {
  const storageRef = ref(
    storage,
    `/images/${generateRandomUid()}.${file.type.split("/").pop()}`
  )
  if (!/(^image)(\/)[a-zA-Z0-9_]*/gm.test(file.type)) {
    throw new Error("only images are allow")
  }
  try {
    await uploadBytes(storageRef, file)
    return await getDownloadURL(storageRef)
  } catch (e) {
    throw e
  }
}
