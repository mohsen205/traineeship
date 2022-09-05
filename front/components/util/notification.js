import React, { useState } from 'react';
import { IoMdNotificationsOutline } from 'react-icons/io'
import styles from 'styles/util/notification.module.css';
const Notification = () => {
    const [isThereNotification, setIsThereNotification] = useState(false)
    return (

        <div className='dropdown'>
            <a className="dropdown-toggle nav-link" role="button" id="dropdownNotifiaction" data-bs-toggle="dropdown" aria-expanded="false">
                {
                    isThereNotification &&
                    <div className={`${styles.notification} rounded-circle text-center`}>
                        <span className={`${styles.text} text-white`}>
                            1
                        </span>
                    </div>
                }
                <IoMdNotificationsOutline fontSize={'22px'} />
            </a>
            <ul className='dropdown-menu shadow mt-1' aria-labelledby="dropdownNotifiaction">
                {
                    isThereNotification ?
                        <li>
                            <div className="dropdown-item">
                                Hello mohcen
                            </div>
                        </li>
                        :
                        <div className="h4 mt-2 text-center">
                            No Notification
                        </div>
                }
            </ul>
        </div>
    )
}
export default Notification
//${styles.dropdown} ${styles.menu} 