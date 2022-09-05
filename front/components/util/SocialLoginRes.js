import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebookF } from 'react-icons/fa'
import styles from '../../styles/util/SocialLoginRes.module.css'
import { signIn } from 'next-auth/client'
import Link from 'next/link'
const SocialLoginRes = () => {
    return (
        <div className='d-flex '>
            <Link href='/api/auth/signin' passHref>
                <button type="button" className={`${styles.btnGoogle} w-50 me-2`}
                    onClick={e => {
                        e.preventDefault()
                        signIn("google", { callbackUrl: 'http://localhost:3000/client' })
                    }}>
                    <FcGoogle className={`${styles.googleIcons}`} />
                </button>
            </Link>
            <Link href='/api/auth/signin' passHref>
                <button type="button" className={`${styles.btnFacebook} w-50`}
                    onClick={e => {
                        e.preventDefault()
                        signIn("facebook", { callbackUrl: 'http://localhost:3000/client' })
                    }} >
                    <FaFacebookF className={`${styles.facebookIcons}`} />
                </button>
            </Link>
        </div>
    )
}

export default SocialLoginRes