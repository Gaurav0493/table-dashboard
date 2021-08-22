interface Map {
    [key: string]: string | undefined
}

export default function Headers(props:any) {

    const { headers, getClassNamesFor, sortHandler} = props;

    const headerMapper: Map = {
        "assetClass": "Asset",
        "price": "Price",
        "ticker": "Ticker"
    }

    return (
        <>
            <tr>
                {headers && headers.map((header:string)=><th key={header} data-testid={`test-id-${header}`} className={getClassNamesFor(header)} onClick={()=>sortHandler(header)} > <span> {headerMapper[header]}</span></th>)}
            </tr>
        </>
    )
}