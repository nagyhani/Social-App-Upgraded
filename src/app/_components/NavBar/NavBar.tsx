"use client"

import * as React from "react"
import Link from "next/link"
import { LogOut, MenuIcon, XIcon } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { UserContext } from "@/app/UserContext/UserContext"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { signOut, useSession } from "next-auth/react"

export function NavBar() {
  const [isOpen, setIsOpen] = React.useState(false)

  const info = React.useContext(UserContext)

  const x = useSession()

  
  function Logout(){

    signOut({
      callbackUrl : "/Login"
    })
  }
  
  

  return (
 <nav className="w-full bg-black text-white">
  <div className="mx-auto flex items-center justify-between p-4 md:p-3 max-w-7xl">

    {/* LEFT SIDE — Home */}
    <div>
      <Link href="/" className="text-lg hover:text-gray-300 transition">
        Home
      </Link>
    </div>

    {/* RIGHT SIDE — Avatar menu + Auth links + Mobile button */}
    <div className="flex items-center space-x-6">
      {/* Avatar / User menu (Desktop only) */}

      {x.status == "authenticated" ? <div className="hidden md:block">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-black text-white">
                <Avatar>
                  <AvatarImage src={info?.user.photo} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </NavigationMenuTrigger>

              <NavigationMenuContent className="bg-white text-black rounded-md shadow-md p-2">
                <ul className="grid w-[200px] md:w-[100px] lg:w-[200px] gap-2">
                    <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/userProfile"
                        className="gap-2 p-2 hover:bg-gray-100 rounded-md flex items-center"
                      >
                         <Avatar>
                  <AvatarImage src={info?.user.photo} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                        <h1>Hi {info?.user.name}</h1>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/userProfile"
                        className="gap-2 p-2 hover:bg-gray-100 rounded-md flex items-center"
                      >
                        <i className="fa-solid fa-user mx-2"></i>
                        <h1>Profile</h1>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                 
                  <li>
                    <NavigationMenuLink asChild>
                      <span
                        
                        className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer" onClick={Logout}>
                           <LogOut />
                        Logout
                      </span>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div> :  <div className="hidden md:flex space-x-6">
        <Link href="/Login" className="hover:text-gray-300 transition">
          Login
        </Link>
        <Link href="/Register" className="hover:text-gray-300 transition">
          Register
        </Link>
      </div> }
      

      
     

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 text-white hover:text-gray-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
      </button>
    </div>
  </div>

  {/* Mobile Menu */}
  {isOpen && (
    <div className="md:hidden bg-black border-t border-gray-800">
      <div className="flex flex-col items-start space-y-4 p-4">
        <Link
          href="/"
          className="hover:text-gray-300 transition"
          onClick={() => setIsOpen(false)}
        >
          Home
        </Link>

        {x.status == "authenticated" ?   <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-black text-white hover:text-gray-300">
                <Avatar>
                  <AvatarImage src={info?.user.photo} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </NavigationMenuTrigger>
             
              <NavigationMenuContent className="bg-white text-black rounded-md shadow-md p-2">
                <ul className="grid w-[200px] md:w-[100px] lg:w-[200px] gap-2">

                   <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/userProfile"
                        className="gap-2 p-2 hover:bg-gray-100 rounded-md flex items-center"
                      >
                        <Avatar>
                  <AvatarImage src={info?.user.photo} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                        <h1>Hi {info?.user.name}</h1>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/userProfile"
                        className="gap-2 p-2 hover:bg-gray-100 rounded-md flex items-center"
                      >
                        <i className="fa-solid fa-user mx-2"></i>
                        <h1>Profile</h1>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                 
                  <li>
                    <NavigationMenuLink asChild>
                      <span
                        
                        className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer" onClick={Logout}>
                           <LogOut />
                        Logout
                      </span>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu> : <>
         <Link
          href="/Login"
          className="hover:text-gray-300 transition"
          onClick={() => setIsOpen(false)}
        >
          Login
        </Link>
        <Link
          href="/Register"
          className="hover:text-gray-300 transition"
          onClick={() => setIsOpen(false)}
        >
          Register
        </Link></> }
      
       
      </div>
    </div>
  )}
</nav>

  )
}
