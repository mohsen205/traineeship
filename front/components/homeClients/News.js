import React, { useState } from 'react';
import Pagination from './Paginations'
import styles from 'styles/news.module.css'
import Posts from './Posts';
import SingleHoverNews from "./SingleHoverNews"
const News = ({ data }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage] = useState(10)

    //GET current Posts
    const articles = data.slice(6, data.length)
    const indexOfLastPost = currentPage * postPerPage
    const indexOfFirstPost = indexOfLastPost - postPerPage
    const currentPosts = articles.slice(indexOfFirstPost, indexOfLastPost)
    const paginate = (pageNumber) => setCurrentPage(pageNumber)
    return (
        <div>
            <div className="text-secondary h3 my-2">Hot news 🔥</div>
            <div className="d-flex">
                <div className="w-70">
                    <SingleHoverNews title={data[1].title.length >= 70 ? `${data[1].title.slice(0, 70)}...` : data[1].title} url={data[1].url} bgImage={data[1].urlToImage} />
                    <SingleHoverNews title={data[2].title.length >= 70 ? `${data[2].title.slice(0, 70)}...` : data[2].title} url={data[1].url} bgImage={data[1].urlToImage} classProps="mt-2" />
                </div>
                <div className="w-70">
                    <div className="d-flex">
                        <SingleHoverNews title={data[3].title.length >= 70 ? `${data[3].title.slice(0, 70)}...` : data[3].title} classProps="ms-2 w-70" fontSize="h5" url={data[2].url} bgImage={data[2].urlToImage} />
                        <SingleHoverNews title={data[4].title.length >= 70 ? `${data[4].title.slice(0, 70)}...` : data[4].title} classProps="ms-2 w-70" fontSize="h5" url={data[3].url} bgImage={data[3].urlToImage} />
                    </div>
                    <SingleHoverNews title={data[5].title.length >= 70 ? `${data[5].title.slice(0, 70)}...` : data[5].title} classProps="mt-2 ms-2" url={data[4].url} bgImage={data[4].urlToImage} />
                </div>
            </div>
            <div className="text-secondary h3 my-2">Latest news</div>
            <div>
                <div className={`${styles.news} d-flex`}>
                    <Posts data={currentPosts} />
                </div>
                <div className="d-flex justify-content-center">
                    <Pagination postsPerPage={postPerPage} totalPosts={articles.length} paginate={paginate} />
                </div>
            </div>
        </div>
    )
}
export default News

