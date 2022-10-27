import { useEffect, useState } from "react"
import { BehaviorSubject, Subject, Subscription } from "rxjs";
import * as signalR from "@microsoft/signalr"
import { config } from "../../config/api";
interface IHistoryData {
    timestamp: number;
    winnerUserName: string;
    productName:string;
    price: number;
}

// Avoid to create multiple listener / connection ( out of component and reredenring )
let wsSubject = new Subject<IHistoryData>();
const ws:any  = {
    instance: new signalR.HubConnectionBuilder().withUrl(config.historyService.wsUrl, {}).build(),
    currentInstance: undefined
}

ws.instance.start().then(() => {
    if ( !ws.currentInstance ) {
        ws.currentInstance = ws.instance
    }
}).catch((e:any) => {
    console.log("error", e)
})

ws.instance.on("NewHistoryEvent", (data:IHistoryData) => {  
    wsSubject.next(data)
});


function HistoryBattle() {
    useEffect( () => {

    }, [])

    return (
      <div className="container mx-auto">
        <div className="mt-10">
            <p className="mt-10 mb-10">Hitory battle</p> 
            <HistoryQueueSignalR></HistoryQueueSignalR>
        </div>
      </div>
    )
  }
  


function HistoryQueueSignalR ():any {
    const [history, setHistory] = useState<IHistoryData[]>([]);
    const abortController = new AbortController();

    const reactiveHistory = new BehaviorSubject<IHistoryData[]>([]);

    let fetchHistoryWins = async (): Promise<void> => {
        try {

            const res = await fetch(config.historyService.url, { signal: abortController.signal } );

            if ( res.status === 200 ) {
                setHistory(await res.json()); 
                reactiveHistory.next(history)
                return;
            }
            // TODO: remove alert and replace with cool modal !
            alert("Error while fetching history wins");

        } catch ( e ) {
            alert(e)
        }
    }

    useEffect( () => {

        fetchHistoryWins();

        let sb = wsSubject.subscribe( (data:any) => {
            if ( history.length >= 5) history.pop();

            reactiveHistory.subscribe( data => console.log("data", data));
            setHistory([data,...history]);
        });


        return () => { 
            sb.unsubscribe();
        }
    }, [])

    return ( 
        <div className="flex flex-wrap bg-gray-200 space-x-0.5">
         {
            
            history.slice(0,5).map( (item: IHistoryData, i:number) => {
                return <div className="flex-1" key={`${i}`}>
                    <div key={`${i}`} className="text-white text-center bg-blue-600 py-2 border-2 border-sky-500">{item.timestamp}</div>
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
  