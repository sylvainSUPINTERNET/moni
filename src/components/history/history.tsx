import { useEffect, useState } from "react"

function HistoryBattle() {

    // https://www.digitalocean.com/community/tutorials/how-to-handle-async-data-loading-lazy-loading-and-code-splitting-with-react
    // https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/basic_type_example/

    let [queueHistory, setQueueHistory] = useState<Array<any>>([])
    
    useEffect( () => {
        fetch("https://jsonplaceholder.typicode.com/comments")
        .then( response => response.json() )
        .then( data => {
            setQueueHistory(data)
        })
    }, [])

    return (
      <div className="flex h-screen">
        <p>Hitory battle</p> 
        <HistoryQueue historyData={queueHistory}></HistoryQueue>
      </div>
    )
  }
  


  /**
   * @param param0 
   * @returns 
   */
function HistoryQueue ({historyData}: any) {
    console.log(historyData)

    return ( 
        <div>  
            {
                historyData && historyData.map( (item:any, index:number) => {
                    <p>{item.name}</p>
                })
            }

        </div>
    )
}


export declare interface IHistoryQueue {
    id: number;
    name: string;
    email: string;
    body: string;
}


export default HistoryBattle
  