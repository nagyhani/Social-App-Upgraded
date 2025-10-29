import NextAuth, { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"




const nextProvider : NextAuthOptions = {

    pages : {
        signIn : "/Login"
    },
    providers : [
        Credentials({
            name: "Nagy",
            credentials : {
                email : {},
                password : {}
            },

           async authorize(credentials){
           
            
                const res = await fetch(`${process.env.NEXT_BASE_URL}/users/signin` , {
                    method : "post",
                    body : JSON.stringify({
                        email : credentials?.email,
                        password : credentials?.password
                        
                    }),  headers : {
            "Content-Type" : "application/json"
        }
                })

                const data = await res.json()

                if(data.message == "success"){

                    return {
                        token : data.token,
                        id : ""
                    }
                }else{
                    throw new Error(data.message)
                }

               

              
            }
        })
    ],

    callbacks : {
       async jwt({ token, user }) {
    if (user) {
      token.accessToken = user.token;  // ✅ correct key name
    }
    return token;
  },
    }

}
const handler = NextAuth(nextProvider)

export { handler as GET, handler as POST }