import { IService } from "./Type";
import { onMessageService } from "./WsHistoryService";

export const dispatcherEvent = ( serviceTarget: IService , event: MessageEvent ) => {
    switch(serviceTarget.id) {
        case "HISTORY_SERVICE":
            onMessageService(event)
            break;
        case "HOME_SERVICE":
            console.log("Home service WS not impletemend !");
            break;
        default:
            throw Error(`${serviceTarget.id} is not a valid service`);
    }
}
