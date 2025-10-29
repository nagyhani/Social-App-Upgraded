'use client'

import React, { useEffect, useState } from 'react'
import { getUserProfile, updateUserPhoto } from '../userActions/userActions'
import { UserProfile} from '@/app/types/userProfile'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import * as z from "zod"
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import UserPosts from '@/app/_components/userPosts/userPosts'


export default function UserProfilee() {


    const [user , setUser] = useState<UserProfile>()



    useEffect(()=>{

        handelUserProfile()

    },[])


     const uploadPhotoSchema = z.object({
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
    
        const uploadPhotoForm = useForm({defaultValues: {
            "image":null,
        },resolver:zodResolver(uploadPhotoSchema) })


   async function handelUserProfile(){

        const data : UserProfile = await getUserProfile()

        if(data.message == 'success'){

            setUser(data)
        }
        
    }


   async function UploadPhoto(values : {image : FileList }){

      const formData = new FormData()

      formData.append('photo', values.image[0])

      const data = await updateUserPhoto(formData)

          if(data.message == "success"){
            toast.success('Profile picture changed' , {position : "top-center"})

            setTimeout(()=>{
              window.location.reload()
            },1000)
          }
          
        }
  return (
    <div className='p-5'>

        <div className='flex justify-between items-center  bg-amber-100 rounded-2xl  my-10 w-full md:w-3/4 lg:w-2/4 mx-auto'>

             <div className='flex py-12 px-1.5'>
              {user?.user.photo &&  <Image src={user?.user.photo} alt= {user?.user.name} width={80} height={100} className='rounded-4xl'/>}

             <div className='mx-2.5'>
                <h1 className='md:text-3xl'> {user?.user.name}</h1>

                <h1 className='mt-2.5'> {user?.user.email}</h1>
             </div>
             </div>


                  <FormProvider {...uploadPhotoForm}>
                     
                               
                             <form className='' onSubmit={uploadPhotoForm.handleSubmit(UploadPhoto)}>
             
                                 <div className='flex flex-col items-end'>
            
                                
                    
                     
                         <FormField
                         control={uploadPhotoForm.control}
                         name="image"
                         render={({field}) => (
                           <FormItem>
                            
                             <FormControl>
                               <div className="grid gap-3 bg-black text-white p-1.5 rounded-2xl ">
                <Label htmlFor="picture"><i className="fa-solid fa-pen cursor-pointer"></i></Label>
      <Input hidden id="picture" type="file" accept="image/*"   onChange={(e) => field.onChange(e.target.files)} />
             </div>
                             </FormControl>
                           
                             <FormMessage />
                           </FormItem>
                         )}
                       />
                        <Button className='w-3/4 mt-2 cursor-pointer p-4'>upload</Button>
                                 </div>
                        
                     
                             </form>
                     
                     
                             </FormProvider>


                      
                     


          

        </div>


        <UserPosts/>

       

       

    </div>
  )
}
