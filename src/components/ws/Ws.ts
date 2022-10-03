let instance: any;


interface WsType {
    test: "HISTORY"
}

interface IWsManager<T> {
    onOpen: <Type>(type: T) => void;
    onMessage: <Type>(type: T, message: any) => void;
    // onClose: (type: T) => void;
    // onError: (type: T, error: any) => void;
}   

class WsManager <T> implements IWsManager<T>  {
    _ws: WebSocket;

    constructor() {
        if ( instance ) {
            throw Error("WsManager is a singleton");
        }
        instance = this;
        this._ws = new WebSocket("ws://localhost:8080/ws");
        this._ws.onopen = this.onopen;
        this._ws.onmessage = this.onmessage;
        this._ws.onclose = this.onclose;
        this._ws.onerror = this.onerror;
    }
    onMessage (type: T, message: any): void  {

    }
    onOpen<Type>(type: T): void {
        console.log(`Open connection for ${type}`);
    }
    
    
    onopen(event:Event): void {
        this.onOpen();
    }
    onmessage(event:MessageEvent): void {
        this.onMessage(this.type, event.data);
    }
    onclose(event:CloseEvent): void {
        throw new Error("Method not implemented.");
    }
    onerror(event:Event): void {
        throw new Error("Method not implemented.");
    }

}

// https://www.tutorialsteacher.com/typescript/typescript-generic-class
// https://www.typescriptlang.org/docs/handbook/2/generics.html
const wsManager= new WsManager();
export default Object.freeze(wsManager);