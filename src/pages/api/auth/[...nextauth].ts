import { query as q } from "faunadb"
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

import { fauna } from "../../../services/fauna"

export default NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,

        }),
    ],
    jwt: {
        secret: process.env.NEXTAUTH_URL,
    },



    callbacks: {
        async signIn({ user, account, profile }) {
            const { email } = user
            console.log(user);

            try {
                await fauna.query(
                    //Se não existe um usuário por email x
                    q.If(
                        q.Not(
                            q.Exists(
                                q.Match(q.Index("user_by_email"),
                                    q.Casefold(user.email)),
                            ),
                        ),
                        //Cria usuário
                        q.Create(
                            q.Collection("users"), { data: { email } }),
                        //se não, busque  usuário
                        q.Get(
                            q.Match(
                                q.Index("user_by_email"),
                                q.Casefold(
                                    user.email
                                )
                            )
                        )
                    )
                )
                return true
            } catch {
                return false
            }
        }
    }
})