import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../Table";
import { COLUMNS } from "./columns";
const TableLogic = ({ watchLists }) => {
  const [watchList, setWatchList] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const listSymbol = [];
    watchLists.map((d) => listSymbol.push(d.symbol));
    axios
      .get(
        `https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=${listSymbol.join(
          ","
        )}`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "0j3xd7xTba2mBZ5GB346ah8C9MDFxnI11IcWkAS8",
          },
        }
      )
      .then((response) => {
        setWatchList(response.data.quoteResponse.result);
      })
      .catch((error) => setError(error));
  }, [watchLists]);
  console.log(watchList);
  return (
    <>
      <Table list={watchList} COLUMNS={COLUMNS} />
    </>
  );
};
export default TableLogic;
