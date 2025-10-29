'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'


export default function UpdateComment() {


    
      const UpdateCommentSchema = z.object({
        content : z.string().nonempty("Can't make empty comment").min(3,"min char is 3"),
        post : z.string()
      })
    
      const UpdateCommentForm = useForm({defaultValues: {
          "content":"",
          "post" : ""
      },resolver:zodResolver(UpdateCommentSchema) })

 
 
      function updateComment(values : z.infer<typeof UpdateCommentSchema>){
        console.log(values);
        
      }
    
  return (


   <>
     <FormProvider {...UpdateCommentForm}>
    <div className='border bg-amber-100 rounded-2xl p-3.5 mt-4 flex flex-col justify-center border-black'>

     

             
            <form className='my-2.5' onSubmit={UpdateCommentForm.handleSubmit(updateComment)}>
    


    
        <FormField
        control={UpdateCommentForm.control}
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
        control={UpdateCommentForm.control}
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
    
    

    
    <Button className='mt-9 w-full cursor-pointer'>Update comment</Button>
   
    
    
            </form>
    


    </div>
         
    
            </FormProvider>


     
   </>
    
   
  )
}
