import React, { useContext, useState } from "react"
import { Button, Modal } from 'react-bootstrap'
import { Formik, Field, Form, ErrorMessage } from "formik"
import Error from 'components/util/error'
import styles from 'styles/login.module.css'
import * as Yup from 'yup'
import { CreateToken } from '../SideBar'
import axios from 'axios'
import { AiOutlineCloseCircle } from 'react-icons/ai'

const initialValues = {
    title: '',
    description: ''
}

const validationSchema = Yup.object({
    title: Yup.string().required("This field is a required field"),
})

const PopUp = () => {
    const token = useContext(CreateToken);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [error, setError] = useState(false)
    const [message, setMessage] = useState(false)

    const onSubmit = (values) => {
        axios.post(`http://127.0.0.1:8000/collection/create`, {
            title: values.title,
            discription: values.description
        },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }).then(response => setMessage(response.data['ok']))
            .catch(error => setError(true));
    }

    return (
        <>
            <Button variant="primary w-100 btn-blue" onClick={handleShow}>
                Create New Watchlist
            </Button>

            <Modal show={show} >
                <div className={`${error ? 'show' : ''} position-fixed toast align-items-center fade mb-3 text-danger border-danger`} role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="d-flex">
                        <div className="toast-body">
                            Oops something went wrong please try again
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
                            Your request completed successfully
                        </div>
                        <button type="button" className="me-2 m-auto btn text-success" data-bs-dismiss="toast" aria-label="Close"
                            onClick={() => setMessage(false)}>
                            <AiOutlineCloseCircle fontSize={'25'} />
                        </button>
                    </div>
                </div>
                <Modal.Body>
                    <Formik initialValues={initialValues}
                        onSubmit={onSubmit}
                        validationSchema={validationSchema} >
                        {
                            formik => {
                                return (
                                    <Form>
                                        <div className="form-group">
                                            <Field type="text" className={`${styles.input} form-input`} name="title" placeholder="Title*" />
                                            <ErrorMessage name="title" render={error => <Error e={error} />} />
                                        </div>
                                        <div className="form-group">
                                            <Field as="textarea" className={`${styles.input} form-input`} name="description" placeholder="description" style={{ height: '155px' }} />
                                        </div>
                                        <div className="d-flex justify-content-end">
                                            <div>
                                                <button type="submit" className="btn btn-primary btn-blue">
                                                    Create
                                                </button>
                                                <button type="reset" className="btn  btn-secondary ms-2" onClick={handleClose}>
                                                    Close
                                                </button>
                                            </div>
                                        </div>

                                    </Form>
                                )
                            }
                        }

                    </Formik>

                </Modal.Body>
            </Modal>
        </>
    );
}

export default PopUp