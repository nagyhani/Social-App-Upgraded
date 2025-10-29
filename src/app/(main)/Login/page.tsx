'use client'

import React from 'react'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'



export default function Login() {

 

  const Route = useRouter()

  const loginSchema = z.object({
    email : z.string().nonempty("Email Is Requierd").regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
     password : z.string().nonempty("Password is requiered").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/ , "Password must Start with capital letter and contain special char like ! @ # $ % ^ & * - ? with minumum of 8 characters"),
  })

  const loginForm = useForm({defaultValues: {
      "email":"",
      "password":"",
  },resolver:zodResolver(loginSchema) })


 async function handelLogin(values : z.infer<typeof loginSchema >){

   const data = await signIn('credentials' , {
      email : values.email,
      password : values.password,
      redirect : false
    })

    if(data?.ok){

      toast.success("Sign in sucessfull" , {position : 'top-center'})
      Route.push('/')
    }else{
      toast.error("invalid Email or password" , {position : 'top-center'})
    }
    
    
  }
  return (
      <div className='p-6 min-h-screen flex justify-center items-center bg-gray-50'>

      <div className='bg-white border rounded-2xl shadow-2xl p-7 text-center w-full md:w-2/3 lg:w-4/12'>

       <div className='mb-11'>
          <h1 className=' text-3xl font-bold my-2.5'>
           Login in to Social app
        </h1>
        
       
         <hr className='mt-5' />
       </div>

      

        <FormProvider {...loginForm}>

          
        <form className='my-2.5' onSubmit={loginForm.handleSubmit(handelLogin)}>

           


    <FormField
    control={loginForm.control}
    name="email"
    render={({field}) => (
      <FormItem>
       
        <FormControl>
          <Input type='email' className='my-2' {...field} placeholder='Email...'/>
        </FormControl>
      
        <FormMessage />
      </FormItem>
    )}
  />





   <FormField
    control={loginForm.control}
    name="password"
    render={({field}) => (
      <FormItem>
       
        <FormControl>
          <Input type='password' className='my-2' {...field} placeholder='Password...'/>
        </FormControl>
      
        <FormMessage />
      </FormItem>
    )}
  />

   



<Button className='mt-9 w-full cursor-pointer'>Sign in</Button>
<Link href={"/Register"}> <h1 className='text-blue-600 underline cursor-pointer mt-3.5 text-lg'>Create new account</h1></Link>


        </form>


        </FormProvider>

      </div>

       

    </div>
  )
}
