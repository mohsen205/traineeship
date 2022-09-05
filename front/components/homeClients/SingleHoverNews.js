import Link from 'next/link';
import styles from 'styles/news.module.css'
const SingleHoverNews = ({ bgImage, title, url, classProps = '', fontSize = 'h3' }) => {
    return (
        <div className={`${styles.container} rounded-1 ${classProps}`} style={{ backgroundImage: `url("${bgImage}")` }}>
            <div className={`${styles.content} p-2 d-flex flex-column justify-content-end`}>
                <Link href={url} passHref={true}>
                    <a className={`text-white text-decoration-none fw-bold ${fontSize} ${styles.anchor}`} target="_blank" rel="noopener noreferrer">
                        {title}
                    </a>
                </Link>
            </div>
        </div>
    )
}
export default SingleHoverNews