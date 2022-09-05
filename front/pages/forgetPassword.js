import React, { useState, useEffect } from 'react'
import Header from 'components/Header'
import Title from 'components/Title'
import styles from 'styles/login.module.css'
import Footer from 'components/Footer'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Error from 'components/util/error'
import Link from 'next/link'
import SecurePage from 'components/util/securePage'
import { IoArrowBackOutline } from 'react-icons/io5'
import Toast from 'components/util/Toast'
import axios from 'axios'


const validationSchema = Yup.object({
    email: Yup.string().email().required("Email is a required field"),
})

const ForgetPassword = () => {
    const [error, setError] = useState('')
    const [msg, setMsg] = useState('')

    const initialValues = {
        email: '',
    }
    const onSubmit = (values) => {
        axios.post(`http://127.0.0.1:8000/forget-password`, {
            email: values.email,
        }).then(response => {
            // console.log(response.data);
            if (response.data['ok']) {
                setMsg('ok')
            }
        }).catch(err => setError(err))
    }


    return (
        <SecurePage>
            <Title pageName='Reset Password' />
            <Header />
            <div className={`${styles.login}`}>
                <div className='d-flex justify-content-around'>
                    <div className={`${styles.form}`}>
                        <div className={`${styles.error} text-center`}>
                            {
                                msg ? <Toast error='Please go check your email' type="msg" /> :
                                    error ? <Toast error='Sorry we could not found your account' /> : null
                            }
                        </div>
                        <h3 className="text-center">Forget your password ?</h3>
                        <p className="m-auto text-secondary w-75 text-center">Enter your email below to recevie your password reset instractions.</p>
                        <Formik initialValues={initialValues}
                            onSubmit={onSubmit}
                            validationSchema={validationSchema}>
                            {
                                formik => {
                                    return (
                                        <Form>
                                            <div className='form-group mt-3'>
                                                <Field type="email" className={`${styles.input} form-input`} name="email" placeholder="Email*" />
                                                <ErrorMessage name="email" render={error => <Error e={error} />} />
                                            </div>
                                            <button className='btn-blue mt-4 w-100'
                                                type='submit'
                                                disabled={!formik.isValid}>
                                                Reset Password
                                            </button>
                                            <div className='text-center mt-2'>
                                                <Link href={'/login'}>
                                                    <a className={`${styles.anchor} text-decoration-none`}>
                                                        <IoArrowBackOutline />   Send
                                                    </a>
                                                </Link>
                                            </div>
                                        </Form>
                                    )
                                }
                            }
                        </Formik>

                    </div>
                </div>
            </div>
            <Footer />
        </SecurePage>
    )
}

export default ForgetPassword
