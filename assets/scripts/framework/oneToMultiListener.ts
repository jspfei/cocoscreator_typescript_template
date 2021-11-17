 const {ccclass} = cc._decorator;

@ccclass
export  class oneToMultiListener {
    static handlers: { [name :string]:{handler : Function ,target :any }[]};
    static supportEvent: { [name :string] :string}

    public static on (eventName: string, handler: Function, target?: any) {
        const objHandler = {handler:handler,target:target}
        let handlerList = this.handlers[eventName]
        if(!handlerList){
            handlerList = [];
            this.handlers[eventName] = handlerList;
        }

        for (let i = 0; i < handlerList.length; i++){
            if(!handlerList[i]){
                handlerList[i] = objHandler;
                return i;
            }
        }
      
        handlerList.push(objHandler);
        return handlerList.length;
    }

    public static off (eventName: string, handler: Function, target?: any){
        const handlerList = this.handlers[eventName]

        if (!handlerList){
            return;
        }
         
        for (let i = 0; i < handlerList.length; i++){
            const oldObj = handlerList[i];
            if(oldObj.handler === handler && (!target || target === oldObj.target)){
                handlerList.splice(i,1);
                break;
            }

        }
    }

    public static dispatchEvent (eventName: string, ...args:any){
        const handlerList = this.handlers[eventName];

        const params = [];
        let i;
        for (i = 1; i< arguments.length; i++){
            params.push(arguments[i])
        }

        if(!handlerList){
            return;
        }

        for (i = 0; i < handlerList.length; i++){
            const objHandler = handlerList[i];
            if( objHandler.handler) { 
                objHandler.handler.apply(objHandler.target, args);
            }
        }
    }

    public static setSupportEventList(arrSupportEvent: string[]) {
        if (!(arrSupportEvent instanceof Array) ) {
            return false;
        }

        this.supportEvent = {}

        for (let i  in arrSupportEvent){
            const eventName = arrSupportEvent[i];
            this.supportEvent[eventName] = i;
        }

        return true;
    }
    
}
