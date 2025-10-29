'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { createNewComment } from '@/app/(main)/commentAction/commentAction'
import { toast } from 'sonner'


export default function CreateComment({ID } : {ID : string}) {


    
      const commentSchema = z.object({
        content : z.string().nonempty("Can't make empty comment").min(3,"min char is 3"),
        post : z.string()
      })
    
      const commentForm = useForm({defaultValues: {
          "content":"",
          "post" : ID
      },resolver:zodResolver(commentSchema) })

 
     async function handelComment(values : z.infer<typeof commentSchema>){

        const data = await createNewComment(values)

        console.log(data);

        if(data.message == "success"){
          toast.success('Comment Created' ,{position : "top-center"})
         setTimeout(()=>{
                window.location.reload()
            },1000)
        }
        


      }
    
    
  return (


   <>
     <FormProvider {...commentForm}>
    <div className='border bg-amber-100 rounded-2xl p-3.5 mt-4 flex flex-col justify-center border-black'>

     

             
            <form className='my-2.5' onSubmit={commentForm.handleSubmit(handelComment)}>
    


    
        <FormField
        control={commentForm.control}
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

           <FormField
        control={commentForm.control}
        name="post"
        render={({field}) => (
          <FormItem>
           
            <FormControl>
              <Input  hidden className='my-2' {...field}/>
            </FormControl>
          
            <FormMessage />
          </FormItem>
        )}
      />
    
    

    
    <Button className='mt-9 w-full cursor-pointer'>Add comment</Button>
   
    
    
            </form>
    


    </div>
         
    
            </FormProvider>


     
   </>
    
   
  )
}
