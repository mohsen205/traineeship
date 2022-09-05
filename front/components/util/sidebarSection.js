import React from 'react'
import Link from 'next/link'
import Logo from 'public/images/logo.png'
import styles from 'styles/sidebar.module.css'
import { AiOutlineDashboard, AiOutlineHome, AiOutlineStock } from 'react-icons/ai'
import { BsBookmarkStar } from 'react-icons/Bs'
import Tooltip from './tooltip'
import { appName } from 'globalVaribale'
import { useRouter } from 'next/router'
import Image from 'next/image'

const SidebarSection = () => {
    const router = useRouter()
    return (
        <div className="d-flex flex-column flex-shrink-0 bg-dark position-fixed h-100" style={{ width: "4.5rem", padding: "5px" }}>
            <Link href="/clinet">
                <a className="d-block p-3 link-dark text-decoration-none">
                    <Tooltip title={appName} icons={<Image src={Logo} alt={appName} width={"35"} height={"35"} />} />
                </a>
            </Link>
            <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">

                <li className="nav-item">
                    <Link href="/client">
                        <a className={`${router.asPath == '/client' ? 'active' : ''} nav-link py-3 `}>
                            <Tooltip title={'Home'} icons={<AiOutlineHome className='icons-tooltip' />} />
                        </a>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link href="/client/dashboard">
                        <a className={`${router.asPath == '/client/dashboard' ? 'active' : ''} nav-link py-3 `}>
                            <Tooltip title={'Dashboard'} icons={<AiOutlineDashboard className='icons-tooltip' />} />
                        </a>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link href="/client/watchlist">
                        <a className={`${router.asPath == '/client/watchlist' ? 'active' : ''} nav-link py-3 `}>
                            <Tooltip title={'Watch List'} icons={<BsBookmarkStar className='icons-tooltip' />} />
                        </a>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link href="/client/predict">
                        <a className={`${router.asPath == '/client/predict' ? 'active' : ''} nav-link py-3 `}>
                            <Tooltip title={'Analysis'} icons={<AiOutlineStock className='icons-tooltip' />} />
                        </a>
                    </Link>
                </li>

            </ul>
        </div>
    )
}

export default SidebarSection