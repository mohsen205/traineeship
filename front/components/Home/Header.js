import React from 'react'
import styles from 'styles/Home.module.css'
import Title from '../Title'
import Head from '../Header'
import Link from 'next/link'
import { HiOutlineArrowNarrowRight } from "react-icons/hi"
const Header = () => {
    return (
        <div className={`${styles.home}`} id="home">
            <Title pageName='Home' />
            <Head />
            <div className={`${styles.header}`}>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className='mt-3'>
                                <div className='h4 mt-2'>
                                    <span className="text-blue">Trader</span><span>Algo</span>
                                </div>
                                <p className={`${styles.title}`}>Smarter Investing.</p>
                                <p className='fs-4'>
                                    TraderAlgo make Analysis chart and market mush easyer ,
                                    take less time .
                                </p>

                                <button className={`${styles.btnSquire} btn btn-primary me-3 btn-lg`}>
                                    <Link href={'/login'}>
                                        <a className="text-decoration-none">
                                            Get Started
                                            <HiOutlineArrowNarrowRight className='ms-2' />
                                        </a>
                                    </Link>
                                </button>
                            </div>
                        </div>
                        <div className={`col-md-6`}>
                            <div className={`${styles.simpleImage} mt-4 ms-3`}>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header