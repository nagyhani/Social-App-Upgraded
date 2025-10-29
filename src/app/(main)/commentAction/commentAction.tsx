'use server'


import getUserToken from "@/getUserToken"

export async function createNewComment(values : {content : string , post : string}) {
  const token = await getUserToken()

  if (!token) {
    throw new Error("token invalid")
  }

 

  const res = await fetch(`${process.env.NEXT_BASE_URL}/comments`, {
    headers: {
      token: token as string, 
      "Content-Type": "application/json"
    },
    cache: "no-store",

    body : JSON.stringify(values),
    method : "post"
  })

  if (!res.ok) {
    
    throw new Error(`Failed to fetch posts: ${res.status}`)
  }

  const data  = await res.json()


  return data
}


export async function updateComment(values : {content : string} , id : string) {
  const token = await getUserToken()

  if (!token) {
    throw new Error("token invalid")
  }

 

  const res = await fetch(`${process.env.NEXT_BASE_URL}/comments/${id}`, {
    headers: {
      token: token as string, 
      "Content-Type": "application/json"
    },
    cache: "no-store",

    body : JSON.stringify(values),
    method : "put"
  })

  if (!res.ok) {
    
    throw new Error(`Failed to fetch posts: ${res.status}`)
  }

  const data  = await res.json()


  return data
}


