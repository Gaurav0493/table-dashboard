import { useState, useMemo} from 'react';

const assetOrder = ["Equities","Macro","Credit"];

const useTableSorter = (items:any, config = {key:"ticker",direction:"ascending"}) => {
    
    const [sortConfig, setSortConfig] = useState(config || null);
    const [selectedAsset, setAsset] = useState(assetOrder[0]);
    
    const sortedItems = useMemo(() => {
      let sortableItems = [...items];
      if (sortConfig !== null) {
          if(sortConfig && sortConfig.key === "assetClass"){
            if(!selectedAsset){
                setAsset(assetOrder[0]);
            } else {
                let indexOfAsset = assetOrder.indexOf(selectedAsset);
                setAsset(indexOfAsset === assetOrder.length-1 ? assetOrder[0] : assetOrder[indexOfAsset+1])
            }
            let matchingAssets = sortableItems.filter(item => item.assetClass === selectedAsset);
            let remainingAsset = sortableItems.filter(item => item.assetClass !== selectedAsset);
            sortableItems = [...matchingAssets,...remainingAsset];
          } else {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                  return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                  return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
          }
        
      }
      return sortableItems;
    }, [items, sortConfig]);
  
    const requestSort = (key: string) => {
      let direction = 'ascending';
      if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
        direction = 'descending';
      }
      setSortConfig({ key, direction });
    }
  
    return { items: sortedItems, requestSort, sortConfig };
  }


  export default useTableSorter;