import React, { useState, useEffect } from "react";
import SingleResult from "./singleResult";
import styles from "styles/util/search.module.css";
import { AiOutlineSearch } from "react-icons/ai";
import { MdSearchOff } from "react-icons/md";
import axios from "axios";
const Result = ({ searchText }) => {
  const [result, setResult] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    axios
      .get(
        `https://yfapi.net/v6/finance/autocomplete?region=US&lang=en&query=${searchText}`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "0j3xd7xTba2mBZ5GB346ah8C9MDFxnI11IcWkAS8",
          },
        }
      )
      .then((response) => {
        setResult(response.data.ResultSet.Result);
      })
      .catch((error) => setError(error.error));
  }, [searchText]);
  return (
    <>
      {searchText == "" ? null : (
        <div className={`${styles.result} rounded-1 shadow p-2`}>
          <div className={`${styles.searches} mt-2`}>
            <div className={`${styles.title}`}>Searches</div>
            {result.length == 0 ? (
              <div className="d-flex justify-content-center h3">
                <MdSearchOff />
              </div>
            ) : (
              <div className={`${styles.scrolling} overflow-auto `}>
                <table className="table table-hover">
                  <tbody className={styles.tbody}>
                    {result.map((r) => {
                      return (
                        <SingleResult
                          key={r.symbol}
                          name={r.name}
                          symbol={r.symbol}
                          exchDisp={r.exchDiscp}
                        /> //fixed it
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default Result;
