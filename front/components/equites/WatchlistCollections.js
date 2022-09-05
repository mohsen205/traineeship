import React, { useContext, useState, useEffect } from "react"
import { CreateToken } from '../SideBar'
import CheckBox from "components/util/checkBox"
import { useRouter } from 'next/router'
import axios from 'axios'



const WatchlistCollections = ({ data, list }) => {
    const array = list.map(l => {
        return l.collection_id
    })

    const router = useRouter()
    const [companyDetails, setCompanyDetails] = useState([])
    useEffect(() => {
        const { name, symbol } = router.query
        const exch_desc = symbol.slice(0, symbol.indexOf(':'))
        const ticker = symbol.slice(symbol.indexOf(':') + 1, symbol.length)
        setCompanyDetails([name, exch_desc, ticker])
    }, [router])

    const token = useContext(CreateToken);

    const onSubmit = (e) => {
        const symbols = companyDetails[2]
        const exch_desc = companyDetails[1]
        const company_name = companyDetails[0]
        const checked = e.target.checked
        if (checked) {
            axios.post(`http://127.0.0.1:8000/watchlist/create`, {
                symbol: symbols,
                collection_id: e.target.value,
                company_name: company_name,
                exch_desc: exch_desc,
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }).then(response => {
                    // console.log(response.data);
                })
                .catch(error => console.log(error));
        } else {
            axios.post(`http://127.0.0.1:8000/watchlist/delete`, {
                symbol: symbols,
                collection_id: e.target.value,
                company_name: company_name,
                exch_desc: exch_desc,
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }).then(response => {
                    console.log(response.data);
                })
                .catch(error => console.log(error));
        }


    }

    return (
        <div className="px-3">
            <div className="form-group overflow-auto" style={{ height: "150px" }}>
                {
                    data.map(collection => {
                        return (
                            <CheckBox id={collection.id} value={collection.title}
                                key={collection.id} checked={array.includes(collection.id)} clickHandler={onSubmit} />
                        )
                    })
                }
            </div>
        </div>
    )
}
export default WatchlistCollections