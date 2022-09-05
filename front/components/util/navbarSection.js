import React from 'react'
import styles from 'styles/sidebar.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { BiUserCircle } from 'react-icons/bi'
import { AiOutlineSetting, AiOutlineLogout } from 'react-icons/ai'
import { signOut } from 'next-auth/client'
import OpenCloseFullScreen from './openCloseFullScreen'
import Notification from './notification'
import Search from './search/Search'
const NavbarSection = ({ username, imageUrl }) => {
    return (
        <nav className={`w-100 ${styles.nav}`}>
            <ul className="nav justify-content-end bg-white w-100 position-fixed" style={{ paddingRight: "70px", zIndex: 10 }}>
                <li className="d-flex justify-content-center align-items-center me-auto ps-4">
                    <Search />
                </li>
                <li className="d-flex justify-content-center align-items-center me-2">
                    <Notification />
                </li>
                <li className="d-flex justify-content-center align-items-center me-2">
                    <OpenCloseFullScreen />
                </li>
                <li className="nav-item">
                    <div className={`${styles.dropdown} dropdown me-3`}>
                        <a className="dropdown-toggle nav-link" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                            <div className='d-flex'>
                                <div className=''>
                                    <Image src={imageUrl} alt='userimage' width='40' height='40' className='rounded-circle' />
                                </div>
                                <div className='d-flex justify-content-center align-items-center ms-1'>
                                    <span className='text-capitalize '>
                                        {username}
                                    </span>
                                </div>
                            </div>
                        </a>

                        <ul className={`${styles.menu} dropdown-menu shadow mt-1`} aria-labelledby="dropdownMenuLink">
                            {/* <li>
                                <Link href={'/client/profile'}>
                                    <a className="dropdown-item">
                                        <BiUserCircle fontSize={'20'} />
                                        <span className='ms-1'>Profile</span>
                                    </a>
                                </Link>
                            </li> */}
                            <li>
                                <Link href={'/client/setting'}>
                                    <a className="dropdown-item">
                                        <AiOutlineSetting fontSize={'20'} />
                                        <span className='ms-1'>Setting</span>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href={'/api/auth/signout'}>
                                    <a className="dropdown-item"
                                        onClick={e => {
                                            e.preventDefault()
                                            signOut({ callbackUrl: 'http://localhost:3000/' })
                                        }}>
                                        <AiOutlineLogout fontSize={'20'} />
                                        <span className='ms-1'>Log out</span>
                                    </a>
                                </Link>
                            </li>

                        </ul>
                    </div>
                </li>

            </ul>
        </nav>
    )
}

export default NavbarSection