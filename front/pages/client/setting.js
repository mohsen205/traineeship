import CloseAccount from 'components/setting/CloseAccount'
import EditDetails from 'components/setting/EditDetails'
import EditPassword from 'components/setting/EditPassword'
import SideBar from 'components/SideBar'
import Link from 'next/link'
import jwt from "next-auth/jwt"
import jwt_decode from "jwt-encode"
import ProfileImageSetting from 'components/setting/ProfileImageSetting'
import styles from 'styles/setting.module.css'
const Setting = ({ publicData, token, privateData }) => {
    const { name, image, bg_profile } = publicData
    return (
        <SideBar token={token} cssClass={`${styles.container}`}>
            <ProfileImageSetting image={image} name={name} bgImage={bg_profile} />
            <EditDetails publicData={publicData} privateData={privateData} name={name} />
        </SideBar>
    )
}
export default Setting

export async function getServerSideProps({ req }) {
    const secret = process.env.SECRET
    const tokens = await jwt.getToken({ req, secret })
    const data = {
        "id": tokens.id,
        "name": tokens.name,
        "email": tokens.email,
        "image": tokens.picture,
        "exp": tokens.exp
    }
    const token = jwt_decode(data, secret)

    const response = await fetch(`${process.env.URL_END_POINT}/user`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })

    const publicData = await response.json()

    const responseTwo = await fetch(`${process.env.URL_END_POINT}/private-details`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    const privateData = await responseTwo.json()
    return {
        props: {
            publicData: publicData[0],
            privateData: privateData,
            token: token,
        }
    }
}
