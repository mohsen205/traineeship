import React, { useState } from "react"
import styles from "styles/util/search.module.css"
import { IoCloseCircleSharp } from "react-icons/io5"
import { AiOutlineSearch } from 'react-icons/ai'
import Result from "./result"
const Search = () => {
    const [searchText, setSearchText] = useState('')
    const handleSearch = (e) => {
        setSearchText(e.target.value)
    }
    return (
        <>
            <form>
                <div className="input-group">
                    <span className={`${styles.text} input-group-text`} id="search-aria">
                        <AiOutlineSearch />
                    </span>
                    <div className="dropdown">
                        <input type="text" className={`${styles.input} dropdown-toggle`}
                            value={searchText}
                            onChange={handleSearch}
                            placeholder="Search.."
                            aria-label="search" aria-describedby="search-aria" />
                        <Result searchText={searchText} />
                    </div>
                    <span className={`${styles.icons} ${styles.text} input-group-text`}>
                        <IoCloseCircleSharp className={`times-icon ${searchText === '' ? "invisible" : ""}`} onClick={() => setSearchText('')} />
                    </span>
                </div>
            </form>
        </>

    )
}
export default Search