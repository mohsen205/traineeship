import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import CredentialsProvider from 'next-auth/providers/credentials';
import jwt_decode from "jwt-decode";
import axios from 'axios'
export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "email", type: "email", plcaholder: "email" },
                password: { label: "password", type: "password", plcaholder: "password" }
            },
            authorize: async (credentials) => {
                const url = `${process.env.URL_END_POINT}/login`
                try {
                    const user = await axios.post(url, {
                        username: credentials.username,
                        password: credentials.password
                    }).then(response => {
                        const token = response.data.access_token;
                        return jwt_decode(token)
                    })
                    if (user) {
                        return user
                    }
                } catch (e) {
                    const errorMessage = e.response.status
                    console.log(errorMessage);
                    throw new Error(errorMessage + '&email=' + credentials.username)
                }
            }
        }),
        Providers.Google({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        Providers.Facebook({
            clientId: process.env.FACEBOOK_ID,
            clientSecret: process.env.FACEBOOK_SECRET,
        })
    ],
    callbacks: {
        async jwt(token, user) {
            if (user) {
                token.id = user.id
            }
            return token
        },
        async session(session, token) {
            session.user.id = token.id
            return session
        }
    },
    database: process.env.DB_URL,
    session: {
        jwt: true
    },
    jwt: {
        secret: process.env.SECRET,
    },
    pages: {
        error: '/login'
    },
    debug: true,
})

