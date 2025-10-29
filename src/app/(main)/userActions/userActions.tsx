'use server'

import { UserProfile } from "@/app/types/userProfile"
import getUserToken from "@/getUserToken"


export async function getUserProfile() {
  const token= await getUserToken()

  if (!token) {
    throw new Error("token invalid")
  }


  const res = await fetch(`${process.env.NEXT_BASE_URL}/users/profile-data`, {
    headers: {
      token: token as string, 
      "Content-Type": "application/json"
    },
    cache: "no-store"
  })

  if (!res.ok) {
    console.error("Response status:", res.status)
    throw new Error(`Failed to fetch posts: ${res.status}`)
  }

  const data : UserProfile = await res.json()


  return data
}



export async function updateUserPhoto(photo : FormData) {
  const token= await getUserToken()

  if (!token) {
    throw new Error("token invalid")
  }

  console.log("Sending token:", token)

  const res = await fetch(`${process.env.NEXT_BASE_URL}/users/upload-photo`, {
    headers: {
      token: token as string, 
      
    },
    cache: "no-store",
    method: "put",
    body : photo
  })

  if (!res.ok) {
    console.error("Response status:", res.status)
    throw new Error(`Failed to fetch posts: ${res.status}`)
  }

  const data : UserProfile = await res.json()


  return data
}




