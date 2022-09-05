import React, { useState, useEffect, createContext } from 'react'
import SidebarSection from './util/sidebarSection'
import NavbarSection from './util/navbarSection'
import styles from 'styles/sidebar.module.css'
import Title from './Title'
import UserImage from 'public/images/userplaceholder.png'
import { getSession } from 'next-auth/client'
import LoadingPage from './LoadingPage'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'

export const CreateToken = createContext(null)

const SideBar = ({ children, title, token, cssClass = null }) => {
    const [session, load] = useSession()
    const [username, setUsername] = useState('user name')
    const [image, setImage] = useState(UserImage)
    const router = useRouter()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const securePage = async () => {
            const session = await getSession()
            if (!session) {
                router.push('/login')
            } else {
                setLoading(false)
                setUsername(session.user.name)
                setImage(session.user.image)
            }
        }
        securePage()
    }, [router])

    if (loading) {
        return <LoadingPage />
    }

    return (
        <CreateToken.Provider value={token}>
            <Title title={title} />
            <div className='sidebar d-flex'>
                <SidebarSection />
                <div className={`${styles.lighter} w-100`} >
                    <NavbarSection username={username} imageUrl={image == null ? UserImage : image} />
                    <div className={`${cssClass} min-container`}>
                        {children}
                    </div>
                </div>
            </div >
        </CreateToken.Provider>

    )
}

export default SideBar