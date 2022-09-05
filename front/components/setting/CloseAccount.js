import React, { useContext, useState } from "react"
import { Formik, Field, Form, ErrorMessage } from "formik"
import styles from 'styles/login.module.css'
import Error from 'components/util/error'
import { signOut } from 'next-auth/client'
import { CreateToken } from '../SideBar'
import axios from 'axios'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import Link from "next/link"
import * as Yup from 'yup'
const initialValues = {
    reason: '',
    message: '',
    password: '',
}
const validationSchema = Yup.object({
    reason: Yup.string().required("Reason is a required field"),
})

const CloseAccount = ({ name = "Username" }) => {

    const token = useContext(CreateToken);
    const [error, setError] = useState(false)
    const [setCreateError] = useState('')

    const onSubmit = values => {
        axios.post(`http://127.0.0.1:8000/user/delete-account`, {
            password: values.password,
            reason: values.reason,
            message: values.message
        },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }).then(response => {
                console.log(response.data);
            })
            .catch(error => {
                setCreateError(error)
                setError(true)
            });
    }

    return (
        <div className="px-3 pt-3">

            <div className={`${error ? 'show' : ''} position-fixed toast align-items-center fade mb-3 text-danger border-danger`} role="alert" aria-live="assertive" aria-atomic="true">
                <div className="d-flex">
                    <div className="toast-body">
                        That password’s not right. Try again.
                    </div>
                    <button type="button" className="me-2 m-auto btn text-danger" data-bs-dismiss="toast" aria-label="Close"
                        onClick={() => setError(false)}>
                        <AiOutlineCloseCircle fontSize={'25'} />
                    </button>
                </div>
            </div>


            <p className="fw-bold"> {name} , we're sorry to see you go</p>
            <p>Why would you like to close your Investing.com account?</p>
            <Formik initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}>
                {
                    formik => {
                        return (
                            <Form className="py-4 w-100">
                                <div className="form-group">
                                    <div className="form-check">
                                        <Field name="reason">
                                            {
                                                ({ field }) => (
                                                    <input {...field}
                                                        type="radio"
                                                        className="form-check-input" id="reasonOne"
                                                        value="I have a duplicate account" />
                                                )
                                            }
                                        </Field>
                                        <label className="form-check-label" htmlFor="reasonOne">
                                            I have a duplicate account
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <Field name="reason">
                                            {
                                                ({ field }) => (
                                                    <input {...field}
                                                        type="radio"
                                                        className="form-check-input" id="reasonTwo"
                                                        value="I have a duplicate account" />
                                                )
                                            }
                                        </Field>
                                        <label className="form-check-label" htmlFor="reasonTwo">
                                            I am not getting any value from my membership
                                        </label>

                                    </div>
                                    <div className="form-check">
                                        <Field name="reason">
                                            {
                                                ({ field }) => (
                                                    <input {...field}
                                                        type="radio"
                                                        className="form-check-input" id="reasonThree"
                                                        value="I have a duplicate account" />
                                                )
                                            }
                                        </Field>
                                        <label className="form-check-label" htmlFor="reasonThree">
                                            I am receiving too many emails
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <Field name="reason">
                                            {
                                                ({ field }) => (
                                                    <input {...field}
                                                        type="radio"
                                                        className="form-check-input" id="reasonFour"
                                                        value="I have a duplicate account" />
                                                )
                                            }
                                        </Field>
                                        <label className="form-check-label" htmlFor="reasonFour">
                                            Other
                                        </label>
                                        <ErrorMessage name="reason" render={error => <Error e={error} />} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <Field as="textarea" className={`${styles.input} form-input`} name="message" placeholder="Message*" style={{ height: '155px' }} />
                                </div>


                                <div className="form-group mt-2">
                                    <Field type="password" className={`${styles.input} form-input`} name="password" placeholder="Enter your password *" />
                                    <div className="d-flex justify-content-end m-1">
                                        <Link href={'/forgetPassword'}>
                                            <a className={`${styles.anchor} ms-1 text-decoration-none justify-content-end m-1`}>
                                                Forget Password ?
                                            </a>
                                        </Link>
                                    </div>
                                </div>

                                <button className='btn-danger mt-2'
                                    type='submit'
                                    disabled={!formik.isValid}>
                                    <Link href={'/api/auth/signout'}>
                                        <a className="text-decoration-none text-white"
                                            onClick={e => {
                                                e.preventDefault()
                                                signOut({ callbackUrl: 'http://localhost:3000/' })
                                            }}>
                                            Delete your account
                                        </a>
                                    </Link>
                                </button>




                                <button className='mt-2 btn-blue ms-3 btn-primary'
                                    type='reset'
                                    disabled={!formik.isValid}>
                                    Cancel
                                </button>
                            </Form>
                        )
                    }
                }

            </Formik>
        </div>
    )
}
export default CloseAccount
