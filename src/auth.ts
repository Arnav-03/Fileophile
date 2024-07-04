import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google,
    ],
  
})

function saltAndHashPassword(password: unknown) {
  throw new Error("Function not implemented.")
}
function getUserFromDb(email: unknown, pwHash: void): any {
  throw new Error("Function not implemented.")
}

