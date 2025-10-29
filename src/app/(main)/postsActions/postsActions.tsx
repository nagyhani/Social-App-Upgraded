'use server'

import { DetailsPost} from "@/app/types/postDetails"
import { Posts } from "@/app/types/posts"
import { UserPostss } from "@/app/types/userPosts"
import getUserToken from "@/getUserToken"
import{ jwtDecode } from "jwt-decode"

export async function getPosts(pageNumber : number) { 
  const token = await getUserToken()

  if (!token) {
    console.log(token);
    throw new Error("token invalid")
    
    
  }


  const res = await fetch(`${process.env.NEXT_BASE_URL}/posts?limit=20&sort=-createdAt&page=${pageNumber}`, {
    headers: {
      token: token as string, 
      "Content-Type": "application/json"
    },
    cache: "no-store"
  })

  if (!res.ok) {
    
    throw new Error(`Failed to fetch posts: ${res.status}`)
  }

  const data : Posts = await res.json()


  return data
}




export async function PostDetails(id:string) {
  const token = await getUserToken()

  if (!token) {
    throw new Error("token invalid")
  }



  const res = await fetch(`${process.env.NEXT_BASE_URL}/posts/${id}`, {
    headers: {
      token: token as string, 
      "Content-Type": "application/json"
    },
    cache: "no-store"
  })

  if (!res.ok) {
    
    throw new Error(`Failed to fetch posts: ${res.status}`)
  }

  const data : DetailsPost = await res.json()


  return data
}




export async function PostCreate(values : FormData) {
  const token = await getUserToken()

  if (!token) {
    throw new Error("token invalid")
  }



  const res = await fetch(`${process.env.NEXT_BASE_URL}/posts`, {
    headers: {
      token: token as string, 
    
    },
    cache: "no-store",
    method : 'post',
     body : values
  })

  if (!res.ok) {
    
    throw new Error(`Failed to fetch posts: ${res.status}`)
  }

  const data = await res.json()


  return data
}



export async function getUserPosts() { 
  const token = await getUserToken()

  if (!token) {
    throw new Error("token invalid")
  }

  const info = jwtDecode(token as string) as { user: string };

  const res = await fetch(`${process.env.NEXT_BASE_URL}/users/${info.user}/posts?limit=10`, {
    headers: {
      token: token as string, 
      "Content-Type": "application/json"
    },
    cache: "no-store"
  })

  if (!res.ok) {
    
    throw new Error(`Failed to fetch posts: ${res.status}`)
  }

  const data : UserPostss = await res.json()


  return data
}



export async function deleteUserPost(postId : string) { 
  const token = await getUserToken()

  if (!token) {
    throw new Error("token invalid")
  }


  const res = await fetch(`${process.env.NEXT_BASE_URL}/posts/${postId}`, {
    headers: {
      token: token as string, 
      
    },
    cache: "no-store",
    method : "delete"
  })

  if (!res.ok) {
    
    throw new Error(`Failed to fetch posts: ${res.status}`)
  }

  const data : UserPostss = await res.json()


  return data
}


export async function updateUserPost(values: FormData ,postId : string) { 
  const token = await getUserToken()

  if (!token) {
    throw new Error("token invalid")
  }


  const res = await fetch(`${process.env.NEXT_BASE_URL}/posts/${postId}`, {
    headers: {
      token: token as string, 
      
    },
    cache: "no-store",
    method : "put",
    body : values
  })

  if (!res.ok) {
    
    throw new Error(`Failed to fetch posts: ${res.status}`)
  }

  const data : UserPostss = await res.json()


  return data
}
