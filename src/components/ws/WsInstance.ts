import { Subject } from "rxjs";
import { WS_URL } from "../../config/ws.connections";
import { IService } from "./Type";
import { dispatcherEvent } from "./WsActions";

const wsInstance = {
     ws: new WebSocket(WS_URL),
}
Object.freeze(wsInstance);


export let getInstanceWs = (service: IService, subject:Subject<any>) => {

    wsInstance.ws.onopen = ( event:Event ) => {
        console.log(`Open WS connection for service : ${service.id}`);
    }

    wsInstance.ws.onmessage = ( event: MessageEvent ) => { 
        console.log("received msg");
        dispatcherEvent(service, event, subject);
    }

    wsInstance.ws.onclose = ( event: CloseEvent ) => { 
        console.log(`Close WS connection for service : ${service.id}`);
    }

    wsInstance.ws.onerror = ( event: Event ) => {
        console.log(`Error WS for service : ${service.id}`);
    }
}


export let sendWsMessage = (msg:any) => {
    try {
        if ( wsInstance.ws.OPEN ) {
            wsInstance.ws.send(msg);
        }
    } catch ( e ) {
        console.log(`Error while sending msg WS : ${e}`);
    }
}