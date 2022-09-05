import React from 'react'
import styles from 'styles/Footer.module.css'
import Logo from 'public/images/logo.png'
import { appName } from 'globalVaribale'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { RiTwitterLine, RiFacebookBoxLine, RiInstagramLine, RiGithubLine } from 'react-icons/ri'
const Footer = () => {
    const router = useRouter()
    return (
        <footer className={`${styles.footer}`}>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-4'>
                        <Image src={Logo} alt={appName} width={"50"} height={"50"} />
                        <p className={`${styles.p} mt-3`}>
                            is a powerful investment research and analysis tool that goes well beyond what investors are used to from existing equity research sites
                        </p>
                    </div>
                    <div className='col-md-4'>
                        <div className='h3'>
                            About Us
                        </div>
                        <div className={`${styles.links}`}>
                            <div className='d-flex mt-4'>
                                <div className='me-3'>
                                    <ul className='list-unstyled'>
                                        <li className='pb-2'>
                                            <Link href={`${router.pathname != '/' ? '/#services' : '#services'}`} >
                                                <a className={`${styles.anchor}`} >
                                                    Services
                                                </a>
                                            </Link>
                                        </li>
                                        <li className='pb-2'>
                                            <Link href={`${router.pathname != '/' ? '/#about' : '#about'}`} >
                                                <a className={`${styles.anchor}`} >
                                                    About us
                                                </a>
                                            </Link>
                                        </li>
                                        <li className='pb-2'>
                                            <Link href={`${router.pathname != '/' ? '/#contact' : '#contact'}`} >
                                                <a className={`${styles.anchor}`} >
                                                    Contact us
                                                </a>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className=''>
                                    <ul className='list-unstyled'>
                                        <li>
                                            <Link href={"/#home"} >
                                                <a className={`${styles.anchor}`} >
                                                    Home
                                                </a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href={"/termOfService"} >
                                                <a className={`${styles.anchor}`} >
                                                    Term of Service
                                                </a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href={"/privacyPolicy"} >
                                                <a className={`${styles.anchor}`} >
                                                    Privacy Policy
                                                </a>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-4'>
                        <div className='h3'>Your Location</div>
                        <ul className='list-unstyled mt-4'>
                            <li className={`${styles.label}`}>
                                Email
                            </li>
                            <li className={`${styles.desc} fs-5 fw-bold`}>
                                TraderAlgo@TraderAlgo.com
                            </li>
                            <li className={`${styles.label}`}>
                                Phone
                            </li>
                            <li className={`${styles.desc} fs-5 fw-bold`}>
                                (+216) 52 802 352 <br /> (+216) 52 707 744
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={`${styles.socialMedia} d-flex jusitfy-content-center  pt-4 pb-3`}>
                <div className='mx-auto'>
                    <ul className='d-flex list-unstyled'>
                        <li>
                            <Link href="https://www.twitter.com">
                                <a className={`${styles.socialanchor}`}>
                                    <RiTwitterLine />
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.instagram.com">
                                <a className={`${styles.socialanchor}`}>
                                    <RiInstagramLine />
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.facebook.com">
                                <a className={`${styles.socialanchor}`}>
                                    <RiFacebookBoxLine />
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.github.com">
                                <a className={`${styles.socialanchor}`}>
                                    <RiGithubLine />
                                </a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='copy-right text-center'>
                <p className='text-blue fs-4'>
                    &copy;  2022-2023 TraderAlgo, INC.
                </p>
            </div>
        </footer>
    )
}

export default Footer