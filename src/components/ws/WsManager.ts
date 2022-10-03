// https://www.patterns.dev/posts/singleton-pattern/

import { IWsManager } from "./IWsManager";

let instanciated:WsManager; 

class WsManager implements IWsManager {
    private _ws: WebSocket;

    constructor() {
        if ( instanciated ) {
            throw new Error("Already instanciated");
        }

        instanciated = this;
        this._ws = new WebSocket("ws://localhost:8080/ws");
        this._ws.onopen = this.onOpen;
        this._ws.onmessage = this.onMessage;
        this._ws.onclose = this.onClose;
        this._ws.onerror = this.onError;
    }

    onOpen: (event: Event) => void = (event: Event) => { 
    }

    onMessage: (event: MessageEvent) => void = (event: MessageEvent) => {
    }

    onClose: (event: CloseEvent) => void = (event: CloseEvent) => {
    }

    onError: (event: Event) => void = (event: Event) => {
    }


}


const wsManagerSingleton = Object.freeze(new WsManager());
export default wsManagerSingleton;
