import { Subject } from "rxjs";
import { IService } from "./Type";
import { onMessageService } from "./WsHistoryService";

export const dispatcherEvent = ( serviceTarget: IService , event: MessageEvent, subject:Subject<any> ) => {
    switch(serviceTarget.id) {
        case "HISTORY_SERVICE":
            onMessageService(event, subject)
            break;
        case "HOME_SERVICE":
            console.log("Home service WS not impletemend !");
            break;
        default:
            throw Error(`${serviceTarget.id} is not a valid service`);
    }
}
