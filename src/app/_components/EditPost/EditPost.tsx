'use client'
import { Button } from '@/components/ui/button'
import {
  Dialog, DialogClose, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle, DialogTrigger
} from '@/components/ui/dialog'
import React from 'react'
import * as z from "zod"
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

const createPostSchema = z.object({
  body: z.string().nonempty("This field can't be empty"),
  image: z
    .any()
    .refine((file) => file instanceof File, "You have to insert an image")
    .refine((file) => file?.type?.startsWith("image/"), "File must be an image"),
})

export default function EditPost() {
  const createPostForm = useForm({
    defaultValues: { body: "", image: null },
    resolver: zodResolver(createPostSchema),
  })

  async function handelUpdatePost(values: { body: string; image: File }) {
    const formData = new FormData()
    formData.append("body", values.body)
    formData.append("image", values.image)
    console.log(values)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span>Edit Post</span>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit post</DialogTitle>
          <DialogDescription>
            Make changes to your post here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>

        <div className="bg-amber-100 rounded-2xl p-5 w-full mx-auto my-6">
          <h1 className="mb-1.5">Create post</h1>
          <hr />

          <FormProvider {...createPostForm}>
            <form className="my-3" onSubmit={createPostForm.handleSubmit(handelUpdatePost)}>
              <div className="flex justify-between items-center">
                <FormField
                  control={createPostForm.control}
                  name="body"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl className="w-full">
                        <Input className="my-2 w-full" type="text" {...field} placeholder="what's on your mind?" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={createPostForm.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div>
                          <Label htmlFor="photo"><i className="fa-solid fa-image text-3xl" /></Label>
                          <Input
                            hidden
                            id="photo"
                            type="file"
                            accept="image/*"
                            onChange={(e) => field.onChange(e.target.files?.[0])}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button className="w-full text-center mt-2">Update post</Button>
            </form>
          </FormProvider>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
