import React, { useState } from 'react'
import styles from 'styles/Home.module.css'
import { VscDebugStackframeDot } from 'react-icons/vsc'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import Error from '../util/error'
import axios from 'axios'
import { AiOutlineCloseCircle } from 'react-icons/ai'
const initialValues = {
    fullName: '',
    email: '',
    subject: '',
    message: ''
}

const validationSchema = Yup.object({
    fullName: Yup.string().min(3).max(50).required("Full Name is a required field"),
    email: Yup.string().email().required("Email is a required field"),
    subject: Yup.string().min(20).max(150).required("Subject is a required field"),
    message: Yup.string().required("Message is a required field"),
})


const ContactUs = () => {
    const [error, setError] = useState(false)
    const [message, setMessage] = useState(false)
    const onSubmit = (values, onSubmitProps) => {
        axios.post('http://127.0.0.1:8000/send-email', {
            full_name: values.fullName,
            email: values.email,
            subject: values.subject,
            message: values.message
        }).then(response => {
            if (response.data["ok"]) {
                setMessage(true)
                setError(false)
            }
        }).catch(err => {
            setMessage(false)
            setError(true)
        })
    }
    return (
        <div className={`${styles.contact}`} id="contact">
            <div className={`${error ? 'show' : ''} position-fixed toast align-items-center fade mb-3 text-danger border-danger`} role="alert" aria-live="assertive" aria-atomic="true">
                <div className="d-flex">
                    <div className="toast-body">
                        Oops shomething go wrong , please try again
                    </div>
                    <button type="button" className="me-2 m-auto btn text-danger" data-bs-dismiss="toast" aria-label="Close"
                        onClick={() => setError(false)}>
                        <AiOutlineCloseCircle fontSize={'25'} />
                    </button>
                </div>
            </div>

            <div className={`${message ? 'show' : ''} position-fixed toast align-items-center fade mb-3 text-success border-success`} role="alert" aria-live="assertive" aria-atomic="true">
                <div className="d-flex">
                    <div className="toast-body">
                        The email has been sent successfully.
                    </div>
                    <button type="button" className="me-2 m-auto btn text-success" data-bs-dismiss="toast" aria-label="Close"
                        onClick={() => setMessage(false)}>
                        <AiOutlineCloseCircle fontSize={'25'} />
                    </button>
                </div>
            </div>
            <div className='container'>
                <div className='text-center'>
                    <span className={`${styles.subtitle} text-blue fs-5`}> <VscDebugStackframeDot /> contact us</span>
                    <div className='h1'>Contact Us</div>
                </div>
                <div className={`${styles.form}`}>
                    <Formik initialValues={initialValues}
                        onSubmit={onSubmit}
                        validationSchema={validationSchema}
                    >
                        {
                            formik => {
                                return (
                                    <Form>
                                        <div className='d-flex'>
                                            <div className='form-group w-50 me-5'>
                                                <Field className={`${styles.input} form-input`} name="fullName" placeholder="Full Name*" />
                                                <ErrorMessage name="fullName" render={error => <Error e={error} />} />
                                            </div>
                                            <div className='form-group w-50'>
                                                <Field className={`${styles.input} form-input`} name="email" placeholder="Email*" />
                                                <ErrorMessage name="email" render={error => <Error e={error} />} />
                                            </div>
                                        </div>
                                        <div className='form-group mt-3'>
                                            <Field className={`${styles.input} form-input`} name="subject" placeholder="Subject*" />
                                            <ErrorMessage name="subject" render={error => <Error e={error} />} />
                                        </div>
                                        <div className='form-group mt-3'>
                                            <Field as="textarea"
                                                className={`${styles.input} form-input`}
                                                name="message" placeholder="Message*" style={{ height: '155px' }} />
                                            <ErrorMessage name="message" render={error => <Error e={error} />} />
                                        </div>
                                        <button className='btn-blue'
                                            type='submit'>
                                            Submit Now
                                        </button>
                                    </Form>
                                )
                            }
                        }
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default ContactUs
// style={{ cursor: `${!formik.isSubmitting ? 'pointer' : 'wait'}` }}