import { AiOutlineCloseCircle } from 'react-icons/ai'
const Toast = ({ error, type = "error" }) => {
    return (
        <div className={`position-fixed toast align-items-center fade mb-3 ${type == "error" ? 'text-danger border-danger ' : 'text-success border-success'} show`} role="alert" aria-live="assertive" aria-atomic="true">
            <div className="d-flex">
                <div className="toast-body">
                    {error}
                </div>
                <button type="button" className={`me-2 m-auto btn ${type == "error" ? 'text-danger' : 'text-success'} `} data-bs-dismiss="toast" aria-label="Close">
                    <AiOutlineCloseCircle fontSize={'25'} />
                </button>
            </div>
        </div>
    )
}
export default Toast