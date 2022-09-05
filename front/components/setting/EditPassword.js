import React, { useState, useContext } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import styles from 'styles/login.module.css'
import Error from 'components/util/error'
import { CreateToken } from '../SideBar'
import axios from 'axios'
import { AiOutlineCloseCircle } from 'react-icons/ai'

const initialValues = {
    currentPassword: '',
    newPassword: '',
}


const validationSchema = Yup.object({
    currentPassword: Yup.string(),
    newPassword: Yup.string().min(6, 'New Password must be at least 6 characters').required("Verify Password is a required field"),
})
const EditPassword = () => {

    const token = useContext(CreateToken);

    const [error, setError] = useState(false)
    const [message, setMessage] = useState(false)

    const onSubmit = (values) => {
        axios.put(`http://127.0.0.1:8000/change-password`, {
            current_password: values.currentPassword,
            new_password: values.newPassword
        },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }).then(response => {
                setMessage(true)
            }).catch(error => { setError(true); setMessage(false) });
    }

    return (
        <div className="px-3">

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

            <div className={`${message ? 'show' : ''} position-fixed toast align-items-center fade mb-3 text-success border-success`} role="alert" aria-live="assertive" aria-atomic="true">
                <div className="d-flex">
                    <div className="toast-body">
                        Your Password have been changed.
                    </div>
                    <button type="button" className="me-2 m-auto btn text-success" data-bs-dismiss="toast" aria-label="Close"
                        onClick={() => setMessage(false)}>
                        <AiOutlineCloseCircle fontSize={'25'} />
                    </button>
                </div>
            </div>

            <Formik initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}>
                {
                    formik => {
                        return (
                            <Form className="py-4 w-100">
                                <div className="d-flex">
                                    <div className='form-group w-50 pe-1'>
                                        <Field type="password" className={`${styles.input} form-input`} name="currentPassword" placeholder="Current Password*" />
                                        <ErrorMessage name="currentPassword" render={error => <Error e={error} />} />
                                    </div>
                                    <div className='form-group w-50 ps-1'>
                                        <Field type="password" className={`${styles.input} form-input`} name="newPassword" placeholder="New Password*" />
                                        <ErrorMessage name="newPassword" render={error => <Error e={error} />} />
                                    </div>
                                </div>
                                <div className="d-flex justify-content-end">
                                    <button className='btn-blue mt-2 btn-primary'
                                        type='submit'
                                        disabled={!formik.isValid}
                                        style={{ width: "170px" }}
                                    >
                                        Change Password
                                    </button>
                                </div>
                            </Form>
                        )
                    }
                }
            </Formik>


        </div>
    )
}
export default EditPassword