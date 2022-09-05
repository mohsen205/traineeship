import React, { useContext, useState, useEffect } from "react"
import { Formik, Field, Form, ErrorMessage } from "formik"
import { CreateToken } from '../SideBar'
import { AiFillStar, AiOutlineStar, AiOutlineBell, AiOutlineCloseCircle } from 'react-icons/ai'
import styles from "styles/equites.module.css"
import stylesSheet from 'styles/login.module.css'
import Error from 'components/util/error'
import * as Yup from 'yup'
import axios from 'axios'
import { useRouter } from 'next/router'
import { MdEmail } from 'react-icons/md'
import PopUp from './popUp'
import WatchlistCollections from './WatchlistCollections'

const validationSchema = Yup.object({
    position: Yup.string().required("Position is a required field"),
    stock_price: Yup.number().required("Price is a required field"),
})




const Header = ({ data, list }) => {
    const array = list.map(l => {
        return l.collection_id
    })

    const router = useRouter()
    const token = useContext(CreateToken);
    const [price, setPrice] = useState('')
    const [companyDetails, setCompanyDetails] = useState([])

    const [error, setError] = useState(false)
    const [message, setMessage] = useState(false)

    useEffect(() => {
        const { name, symbol } = router.query
        const exch_desc = symbol.slice(0, symbol.indexOf(':'))
        const ticker = symbol.slice(symbol.indexOf(':') + 1, symbol.length)
        setCompanyDetails([name, exch_desc, ticker])
        axios.get(`https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=${ticker}`, {
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': 'Cq6vR2Fo6s9qmfap8xbKR483omRKGLd25mXTAzpc'
            }
        }).then(response => {
            setPrice(response.data.quoteResponse.result)
        }).catch(error => console.log(error))
    }, [router])

    const initialValues = {
        position: '',
        stock_price: !price ? '' : '',
        recevie: true
    }

    const onSubmit = values => {
        const symbols = companyDetails[2]
        const exch_desc = companyDetails[1]
        axios.post(`http://127.0.0.1:8000/alert/add-alert`, {
            symbol: symbols,
            price: values.stock_price,
            position: values.position,
            exch_desc: exch_desc,
            recevie: values.recevie ? "true" : "false"
        },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }).then(response => {
                if (response.data['ok']) {
                    setMessage(true)
                }
            })
            .catch(error => setError(true));


    }











    return (
        <div className="p-2">
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
                        Alert created successfully
                    </div>
                    <button type="button" className="me-2 m-auto btn text-success" data-bs-dismiss="toast" aria-label="Close"
                        onClick={() => setMessage(false)}>
                        <AiOutlineCloseCircle fontSize={'25'} />
                    </button>
                </div>
            </div>
            <div className="d-flex justify-content-end align-items-center">
                <div className="dropdown">
                    <button className="btn me-2 text-capitalize dropdown-toggle btn-soft-info"
                        id="dropdownWatchList"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false">
                        {array.length > 0 ? <AiFillStar /> : <AiOutlineStar />}   add to watch list
                    </button>
                    <div className={`${styles.dropdowmenu} dropdown-menu dropdown-menu-end`} aria-labelledby="dropdownWatchList">
                        <div className="px-2 pt-1">
                            <h5>Select watchlist type </h5>
                        </div>
                        <hr />
                        <WatchlistCollections data={data} list={list} />
                        <hr />
                        <div className="px-2 pt-2">
                            <PopUp />
                        </div>
                    </div>
                </div>

                <div className="dropdown">
                    <button className="btn me-2 text-capitalize dropdown-toggle btn-soft-success"
                        id="dropdownAlert"
                        type="button"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        <AiOutlineBell /> Create alert
                    </button>
                    <div className={`${styles.dropdowmenu} dropdown-menu dropdown-menu-end`} aria-labelledby="dropdownAlert">
                        <div className="px-2 pt-1">
                            <h5>Create alert</h5>
                        </div>
                        <hr />




                        <Formik initialValues={initialValues}
                            onSubmit={onSubmit}
                            validationSchema={validationSchema}>
                            {
                                formik => {
                                    return (
                                        <Form className="w-100 py-4 px-3">

                                            <div className='form-group'>
                                                <Field as='select' name="position" className={`form-select shadow-none rounded-top`}>
                                                    <option value="moves above" defaultValue>Moves above</option>
                                                    <option value="moves below">Moves below</option>
                                                </Field>
                                                <ErrorMessage name="position" render={error => <Error e={error} />} />
                                            </div>

                                            <div className='form-group'>
                                                <Field type="text" min={0} className={`${stylesSheet.input} form-input mt-2`} name="stock_price" />
                                                <ErrorMessage name="stock_price" render={error => <Error e={error} />} />
                                            </div>
                                            <div className="mt-2 d-flex justify-content-between">

                                                <label className="form-check-label" htmlFor="recevie">
                                                    <MdEmail /> <span>Email notification</span>
                                                </label>
                                                <Field type="checkbox" className="form-check-input" name="recevie" id="recevie" />

                                            </div>
                                            <div className="d-flex justify-content-end">
                                                <button className='btn-blue mt-3 btn-primary'
                                                    type='submit'
                                                    disabled={!formik.isValid}
                                                    style={{ width: "140px" }}
                                                >
                                                    Create
                                                </button>
                                            </div>

                                        </Form>
                                    )
                                }
                            }
                        </Formik>

































                        {/* <Alert /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Header