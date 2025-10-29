'use client'

import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Link from 'next/link';



export default function Register() {

  const Route = useRouter()

        const registerSchema = z.object({
    name : z.string().nonempty("Name is required").min(3,"minimum char is 3").max(15 , "maximum char is 15"),
    email : z.string().nonempty("Email is required").regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ , "Invalid Form"),
    password : z.string().nonempty("Password is requiered").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/ , "Password must Start with capital letter and contain special char like ! @ # $ % ^ & * - ? with minumum of 8 characters"),
    rePassword : z.string().nonempty("Password is requiered"),
    gender : z.string().regex(/^(male|female)$/),
    dateOfBirth: z
  .string()
  .nonempty("Date of birth is required")
  .refine((val) => {
    const date = new Date(val);
    const now = new Date();
    const age =
      now.getFullYear() -
      date.getFullYear() -
      (now < new Date(now.getFullYear(), date.getMonth(), date.getDate()) ? 1 : 0);
    return age >= 18;
  }, { message: "Must be 18 years or older" }),
  }).refine((obj)=>{
   return  obj.password === obj.rePassword 
  } , {error: "Passwords not Matched" , path: ['rePassword']})
 

    const RegisterForm = useForm({defaultValues: {
    "name": "",
    "email":"",
    "password":"",
    "rePassword":"",
    "dateOfBirth":"",
    "gender":""
},resolver:zodResolver(registerSchema) })

   async function handelRegister(values: z.infer<typeof registerSchema>){


    const res = await fetch('https://linked-posts.routemisr.com/users/signup' , {
        method : "post",
        body : JSON.stringify(values),
        headers : {
            "Content-Type" : "application/json"
        }
    })

    const data = await res.json()

    console.log(data);

    console.log(values);
    

    if(data.message == "success"){
      toast.success("Registerd Succesfully" ,{position : "top-center"})

      Route.push('/Login')
    }else{
      toast.error(data.error ,{position : "top-center"})
    }
    
        

    }



  return (
    <div className='p-6 min-h-screen flex justify-center items-center bg-gray-50'>

      <div className='bg-white border rounded-2xl shadow-2xl p-7 text-center w-full md:w-2/3 lg:w-4/12'>

       <div className='mb-11'>
          <h1 className=' text-3xl font-bold my-2.5'>
            Create a new account
        </h1>
        
        <span className='text-gray-500'> It is quick and easy</span>
         <hr className='mt-5' />
       </div>

       
        <FormProvider {...RegisterForm}>

          
        <form className='my-2.5' onSubmit={RegisterForm.handleSubmit(handelRegister)}>


          <FormField
    control={RegisterForm.control}
    name="name"
    render={({field}) => (
      <FormItem>
       
        <FormControl>
          <Input type='text' className='my-2' {...field} placeholder='Name...'/>
        </FormControl>
      
        <FormMessage />
      </FormItem>
    )}
  />


           


    <FormField
    control={RegisterForm.control}
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

  

  <div className='flex justify-between'>

  {/* Gender field — now radio buttons */}
  <FormField
    control={RegisterForm.control}
    name="gender"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Gender:</FormLabel>
        <FormControl>
          <div className="flex items-center gap-4 my-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="male"
                checked={field.value === "male"}
                onChange={() => field.onChange("male")}
              />
              Male
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="female"
                checked={field.value === "female"}
                onChange={() => field.onChange("female")}
              />
              Female
            </label>
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />

  {/* Date of Birth field */}
  <FormField
    control={RegisterForm.control}
    name="dateOfBirth"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Date of Birth:</FormLabel>
        <FormControl>
          <Input
            type="date"
            className="my-2"
            {...field}
            placeholder="Date of Birth"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />

</div>



   <FormField
    control={RegisterForm.control}
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


   
    <FormField
    control={RegisterForm.control}
    name="rePassword"
    render={({field}) => (
      <FormItem>
       
        <FormControl>
          <Input type='password' className='my-2' {...field} placeholder='Re Password...'/>
        </FormControl>
      
        <FormMessage />
      </FormItem>
    )}
  />



<Button className='mt-9 w-full cursor-pointer'>Register</Button>
<Link href={"/Login"}> <h1 className='text-blue-600 underline cursor-pointer mt-3.5 text-lg'>Already have an account</h1></Link>


        </form>


        </FormProvider>


      

  
      </div>

       

    </div>
  )
}
