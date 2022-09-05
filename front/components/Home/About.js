import React from 'react'
import styles from 'styles/Home.module.css'
import { VscDebugStackframeDot } from 'react-icons/vsc'
import Link from 'next/link'
import { HiOutlineArrowNarrowRight } from 'react-icons/hi'
const About = () => {
    return (
        <div className={`${styles.about}`} id="about">
            <div className='text-center'>
                <span className={`${styles.subtitle} text-blue fs-5`}> <VscDebugStackframeDot /> About Us</span>
                <div className='h1'>About Us</div>
            </div>
            <div className='d-flex'>
                <div className={`${styles.imageBg} w-50`}>

                </div>
                <div className={`${styles.description} w-50`}>
                    <div className='py-5 px-4'>
                        <span className='text-blue'><VscDebugStackframeDot /> TraderAlgo</span>
                        <p className={`${styles.pAbout} ms-3`}>
                            Trader Algo is for all investors. If you use Yahoo Finance,  MSN Money, your brokerage company’s web site or any other financial sites for investment research,
                            you owe it to yourself to check out Trader Algo.   Every feature we provide is built around demand from real investors like you.
                        </p>
                        <button className={`${styles.btnSquire} btn btn-primary ms-3 btn-lg`}>
                            <Link href={'/login'}>
                                <a className="text-decoration-none">
                                    Get Started
                                    <HiOutlineArrowNarrowRight className='ms-2' />
                                </a>
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About