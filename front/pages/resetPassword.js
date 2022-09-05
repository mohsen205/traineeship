import React, { useState } from 'react'
import Header from 'components/Header'
import Title from 'components/Title'
import styles from 'styles/login.module.css'
import Footer from 'components/Footer'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Error from 'components/util/error'
import SecurePage from 'components/util/securePage'
import { signIn } from 'next-auth/client'
import Toast from 'components/util/Toast'
import axios from 'axios'

const initialValues = {
    new_password: '',
    confirm_password: ''
}

const validationSchema = Yup.object({
    new_password: Yup.string().min(8, 'New password must be at least 8 characters long').required("Password is a required field"),
    confirm_password: Yup.string()
        .oneOf([Yup.ref('new_password'), null], 'Passwords must match').required("Password is a required field")
})

const ForgetPassword = ({ token }) => {
    const [error, setError] = useState('')

    const onSubmit = (values) => {
        axios.put(`http://127.0.0.1:8000/reset-password`, {
            new_password: values.new_password,
            confirm_password: values.confirm_password,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then(response => {
            if (response.data['ok']) {
                const email = response.data['email']
                signIn('credentials', {
                    username: email,
                    password: values.new_password
                }, { callbackUrl: 'http://localhost:3000/client' })
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
                                error ? <Toast error='Oops somthing go wrong , please try again' /> : null
                            }
                        </div>
                        <h3 className="text-center">Reset password </h3>
                        <p className="m-auto text-secondary w-75 text-center">Enter your new password below we're just being extra safe .</p>
                        <Formik initialValues={initialValues}
                            onSubmit={onSubmit}
                            validationSchema={validationSchema}>
                            {
                                formik => {
                                    return (
                                        <Form>
                                            <div className='form-group mt-3'>
                                                <Field type="password" className={`${styles.input} form-input`} name="new_password" placeholder="New Password*" />
                                                <ErrorMessage name="new_password" render={error => <Error e={error} />} />
                                            </div>
                                            <div className='form-group mt-3'>
                                                <Field type="password" className={`${styles.input} form-input`} name="confirm_password" placeholder="Confrim Password*" />
                                                <ErrorMessage name="confirm_password" render={error => <Error e={error} />} />
                                            </div>
                                            <button className='btn-blue mt-4 w-100'
                                                type='submit'
                                                disabled={!formik.isValid}>
                                                Reset Password
                                            </button>
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

export async function getServerSideProps(context) {
    const { query } = context
    const token = query.hash
    return {
        props: {
            token: token,
        }
    }
}
