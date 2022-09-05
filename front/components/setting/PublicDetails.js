import React, { useState, useContext } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Error from 'components/util/error'
import styles from 'styles/login.module.css'
import axios from 'axios'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { CreateToken } from '../SideBar'
const validationSchema = Yup.object({
    name: Yup.string().min(3).max(50),
    email: Yup.string().email(),
    about: Yup.string(),
    FacebookUser: Yup.string(),
    TwitterUser: Yup.string(),
    youtubeLink: Yup.string()
        .matches(
            /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
            'Enter correct url!'
        ),
})

const EditDetails = ({ data }) => {
    const token = useContext(CreateToken);

    const [error, setError] = useState(false)
    const [message, setMessage] = useState(false)

    const initialValues = {
        name: !data.name ? '' : data.name,
        email: !data.email ? '' : data.email,
        about: !data.about ? '' : data.about,
        facebookUser: !data.facebook_username ? '' : !data.facebook_username,
        twitterUser: !data.twitter_username ? '' : data.twitter_username,
        youtubeLink: !data.youtube_link ? '' : data.youtube_link,
    }
    const onSubmit = (values) => {
        axios.put(`http://127.0.0.1:8000/user/update`, {
            name: values.name,
            email: values.email,
            facebook_username: values.facebookUser,
            twitter_username: values.twitterUser,
            youtube_link: values.youtubeLink,
            about: values.about
        },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }).then(response => {
                !response.data ? setError(true) : setMessage(true)
            }).catch(error => setError(true));
    }

    return (
        <div className="px-3">
            {
                error && !message ?
                    (
                        <div className={`${error ? 'show' : ''} position-fixed toast align-items-center fade mb-3 text-danger border-danger`} role="alert" aria-live="assertive" aria-atomic="true">
                            <div className="d-flex">
                                <div className="toast-body">
                                    We couldn’t save your changes.
                                </div>
                                <button type="button" className="me-2 m-auto btn text-danger" data-bs-dismiss="toast" aria-label="Close"
                                    onClick={() => setError(false)}>
                                    <AiOutlineCloseCircle fontSize={'25'} />
                                </button>
                            </div>
                        </div>
                    )

                    :
                    (
                        <div className={`${message ? 'show' : ''} position-fixed toast align-items-center fade mb-3 text-success border-success`} role="alert" aria-live="assertive" aria-atomic="true">
                            <div className="d-flex">
                                <div className="toast-body">
                                    We have saved your profile changes.
                                </div>
                                <button type="button" className="me-2 m-auto btn text-success" data-bs-dismiss="toast" aria-label="Close"
                                    onClick={() => setMessage(false)}>
                                    <AiOutlineCloseCircle fontSize={'25'} />
                                </button>
                            </div>
                        </div>
                    )
            }





            <Formik initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}>
                {
                    formik => {
                        return (
                            <Form className="w-100 py-4">

                                <div className="d-flex">
                                    <div className='form-group w-50 pe-1'>
                                        <Field className={`${styles.input} form-input`} name="name" placeholder="Name" />
                                        <ErrorMessage name="name" render={error => <Error e={error} />} />
                                    </div>
                                    <div className='form-group  w-50 ps-1'>
                                        <Field type="email" className={`${styles.input} form-input`} name="email" placeholder="Email" disabled />
                                        <ErrorMessage name="email" render={error => <Error e={error} />} />
                                    </div>
                                </div>


                                <div className="d-flex">
                                    <div className='form-group mt-3 col pe-1'>
                                        <Field type="text" className={`${styles.input} form-input`} name="facebookUser" placeholder="Facebook User" />
                                        <ErrorMessage name="facebookUser" render={error => <Error e={error} />} />
                                    </div>
                                    <div className='form-group mt-3 col ps-1 pe-1'>
                                        <Field type="text" className={`${styles.input} form-input`} name="twitterUser" placeholder="twitter user" />
                                        <ErrorMessage name="twitterUser" render={error => <Error e={error} />} />
                                    </div>
                                    <div className='form-group mt-3 col ps-1'>
                                        <Field type="text" className={`${styles.input} form-input`} name="youtubeLink" placeholder="Youtube Link" />
                                        <ErrorMessage name="youtubeLink" render={error => <Error e={error} />} />
                                    </div>
                                </div>

                                <div className='form-group mt-3'>
                                    <Field as="textarea" className={`${styles.input} form-input`}
                                        style={{ minHeight: "120px" }} name="about" placeholder="About" />
                                    <ErrorMessage name="about" render={error => <Error e={error} />} />
                                </div>
                                <div className="d-flex justify-content-end">
                                    <button className='btn-blue mt-2 btn-primary'
                                        type='submit'
                                        disabled={!formik.isValid}
                                        style={{ width: "170px" }}
                                    >
                                        Updates
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
export default EditDetails
