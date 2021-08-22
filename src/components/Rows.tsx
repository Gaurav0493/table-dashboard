import React from 'react'

interface rowType {
    ticker: string;
    price: string;
    assetClass: string
  }

export default function Rows(props:rowType) {
    const { ticker, price, assetClass } = props;
    return (
        <>
            <td> {ticker} </td>
            <td style={{color: parseInt(price) >=0 ? 'blue':'red'}} > {price}</td>
            <td> {assetClass}</td>
        </>
    )
}
