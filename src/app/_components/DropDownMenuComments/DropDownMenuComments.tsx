'use client'
import { updateComment } from '@/app/(main)/commentAction/commentAction'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { MoreHorizontalIcon, SquarePen } from 'lucide-react'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from "zod"

export default function DropDownMenuComments({commentId} : {commentId : string}) {

  const updateCommentSchema = z.object({
          content : z.string().nonempty("Can't make empty comment").min(3,"min char is 3"),
         
        })
      
        const updateCommentForm = useForm({defaultValues: {
            "content":"",
           
        },resolver:zodResolver(updateCommentSchema) })
  
   
       async function handelUpdateComment(values : z.infer<typeof updateCommentSchema>){

        const data = await updateComment(values , commentId)
  
        if(data.message == "success"){

          toast.success("Comment Updated" , {position : 'top-center'})

          setTimeout(()=>{
            window.location.reload()
          },1000)
        }
        

          
  
  
        }
      
  return (
   <DropdownMenu>
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

                  <Dialog>
      <form>
        <DialogTrigger asChild>
          <span>Edit Comment</span>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit comment</DialogTitle>
            <DialogDescription>
              Make changes to your comment here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <FormProvider {...updateCommentForm}>
    <div className='border  rounded-2xl p-3.5 mt-4 flex flex-col justify-center border-black'>

     

             
            <form className='my-2.5' onSubmit={updateCommentForm.handleSubmit(handelUpdateComment)}>
    


    
        <FormField
        control={updateCommentForm.control}
        name="content"
        render={({field}) => (
          <FormItem>
           
            <FormControl>
              <Input  className='my-2' {...field} placeholder='comment...'/>
            </FormControl>
          
            <FormMessage />
          </FormItem>
        )}
      />

        
    <Button className='mt-9 w-full cursor-pointer'>Add comment</Button>
   
    
    
            </form>
    


    </div>
         
    
            </FormProvider>

          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
                
                </div>
                  </DropdownMenuItem>


                </DropdownMenuGroup>
              
               
              </DropdownMenuContent>
            </DropdownMenu>
  )
}
