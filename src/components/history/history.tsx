import { useEffect, useState } from "react"
import { IHistoryService } from "../ws/Type";
import getInstanceWs from "../ws/WsInstance";

function HistoryBattle() {
    // https://www.digitalocean.com/community/tutorials/how-to-handle-async-data-loading-lazy-loading-and-code-splitting-with-react
    // https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/basic_type_example/

    let [queueHistory, setQueueHistory] = useState<Array<any>>([]);

    useEffect( () => {
        fetch("https://jsonplaceholder.typicode.com/comments")
        .then( response => response.json() )
        .then( data => {
            let mock = [
                {
                    id: 1
                },
                {
                    id: 2
                },
                {
                    id: 3
                },
                {
                    id: 4
                },
                {
                    id: 5
                },
                {
                    id: 6
                }
            ]
            let arr = [...mock];
            setQueueHistory(arr);
        });
    }, [])

    return (
      <div className="container mx-auto">
        <div className="mt-10">
            <p className="mt-10 mb-10">Hitory battle</p> 
            <HistoryQueue historyData={queueHistory}></HistoryQueue>
        </div>
      </div>
    )
  }
  


function HistoryQueue ({historyData}: any) {
    const wsForService:IHistoryService = {id:"HISTORY_SERVICE"};    
    let [wsInstance, setWsInstance] = useState<any>(getInstanceWs(wsForService));

    return ( 
        <div className="flex flex-wrap bg-gray-200 space-x-0.5">
         {
            historyData.slice(0,5).map( (item: any) => {
                return <div className="flex-1">
                    <div className="text-white text-center bg-blue-600 py-2 border-2 border-sky-500">{item.id}</div>
                </div>
            })
         }

        </div>
    )
}


// export declare interface IHistoryQueue {
//     id: number;
//     name: string;
//     email: string;
//     body: string;
// }


export default HistoryBattle
  