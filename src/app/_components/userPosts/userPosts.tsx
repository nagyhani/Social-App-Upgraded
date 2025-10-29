'use client'
import { getUserPosts } from '@/app/(main)/postsActions/postsActions'
import { Post, UserPostss } from '@/app/types/userPosts'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import CreateComment from '../CreateComment/CreateComment'
import DropDownMenu from '../DropDownMenu/DropDownMenu'
import DropDownMenuComments from '../DropDownMenuComments/DropDownMenuComments'
import { UserContext } from '@/app/UserContext/UserContext'

export default function UserPosts() {

  const [post , setPost] = useState<Post[]>([])


  const user = useContext(UserContext)

useEffect(()=>{

handelUserPosts()

},[])

 async function handelUserPosts(){

    const data : UserPostss = await getUserPosts()

    console.log(data);

    if(data.message == "success"){

      setPost(data.posts)
    }
    
  }
  return (
    <div className="p-1 mt-40">

     
   {post.map((po)=>{

    return <div key={po._id} className="bg-amber-100 rounded-2xl p-10 my-10 w-full md:w-3/4 lg:w-2/4 mx-auto">

      {po ? <>
      <div className="flex justify-between">

        <div className='flex'>
                 <Avatar>
  <AvatarImage src={po.user.photo} />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>

<div  className="mx-2.5">
  <h1>{po.user.name}</h1>
{new Date(po.createdAt)
  .toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
  .replace(",", "at")}
</div>


        </div>
        <DropDownMenu postId = {po._id}/>
      </div>

   

  <h1 className="text-lg my-2">{po.body}</h1>

  <div className = "flex justify-center items-center">{po.image ? (
  <Image
    alt={po.body|| "Post image"}
    src={po.image}
    width={500}
    height={250}
    className="rounded-lg object-cover mt-4"
  />
) : null}
</div>

 <div className="mt-2 flex justify-between">
  <h1>{po.comments.length } comments</h1>

  <Link href = {"/postDetails/"+ po._id}  >See Post details</Link>
 </div>

{po.comments.length > 0 ? <div className="bg-amber-200 p-3 rounded-2xl mt-3">
  <div className="flex justify-between">
 <div className='flex'>
     <Avatar>
  <AvatarImage src={po.comments[0].commentCreator?.photo} />
  <AvatarFallback>user</AvatarFallback>
</Avatar>

<div className="mx-4">
  <h1>{po.comments[0].commentCreator?.name}</h1>
  <span className="text-xs">{new Date(po.comments[0].createdAt)
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
{user?.user._id === po.comments[0].commentCreator?._id}
<DropDownMenuComments commentId = {po.comments[0]._id}/>
  </div>

  <div>
    {po.comments[0].content}
  </div>
  



 

</div> : ""}

<CreateComment ID = {po._id} />
</> : "No posts yet !!"}

    </div>
   })}
    </div>
  )
}
