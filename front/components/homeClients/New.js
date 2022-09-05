import PropTypes from 'prop-types'
import styles from 'styles/news.module.css'
import Link from 'next/link'
const New = ({ image, url, title, source }) => {
    return (
        <>
            {
                image == null ? '' :
                    <div className={`col-md-4 mt-2`}>
                        <div className={`${styles.bgImage}`} style={{ backgroundImage: `url("${image}")` }}>

                        </div>
                        <h6 className="text-secondary ms-1 my-1">{source}</h6>
                        <Link href={url}>
                            <a className={`${styles.link} text-black text-decoration-none ms-1`}>
                                {title}
                            </a>
                        </Link>
                    </div>
            }
        </>
    )
}
New.propTypes = {
    image: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired
}
export default New