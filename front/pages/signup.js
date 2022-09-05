import React, { useState, useRef } from 'react'
import Header from 'components/Header'
import Title from 'components/Title'
import styles from 'styles/login.module.css'
import Footer from 'components/Footer'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Error from 'components/util/error'
import SocialLoginRes from 'components/util/SocialLoginRes'
import Toast from 'components/util/Toast'
/* recaptcha  */
import ReCAPTCHA from 'react-google-recaptcha'
import SecurePage from 'components/util/securePage'
import axios from 'axios'
import { signIn } from 'next-auth/client'
const initialValues = {
    name: '',
    email: '',
    password: '',
    recaptcha: '',
}
const validationSchema = Yup.object({
    name: Yup.string().min(3).max(50).required("Name is a required field"),
    email: Yup.string().email().required("Email is a required field"),
    password: Yup.string().min(6).required("Message is a required field"),
    recaptcha: Yup.string()
})


const Signup = () => {
    const [error, setError] = useState(null)
    const url = 'http://127.0.0.1:8000/user'
    const onSubmit = (values, onSumbitProps) => {
        // console.log(values);
        axios.post(url, {
            name: values.name,
            email: values.email,
            password: values.password
        }).then(response => {
            console.log(response.data)
            if (response.data === "ok") {
                signIn('credentials', {
                    username: values.email,
                    password: values.password
                }, { callbackUrl: 'http://localhost:3000/client' })
                onSumbitProps.setSumbitting(true)
            }
        }).catch(err => setError(err))
    }
    return (
        <SecurePage>
            <Title pageName='Signup' />
            <Header />
            <div className={`${styles.login}`}>
                <div className='d-flex justify-content-around'>
                    <div className={`${styles.form}`}>
                        <div className="">
                            {
                                !error ? null :
                                    <Toast error="An account with the given email already exists." />
                            }
                        </div>
                        <div className='h4 text-center'>
                            Sign Up
                        </div>
                        <Formik initialValues={initialValues}
                            onSubmit={onSubmit}
                            validationSchema={validationSchema}>
                            {
                                formik => {
                                    return (
                                        <Form>
                                            <div className='form-group mt-3'>
                                                <Field className={`${styles.input} form-input`} name="name" placeholder="Name*" />
                                                <ErrorMessage name="name" render={error => <Error e={error} />} />
                                            </div>
                                            <div className='form-group mt-3'>
                                                <Field type="email" className={`${styles.input} form-input`} name="email" placeholder="Email*" />
                                                <ErrorMessage name="email" render={error => <Error e={error} />} />
                                            </div>
                                            <div className='form-group mt-3'>
                                                <Field type="password" className={`${styles.input} form-input`} name="password" placeholder="Password*" />
                                                <ErrorMessage name="password" render={error => <Error e={error} />} />
                                            </div>
                                            <div className='form-group mt-3'>
                                                <ReCAPTCHA size='normal'
                                                    name="recaptcha"
                                                    sitekey='6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI' />
                                            </div>
                                            <button className='btn-blue mt-4 w-100'
                                                type='submit'
                                                // disabled={}
                                                style={{ cursor: `${!formik.isValid || formik.isSubmitting ? 'not-allowed' : 'pointer'}` }}
                                            >
                                                Sign Up
                                            </button>
                                            <div className='line d-flex justify-content-between my-2'>
                                                Or sign up via
                                            </div>
                                            <SocialLoginRes />
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

export default Signup