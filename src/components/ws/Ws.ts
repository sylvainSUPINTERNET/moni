let instance: any;



interface Ws {

}

interface WsHistory extends Ws {
    name: "HISTORY"
}


class WsManager{
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

    onOpen<Type>(type: Type): void {
        console.log(`Open connection for ${type}`);
    }
    
    
    onopen(event:Event): void {
        // this.onOpen<WsHistory>({name: "HISTORY"});
        // TODO ici, il faut définir une interface par type d'event
        // et l'utilisaer comme type
        // this.onOpen<string>("ok");
    }
    onmessage(event:MessageEvent): void {
        // this.onMessage(this.type, event.data);
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