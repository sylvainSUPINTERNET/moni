import { useEffect, useState } from "react"
import { Subject, Subscription } from "rxjs";
import { IHistoryService } from "../ws/Type";
import {getInstanceWs, sendWsMessage, testWs} from "../ws/WsInstance";
import * as signalR from "@microsoft/signalr"
import { WS_URL_HISTORY_SIGNALR } from "../../config/ws.connections";

const worker = new Worker("ws-workers.js")
worker.postMessage("start woky")


interface IHistoryData {
    timestamp: number;
    winnerUserName: string;
    productName:string;
    price: number;
}

function HistoryBattle() {
    console.log("History battle")
    // https://www.digitalocean.com/community/tutorials/how-to-handle-async-data-loading-lazy-loading-and-code-splitting-with-react
    // https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/basic_type_example/
    let [queueHistory, setQueueHistory] = useState<Array<any>>([]);

    let [historyWsConn, setHistoryWsConn] = useState<signalR.HubConnection>();

    useEffect( () => {

        let connection:signalR.HubConnection;
        try {
            connection = new signalR.HubConnectionBuilder()
            // .configureLogging(signalR.LogLevel.Information)
            .withUrl(WS_URL_HISTORY_SIGNALR, {})
            .build();
    
            connection
                .start()
                .then( () => {
                    setHistoryWsConn(connection);
                })
                .catch((err:any) => { console.log(err) } )
        
        } catch ( e ) {
            console.log(e)
        }


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

        // cleanup
        return () => {
            try {
                connection.stop()
            } catch ( err ) {
                console.log(err)
            }
        }


    }, [])

    return (
      <div className="container mx-auto">
        <div className="mt-10">
            <p className="mt-10 mb-10">Hitory battle</p> 
            {/* <HistoryQueue historyData={queueHistory}></HistoryQueue> */}
            <HistoryQueueSignalR historyData={queueHistory} historyWsConn={historyWsConn}></HistoryQueueSignalR>
        </div>
      </div>
    )
  }
  

function HistoryQueueSignalR ({historyData, historyWsConn}:{historyData:any, historyWsConn:signalR.HubConnection | undefined}):any {
    let [arr, setArr] = useState<Array<IHistoryData>>([]);
    
    useEffect( () => {
        if ( historyWsConn ) {
            historyWsConn.on("NewHistoryEvent", (historyData:IHistoryData) => {
                console.log("NW HISTORY", historyData.winnerUserName)
                setArr([...arr, historyData])
            });
        }
    })

    return ( 
        <div className="flex flex-wrap bg-gray-200 space-x-0.5">
         {
            historyData.slice(0,5).map( (item: any, i:number) => {
                return <div className="flex-1">
                    <div id={`${i}`} className="text-white text-center bg-blue-600 py-2 border-2 border-sky-500">{item.id}</div>
                </div>
            })
         }
        </div>
    )
}


// function HistoryQueue ({historyData}: any) {
//     const wsForService:IHistoryService = {id:"HISTORY_SERVICE"};
//     const subject:Subject<any> = new Subject();
//     // https://dev.to/bitovi/rxjs-with-react-jek
//     let [wsInstance, setWsInstance] = useState<any>(getInstanceWs(wsForService, subject));

//     let subscription: Subscription = subject.subscribe( (data:any) => {
//         console.log("data", data);
//     });

//     useEffect( () => {
//         sendWsMessage("yi");
//         return () => {
//             console.log("cleanup")
//             if ( subscription !== null ) {
//                 subscription.unsubscribe();
//             }
//         }
//     }, [])


//     return ( 
//         <div className="flex flex-wrap bg-gray-200 space-x-0.5">
//          {
//             historyData.slice(0,5).map( (item: any, i:number) => {
//                 return <div className="flex-1">
//                     <div id={`${i}`} className="text-white text-center bg-blue-600 py-2 border-2 border-sky-500">{item.id}</div>
//                 </div>
//             })
//          }

//         </div>
//     )
// }


// export declare interface IHistoryQueue {
//     id: number;
//     name: string;
//     email: string;
//     body: string;
// }


export default HistoryBattle
  