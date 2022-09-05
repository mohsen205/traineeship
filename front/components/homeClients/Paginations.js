import styles from 'styles/news.module.css'
const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className='pagination'>
                {pageNumbers.map(number => (
                    <li key={number} className='page-item me-1'>
                        <a onClick={() => paginate(number)} className={`${styles.paginationAnchor} text-blue page-link rounded-circle d-flex justify-content-center align-items-center`}>
                            <span style={{ marginTop: "4px" }}>
                                {number}
                            </span>
                        </a>
                    </li>
                ))}
            </ul>
        </nav >
    );
};

export default Pagination;