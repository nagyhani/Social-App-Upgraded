'use client'
import { PostCreate } from '@/app/(main)/postsActions/postsActions'
import { UserContext } from '@/app/UserContext/UserContext'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from "zod"

export default function CreatePost() {

    const info = React.useContext(UserContext)

     const createPostSchema = z.object({
        body : z.string().nonempty("This field can't be empty"),
       image: z
    .any()
    .refine(
      (files) => files?.length === 1,
      "You have to insert an image"
    )
    .refine(
      (files) => files?.[0]?.type?.startsWith("image/"),
      "File must be an image"
    ),
      })

    const createPostForm = useForm({defaultValues: {
        "body": "",
        "image":null,
    },resolver:zodResolver(createPostSchema) })


   async function handelCreatePost(values: {body : string , image: FileList }){

    const formData = new FormData()

    formData.append("body" , values.body)
    formData.append("image" ,values.image[0] )

        const data = await PostCreate(formData)

        if(data.message == "success"){

            toast.success("Post Created" , {position : "top-center"})

            setTimeout(()=>{
                window.location.reload()
            },1000)

            
        }
        console.log(data);
        
    }





  return (
    <div className = "bg-amber-100 rounded-2xl p-5 w-full md:w-3/4 lg:w-2/4 mx-auto my-6">
        <h1 className='mb-1.5'>Create post</h1>
        <hr />


         <FormProvider {...createPostForm}>
        
                  
                <form className='my-3' onSubmit={createPostForm.handleSubmit(handelCreatePost)}>

                    <div className='flex justify-between items-center'>
                         <Avatar>
  <AvatarImage src={info?.user.photo} />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
        
                   
          <FormField
            control={createPostForm.control}
            name="body"
            render={({field}) => (
              <FormItem className="flex-1">
               
                <FormControl>
                    
                      <Input className='m-2' type='text' {...field} placeholder="what's on your mind ?"/>
                    
                </FormControl>
              
                <FormMessage />
              </FormItem>
            )}
          />
        
            <FormField
            control={createPostForm.control}
            name="image"
            render={({field}) => (
              <FormItem>
               
                <FormControl>
                <div>
                     <Label htmlFor="photo"><i className="fa-solid fa-image text-3xl m-2 cursor-pointer"> </i></Label>

<Input hidden id= "photo" type = "file" accept="image/*"   onChange={(e) => field.onChange(e.target.files)}/>
                </div>
                </FormControl>
              
                <FormMessage />
              </FormItem>
            )}
          />
                    </div>
            <Button className='w-full text-center mt-2 cursor-pointer'>Create post</Button>
        
                </form>
        
        
                </FormProvider>
        

        <div className='my-3 flex justify-between'>
          


 

        </div>

      

    </div>
  )
}
