import PropTypes from 'prop-types'
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai'
import styles from 'styles/util/updown.module.css'
const upDown = ({ sorted }) => {
    return (
        <span className="row">
            <AiOutlineCaretUp className={`${styles.up}`} style={{ color: `${sorted == '0' ? '#878a99' : sorted == '1' ? '#878a99' : '#f1f1f1'}` }} />
            <AiOutlineCaretDown className={`${styles.down}`} style={{ color: `${sorted == '0' ? '#878a99' : sorted == '2' ? '#878a99' : '#f1f1f1'}` }} />
        </span>
    )
}
upDown.defaultProps = {
    sorted: '0'
}
upDown.propTypes = {
    sorted: PropTypes.string
}
export default upDown