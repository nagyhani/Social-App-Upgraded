'use client'

import { useContext, useEffect, useState } from "react";
import { getPosts } from "./(main)/postsActions/postsActions";
import { Post, Posts } from "./types/posts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";
import CreateComment from "./_components/CreateComment/CreateComment";
import CreatePost from "./_components/CreatePost/CreatePost";
import DropDownMenu from "./_components/DropDownMenu/DropDownMenu";
import DropDownMenuComments from "./_components/DropDownMenuComments/DropDownMenuComments";
import { UserContext } from "./UserContext/UserContext";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const user = useContext(UserContext);

  useEffect(() => {
    getAllPosts(pageNumber);
  }, [pageNumber]); // refetch when page changes

  async function getAllPosts(page: number) {
    const data: Posts = await getPosts(page);

    if (data.message === "success") {
      setPosts(data.posts);
      setTotalPages(data.paginationInfo.numberOfPages);
    }
  }

  // limit pagination to 10 numbers at a time
  const visiblePages = (() => {
    const maxVisible = 6;
    const start = Math.max(1, pageNumber - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages, start + maxVisible - 1);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  })();

  return (
    <div className="p-5">
      <CreatePost />

      {posts.map((po) => (
        <div
          key={po._id}
          className="bg-amber-100 rounded-2xl p-10 my-10 w-full md:w-3/4 lg:w-2/4 mx-auto"
        >
          <div className="flex justify-between">
            <div className="flex">
              <Avatar>
                <AvatarImage src={po.user.photo} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="mx-2.5">
                <h1>{po.user.name}</h1>
                <p className="text-xs text-gray-600">
                  {new Date(po.createdAt)
                    .toLocaleString("en-US", {
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })
                    .replace(",", " at")}
                </p>
              </div>
            </div>

            {user?.user._id === po.user._id && (
              <DropDownMenu postId={po._id} />
            )}
          </div>

          <h1 className="text-lg my-2">{po.body}</h1>

          {po.image && (
            <div className="flex justify-center items-center">
              <Image
                alt={po.body || "Post image"}
                src={po.image}
                width={500}
                height={250}
                className="rounded-lg object-cover mt-4"
              />
            </div>
          )}

          <div className="mt-2 flex justify-between text-sm">
            <h1>{po.comments.length} comments</h1>
            <Link href={`/postDetails/${po._id}`}>See Post details</Link>
          </div>

          {po.comments.length > 0 && (
            <div className="bg-amber-200 p-3 rounded-2xl mt-3 flex justify-between">
              <div>
               <div  className="flex">
                 <Avatar>
                  <AvatarImage src={po.comments[0].commentCreator?.photo} />
                  <AvatarFallback>user</AvatarFallback>
                </Avatar>
                <div className="mx-4">
                  <h1>{po.comments[0].commentCreator?.name}</h1>
                  <span className="text-xs">
                    {new Date(po.comments[0].createdAt)
                      .toLocaleString("en-US", {
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })
                      .replace(",", "")}
                  </span>
                </div>
               </div>

                <span>{po.comments[0].content}</span>
              </div>

              {user?.user._id === po.comments[0].commentCreator._id && (
                <DropDownMenuComments commentId={po.comments[0]._id} />
              )}
            </div>
          )}

          <CreateComment ID={po._id} />
        </div>
      ))}

      {/* Pagination */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setPageNumber((prev) => Math.max(1, prev - 1))}
              className="cursor-pointer"
            />
          </PaginationItem>

          {visiblePages.map((num) => (
            <PaginationItem key={num}>
              <PaginationLink
                onClick={() => setPageNumber(num)}
                isActive={pageNumber === num}
                className={`cursor-pointer ${
                  pageNumber === num ? "bg-amber-300 text-black" : ""
                }`}
              >
                {num}
              </PaginationLink>
            </PaginationItem>
          ))}

          {totalPages > visiblePages[visiblePages.length - 1] && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              onClick={() =>
                setPageNumber((prev) => Math.min(totalPages, prev + 1))
              }
              className="cursor-pointer"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
