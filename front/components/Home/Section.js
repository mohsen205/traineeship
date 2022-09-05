import React from 'react'
import styles from 'styles/Home.module.css'
import { VscDebugStackframeDot } from 'react-icons/vsc'
import { AiOutlineCheckCircle } from 'react-icons/ai'

const Section = () => {
    return (
        <section className={`${styles.section}`}>
            <div className={`${styles.overlay}`}>
                <div className='container'>
                    <div className='d-flex me-5'>
                        <div className='w-50'>
                            <p className='text-blue'>
                                <VscDebugStackframeDot className='fs-3' /> BIG NAME CUSTOMERS
                            </p>
                            <div className='h1'>
                                Why Choose Us?
                            </div>
                            <p className='w-50 fs-4 my-4'>
                                A wonderful serenity has taken possession of my entire soul,
                                like these sweet mornings of spring which I enjoy with my whole
                            </p>
                            <ul className='list-unstyled'>
                                <li>
                                    <AiOutlineCheckCircle className='text-blue me-2' />
                                    Premium services and beyond your expectation
                                </li>
                                <li>
                                    <AiOutlineCheckCircle className='text-blue me-2' />
                                    Get the best support among all venders
                                </li>
                                <li>
                                    <AiOutlineCheckCircle className='text-blue  me-2' />
                                    Great Price Competitive
                                </li>
                            </ul>
                        </div>
                        <div className={`${styles.sectionImage}`}>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Section