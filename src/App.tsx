import React, { useState, useEffect } from "react";
import useTableSorter from "./hooks/sortable";
import "./App.css";

import Headers from "./components/Headers";
import Rows from "./components/Rows";

interface tableType {
  assetClass: string;
  price: string;
  ticker: string;
}

interface Map {
  [key: string]: string | undefined;
}

function App() {
  const [tableData, setTableData] = useState<tableType[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const { items, requestSort, sortConfig } = useTableSorter(tableData);

  const styleMapper: Map = {
    Macro: "#ffffff",
    Equities: "#A2DBFA",
    Credit: "#08F5A1",
  };

  const getClassNamesFor = (name: string) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const getData = () => {
    fetch("db.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setTableData(myJson);
        getHeaders(myJson);
      });
  };
  useEffect(() => {
    getData();
    requestSort("ticker");
  }, []);

  const getHeaders = (table: any) => {
    const keys: string[] = Object.keys(table[0]);
    setHeaders(keys);
  };

  return (
    <div className="App">
      <div className="main">
        <h1> Dashboard </h1>
        <table>
          <thead>
            <Headers
              headers={headers}
              sortHandler={requestSort}
              getClassNamesFor={getClassNamesFor}
            />
          </thead>
          <tbody>
            {items &&
              items.map((row) => (
                <tr
                  style={{ backgroundColor: styleMapper[row.assetClass] }}
                  key={row.ticker}
                >
                  <Rows {...row} />
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
