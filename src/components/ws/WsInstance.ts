import { WS_URL } from "../../config/ws.connections";
import { IService } from "./Type";
import { dispatcherEvent } from "./WsActions";

const wsInstance = {
     ws:new WebSocket(WS_URL)
}

let getInstanceWs = (service: IService) => {

    wsInstance.ws.onopen = ( event:Event ) => {
        console.log(`Open WS connection for service : ${service}`);
    }

    wsInstance.ws.onmessage = ( event: MessageEvent ) => { 
        dispatcherEvent(service, event);
    }

    wsInstance.ws.onclose = ( event: CloseEvent ) => { 
        console.log(`Close WS connection for service : ${service}`);
    }

    wsInstance.ws.onerror = ( event: Event ) => {
        console.log(`Error WS for service : ${service}`);
    }
}

export default getInstanceWs;