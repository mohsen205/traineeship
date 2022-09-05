import React, { useState } from 'react'
import PublicDetails from './PublicDetails'
import PrivateDetails from './PrivateDetails'
import CloseAccount from './CloseAccount'
import ChangePassword from './EditPassword'

import styles from 'styles/setting.module.css'

const EditDetails = ({ publicData, privateData, name }) => {

    const [page, setPage] = useState('Personal Details')

    return (
        <div className={`${styles.editDetails} bg-white ms-5 rounded-1`}>
            <nav className="nav py-1">
                <a className="nav-link" role="button" onClick={() => setPage('Personal Details')}>Personal Details</a>
                <a className="nav-link" role="button" onClick={() => setPage('Change Password')}>Change Password</a>
                <a className="nav-link" role="button" onClick={() => setPage('Private Details')}>Private Details</a>
                <a className="nav-link" role="button" onClick={() => setPage('Delete Account')}>Delete Account</a>
            </nav>
            <hr />
            {
                page == 'Personal Details' ? <PublicDetails data={publicData} /> :
                    page == 'Private Details' ? <PrivateDetails data={privateData} /> :
                        page == 'Change Password' ? <ChangePassword /> :
                            page == 'Delete Account' ? <CloseAccount name={name} /> : null
            }
        </div>
    )
}
export default EditDetails

/*
            <PublicDetails data={publicData} />
            <PrivateDetails data={privateData} /> 
*/