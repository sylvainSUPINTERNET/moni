import { WS_URL } from "../../config/ws.connections";
import { WsEventsManager } from "./WsEventsManager";

let instance: any;

// https://blog.postman.com/introducing-postman-websocket-echo-service/ ( URL for server )

class WsManager extends WsEventsManager {
    _ws: WebSocket;

    constructor() {
        super();
        if ( instance ) {
            throw Error("WsManager is a singleton");
        }
        instance = this;
        this._ws = new WebSocket(`${WS_URL}`);
        this._ws.onopen = this.onopen;
        this._ws.onmessage = this.onmessage;
        this._ws.onclose = this.onclose;
        this._ws.onerror = this.onerror;
    }

    onopen(event:Event): void {
        console.log("Open new connection")
    }
    onmessage(event:MessageEvent): void {
        this.dispatch(event);
    }
    onclose(event:CloseEvent): void {
        console.log("Close connection")
    }
    onerror(event:Event): void {
        console.log("ERR connection")
    }

}

// https://www.tutorialsteacher.com/typescript/typescript-generic-class
// https://www.typescriptlang.org/docs/handbook/2/generics.html
const wsManager= new WsManager();
export default Object.freeze(wsManager);