import { IHistoryModel } from "../../shared/models/IHistory";

/**
 * Common to all message send must contains at least service in the JSON payload
 */
type messageFormat  = {
    service: "HISTORY" | "OTHER..."; // add name for future service 
}


/**
 * message format WS from history service
 */
interface messageFormatHistory extends messageFormat {
    payload: Array<IHistoryModel>;
}

interface IServicesWsSupported  {
    messageFromHistory: (msg:messageFormatHistory) => void;
    // TODO add new method for other serviees
} 

export class WsEventsManager implements IServicesWsSupported {
    constructor() {}

    /**
     * Based on JSON ws message received and type value, dispatch to the right process
     * @param msg MessageEvent
     */
    dispatch(msg:MessageEvent): void {
        try {
            const data:messageFormat = JSON.parse(msg.data);
            const { service } = data;
            switch (service) {
                case "HISTORY":
                    const msg = data as messageFormatHistory;
                    this.messageFromHistory(msg);
                    break;
                // TOODO another service
                default:
                    throw Error ("Unknown service WS : " + service);
            }
        } catch ( e ) {
            throw Error("Invalid JSON received from WS");
        }
    }


    messageFromHistory(msg:messageFormatHistory): void {
        console.log(`${msg.service} : ${msg.payload.toString()}`);
    }

}


const wsEventsManager: WsEventsManager = new WsEventsManager();
