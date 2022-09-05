import React, { useState, useContext } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Error from 'components/util/error'
import styles from 'styles/login.module.css'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import axios from 'axios'
import { CreateToken } from '../SideBar'
import SelectCountry from 'components/util/SelectCountry'

const validationSchema = Yup.object({
    fanme: Yup.string().max(50).min(3),
    lname: Yup.string().max(50).min(3),
    phone: Yup.number(),
    yearBrith: Yup.date(),
    country: Yup.string(),
    city: Yup.string().max(100),
    stateRegion: Yup.string().max(100),
    zipCode: Yup.number(),
    company: Yup.string(),
    taxpayId: Yup.number(),
})
const EditDetails = ({ data }) => {

    const token = useContext(CreateToken);

    const [error, setError] = useState(false)
    const [message, setMessage] = useState(false)

    const initialValues = {
        fname: !data.first_name ? '' : data.first_name,
        lname: !data.last_name ? '' : data.last_name,
        phone: !data.phone ? '' : data.phone,
        yearBrith: !data.yearBrith ? '' : data.yearBrith,
        country: !data.country ? '' : data.country,
        city: !data.city ? '' : data.city,
        stateRegion: !data.stateRegion ? '' : data.stateRegion,
        zipCode: !data.zipCode ? '' : data.zipCode,
        company: !data.company ? '' : data.company,
        taxpayId: !data.taxpayId ? '' : data.taxpayId,
    }

    const onSubmit = (values) => {
        axios.post(`http://127.0.0.1:8000/private-details/create`, {
            first_name: values.fname,
            last_name: values.lname,
            phone: values.phone,
            yearBrith: values.yearBrith,
            country: values.country,
            city: values.city,
            stateRegion: values.stateRegion,
            zipCode: values.zipCode,
            company: values.company,
            taxpayId: values.taxpayId,
        },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }).then(response => {
                !response.data ? setError(true) : setMessage(true)
            }).catch(error => { setError(true); console.error(error) });
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
                                    We’ve saved your profile changes.
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
                            <Form className="py-4 w-100">

                                <div className="d-flex">
                                    <div className='form-group w-50 pe-1'>
                                        <Field className={`${styles.input} form-input`} name="fname" placeholder="First Name" />
                                        <ErrorMessage name="fname" render={error => <Error e={error} />} />
                                    </div>
                                    <div className='form-group w-50 ps-1'>
                                        <Field className={`${styles.input} form-input`} name="lname" placeholder="Last Name" />
                                        <ErrorMessage name="lname" render={error => <Error e={error} />} />
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div className='form-group mt-3 w-50 pe-1'>
                                        <Field type="number" className={`${styles.input} form-input`} name="phone" placeholder="Phone Number" />
                                        <ErrorMessage name="phone" render={error => <Error e={error} />} />
                                    </div>
                                    <div className='form-group mt-3 w-50 ps-1'>
                                        <Field className={`${styles.input} form-input`} name="company" placeholder="Company" />
                                        <ErrorMessage name="company" render={error => <Error e={error} />} />
                                    </div>
                                </div>


                                <div className="d-flex">
                                    <SelectCountry name="country" placeholder="Country" styles={`${styles.input} ${styles.roundedNone} col pe-1 form-input`} />

                                    <div className='form-group mt-3 col pe-1 ps-1'>
                                        <Field className={`${styles.input} form-input`} name="stateRegion" placeholder="State/Region" />
                                        <ErrorMessage name="stateRegion" render={error => <Error e={error} />} />
                                    </div>
                                    <div className='form-group mt-3 col ps-1'>
                                        <Field type='number' className={`${styles.input} form-input`} name="zipCode" placeholder="Zip Code" />
                                        <ErrorMessage name="zipCode" render={error => <Error e={error} />} />
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div className='form-group mt-3 w-50 pe-1'>
                                        <Field type="date" className={`${styles.input} form-input`} name="yearBrith" placeholder="Year of Birth" />
                                        <ErrorMessage name="yearBrith" render={error => <Error e={error} />} />
                                    </div>

                                    <div className='form-group mt-3 w-50 ps-1'>
                                        <Field className={`${styles.input} form-input`} name="city" placeholder="City" />
                                        <ErrorMessage name="city" render={error => <Error e={error} />} />
                                    </div>
                                </div>
                                <div className='form-group mt-3'>
                                    <Field type="number" className={`${styles.input} form-input`} name="taxpayId" placeholder="Tax Pay Id" />
                                    <ErrorMessage name="taxpayId  " render={error => <Error e={error} />} />
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