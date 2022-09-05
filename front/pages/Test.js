// import React, { useEffect } from 'react'
// import jwt from "next-auth/jwt"
// import jwt_decode from "jwt-encode"
// const Test = ({ token }) => {
//     useEffect(() => {
//         const ws = new WebSocket(`ws://127.0.0.1:8000/ws-notification/ws?token=${token}`)
//         ws.onopen = () => {
//             ws.send("Connected to react")
//         }
//         ws.onmessage = (e) => {
//             console.log(e.data);
//         }
//     })
//     return (
//         <div>
//             Hello
//         </div>
//     )
// }
// export default Test

// export async function getServerSideProps({ req }) {
//     const secret = process.env.SECRET
//     const tokens = await jwt.getToken({ req, secret })
//     const data = {
//         "id": tokens.id,
//         "name": tokens.name,
//         "email": tokens.email,
//         "image": tokens.picture,
//         "exp": tokens.exp
//     }
//     const token = jwt_decode(data, secret)
//     return {
//         props: {
//             token: token,
//         }
//     }
// }
const Test = () => {
    return (
        <div>Test</div>
    )
}
export default Test