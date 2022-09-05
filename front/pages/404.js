// finsh the entier desgin

import React from 'react'
import Title from 'components/Title'
import Header from 'components/Header'
import Footer from 'components/Footer'
import styles from 'styles/notFound.module.css'
import Link from 'next/link'
import { useSession } from 'next-auth/client'
const Notfound = () => {
    const [session, loading] = useSession()
    return (
        <>
            <Title title={'Page Not Found'} />
            {
                !session && !loading && (
                    <Header />
                )
            }
            <div className={!session && !loading ? `${styles.notfound} text-center` : `${styles.notfoundLogin} text-center`}>
                <div className={styles.overlay}>
                    <div >
                        <span className={`${styles.fontSizeLarge} h1 fw-bold`}>404</span><br />
                        <span className={`${styles.fontSizeMudium} h3 fw-bold`}>PAGE NOT FOUND</span>
                    </div>
                    <p className='pt-2 fs-4'>Sorry, we couldn&apos;t find the page you&apos;re looking for.</p>
                    {/*  complete the link after complete the login logout page  */}
                    {
                        !session && !loading && (
                            <Link href='/'>
                                <a className='text-white text-decoration-none fs-4'>
                                    BACK TO HOMEPAGE
                                </a>
                            </Link>
                        )
                    }
                    {
                        session && (
                            <Link href='/client'>
                                <a className='text-white text-decoration-none fs-4'>
                                    BACK TO DASHBOARD
                                </a>
                            </Link>
                        )
                    }
                    {/*  complete the link after complete the login logout page  */}
                </div>
            </div>
            {
                !session && !loading && (
                    <Footer />
                )
            }

        </>

    )
}

export default Notfound
// styles={{ marginTop: "85px" }}