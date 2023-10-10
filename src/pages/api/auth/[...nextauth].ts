import { api } from "src/blitz-server"
import GoogleProvider from "next-auth/providers/google"
import { NextAuthAdapter } from "@blitzjs/auth/next-auth"
import db, { User } from "db"
import { Role } from "types"

// Has to be defined separately for `profile` to be correctly typed below
const providers = [
  GoogleProvider({
    clientId: process.env.G_CLIENT_ID as string,
    clientSecret: process.env.G_CLIENT_S as string,
  }),
]

export default api(
  NextAuthAdapter({
    successRedirectUrl: "/",
    errorRedirectUrl: "/error",
    providers,
    // @ts-ignore
    callback: async (user, account, profile, session, provider) => {
      let newUser: User
      try {
        newUser = await db.user.findFirstOrThrow({
          where: { name: { equals: user.name } },
        })
      } catch (e) {
        newUser = await db.user.create({
          data: {
            email: user.email!,
            name: user.name || "unknown",
            role: "USER",
          },
        })
      }
      await session.$create({
        userId: newUser.id,
        role: newUser.role as Role,
        source: "google",
      })
      return { redirectUrl: "/" }
      //if no return it will default to successRedirectUrl
    },
  })
)
