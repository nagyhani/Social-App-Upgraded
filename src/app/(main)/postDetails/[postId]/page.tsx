'use client'

import React, { useContext, useEffect, useState } from 'react'
import { PostDetails } from '../../postsActions/postsActions';
import { DetailsPost } from '@/app/types/postDetails';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import CreateComment from '@/app/_components/CreateComment/CreateComment';
import Loading from './loading';
import DropDownMenuComments from '@/app/_components/DropDownMenuComments/DropDownMenuComments';
import { UserContext } from '@/app/UserContext/UserContext';


export default function PostDetailss({params} : {params : {postId : string}} ) {

    const {postId} =  params


    const user = useContext(UserContext)

    const [post , setPost] = useState<DetailsPost | null>(null)

    console.log(postId);

    useEffect(()=>{
        handelPostDetails()
    },[])

   async function handelPostDetails(){

        const data : DetailsPost = await PostDetails(postId)

       if(data.message === 'success'){

        setPost(data)
       }
        
    }
    
 return (
  <div className="p-5">
    <div className="bg-amber-100 rounded-2xl p-10 my-10 w-full md:w-3/4 lg:w-2/4 mx-auto">
      <div className="flex justify-between">
    <div className='flex'>
          <Avatar>
          <AvatarImage src={post?.post.user.photo} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="mx-2.5">
          <h1>{post?.post.user.name}</h1>
          
          {post?.post.createdAt
  ? new Date(post.post.createdAt)
      .toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
      .replace(",", " at ")
  : <Loading/>}
          
        </div>
    </div>

      </div>

      <h1 className="text-lg my-2">{post?.post.body}</h1>

      <div className="flex justify-center items-center">

        {post?.post._id &&     <Image
          alt={post?.post.body || "Post image"}
          src={post?.post.image}
          width={500}
          height={250}
          className="rounded-lg object-cover mt-4"
        />}
    
      </div>

      <div className="mt-2 flex justify-between">
        <h1>{post?.post.comments.length} comments</h1>
      </div>

{post?.post._id && <CreateComment ID={post.post._id} />}
    </div>

    {post?.post.comments.map((com)=>{
    return <div key={com._id} className='p-5 bg-amber-300 my-3 rounded-2xl w-full md:w-3/4 lg:w-2/4 mx-auto'>
      <div className="flex justify-between">

        
 <div className='flex'>
     <Avatar>
  <AvatarImage src={com.commentCreator.photo} />
  <AvatarFallback>user</AvatarFallback>
</Avatar>

<div className="mx-4">
  <h1>{com.commentCreator.name}</h1>
  <span className="text-xs">{new Date(com.createdAt)
  .toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
  .replace(",", "")}</span>
 </div>
</div>

{user?.user._id  === com.commentCreator._id ? <DropDownMenuComments commentId= {com._id}/> : ""}


  </div>

   <div>
    {com.content}
  </div>
  
    </div>
  })}
  </div>

  
)

}