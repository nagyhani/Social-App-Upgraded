'use client'

import { deleteUserPost } from '@/app/(main)/postsActions/postsActions'
import { AlertDialog,  AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MoreHorizontalIcon, SquarePen, Trash2Icon } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'
import EditPost from '../EditPost/EditPost'

export default function DropDownMenu({postId} : {postId : string}) {




   async function handelPostDelete(){
        const data = await deleteUserPost(postId)

       if(data.message == "success"){

        toast.success("Post Deleted" , {position : 'top-center'})

        setTimeout(()=>{
            window.location.reload()
        },1000)
       }
        
    }
  return (
    <div>   <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" aria-label="More Options">
                  <MoreHorizontalIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuGroup>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <SquarePen />
                <div className='w-full'>
                  <EditPost/>
                </div>
                  </DropdownMenuItem>

                              <AlertDialog>
  <AlertDialogTrigger asChild >
    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
      <Trash2Icon />
      <span>Delete</span>
    </DropdownMenuItem>
  </AlertDialogTrigger>

  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure you want to delete this post?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your
        Post.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={handelPostDelete}>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
                </DropdownMenuGroup>
              
               
              </DropdownMenuContent>
            </DropdownMenu>
    </div>
  )
}
