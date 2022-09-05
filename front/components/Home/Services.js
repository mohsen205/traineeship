import React from 'react'
import styles from 'styles/Home.module.css'
import { BiBriefcase } from 'react-icons/bi'
import { VscDebugStackframeDot } from 'react-icons/vsc'
import { HiOutlineArrowNarrowRight } from 'react-icons/hi'
import { AiOutlineLineChart, AiOutlinePieChart } from 'react-icons/ai'
import { GiBearHead } from 'react-icons/gi'
import Link from "next/link"
const Services = () => {
    return (
        <div className={`${styles.services}`} id="services">
            <div className='container'>
                <div className='text-center'>
                    <span className={`${styles.subtitle} text-blue fs-5`}> <VscDebugStackframeDot /> our services</span>
                    <div className='h1'>Our Services</div>
                </div>
                <div className='row'>
                    <div className='col-md-3'>
                        <div className='d-flex jusitfy-content-center'>
                            <div className={`${styles.card} text-center rounded mt-3`}>
                                <BiBriefcase className={`${styles.icons}`} />
                                <div className='h4 mt-3'> Portfolio Management </div>
                                <p className={`${styles.p} mt-3`}>
                                    helps you keep tabs on your portfolio in a myriad of ways. Key portfolio features include
                                    correlation tools, trade planning, and a re-balancing facility.
                                </p>
                                {/* <button className={`${styles.btnSquire} btn`}>
                                    <Link href={'/'}>
                                        <a className='anchore text-black text-decoration-none'>Read More <HiOutlineArrowNarrowRight /></a>
                                    </Link>
                                </button> */}
                            </div>
                        </div>
                    </div>

                    <div className='col-md-3'>
                        <div className='d-flex jusitfy-content-center'>
                            <div className={`${styles.card} text-center rounded mt-3`}>
                                <AiOutlineLineChart className={`${styles.icons}`} />
                                <div className='h4 mt-3'> Chart Analysis </div>
                                <p className={`${styles.p} mt-3`}>
                                    Dozens of sites offer free stock charting but TraderAlgo breaks from the pack
                                    by offering chart controls that are easy to use and far more capable
                                </p>
                                {/* <button className={`${styles.btnSquire} btn`}>
                                    <Link href={'/'}>
                                        <a className='anchore text-black text-decoration-none'>Read More <HiOutlineArrowNarrowRight /></a>
                                    </Link>
                                </button> */}
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className='d-flex jusitfy-content-center'>
                            <div className={`${styles.card} text-center rounded mt-3`}>
                                <AiOutlinePieChart className={`${styles.icons} mt-3`} />
                                <div className='h4 mt-3'>Tax Management </div>
                                <p className={`${styles.p}`}>
                                    Trader Algo, industry knowledge and
                                    modern technologies can assist you in complying with tax and accounting related legislation and regulations
                                </p>
                                {/* <button className={`${styles.btnSquire} btn`}>
                                    <Link href={'/'}>
                                        <a className='anchore text-black text-decoration-none'>Read More <HiOutlineArrowNarrowRight /></a>
                                    </Link>
                                </button> */}
                            </div>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className='d-flex jusitfy-content-center'>
                            <div className={`${styles.card} text-center rounded mt-3`}>
                                <GiBearHead className={`${styles.icons}`} />
                                <div className='h4 mt-3'> Risk Management </div>
                                <p className={`${styles.p} mt-3`}>
                                    Risk Management is an absolutely critical component to any trader's overall strategy.
                                    we help you to take appropriate risks that won't let you lose everything if a trade goes bad
                                </p>
                                {/* <button className={`${styles.btnSquire} btn`}>
                                    <Link href={'/'}>
                                        <a className='anchore text-black text-decoration-none'>Read More <HiOutlineArrowNarrowRight /></a>
                                    </Link>
                                </button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Services
