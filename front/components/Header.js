import { appName } from 'globalVaribale'
import Link from 'next/link'
import Image from 'next/image'
import Logo from 'public/images/logo.png'
import styles from 'styles/navbar.module.css'
import { useRouter } from 'next/router'
const Header = () => {
    const router = useRouter()
    return (
        <nav className={` ${styles.nav} bg-white navbar shadow navbar-expand-lg navbar-white fixed-top`}>
            <div className="container">
                <Link href={'/'}>
                    <a className="navbar-brand">
                        <Image src={Logo} alt={appName} width={"50"} height={"50"} className="rounded-circle" />
                    </a>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link href={"/#home"} >
                                <a className={`${router.asPath == '/' || router.asPath == '/#home' ? 'active' : ''} nav-link`} >
                                    Home
                                </a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href={`${router.pathname != '/' ? '/#services' : '#services'}`} >
                                <a className={`${router.asPath == '/#services' ? 'active' : ''} nav-link`} >
                                    Services
                                </a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href={'market'} >
                                <a className={`${router.asPath == '/market' ? 'active' : ''} nav-link`} >
                                    Market
                                </a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href={`${router.pathname != '/' ? '/#about' : '#about'}`} >
                                <a className={`${router.asPath == '/#about' ? 'active' : ''} nav-link`} >
                                    About us
                                </a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href={`${router.pathname != '/' ? '/#contact' : '#contact'}`} >
                                <a className={`${router.asPath == '/#contact' ? 'active' : ''} nav-link`} >
                                    Contact us
                                </a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href={"/login"}>
                                <a className={`${router.asPath == '/login' ? 'active' : ''} nav-link`} >
                                    Sign in
                                </a>
                            </Link>
                        </li>
                        <li className={`${styles.btn} nav-item text-center rounded-pill`}>
                            <Link href={"/signup"}>
                                <a className="nav-link" >
                                    Sign up
                                </a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav >
    )
}

export default Header