
const {ccclass} = cc._decorator;

export type Constructor<T = unknown> = new (...args: any[]) => T;
export type AssetType<T = cc.Asset> = Constructor<T>;
export type LoadCompleteCallback<T> = (error: Error | null, asset: T) => void;

@ccclass('configuration')
export   class configuration  {
    static _instance: configuration;

    static get instance (){
        if (this._instance){
            return this._instance
        }

        this._instance = new configuration();
        this._instance.start();
        return this._instance;
    }

    jsonData:any = null;
    path:any = null;
    KEY_CONFIG:string = 'CarConfig';
    saveTimer: number = -1;
    markSave:boolean = false;

    start(){
        this.jsonData = {
            "userId":""
        }

        let content;
        if(!cc.sys.isNative){
            content = cc.sys.localStorage.getItem(this.KEY_CONFIG);
        }

        if (content && content.length) {
            if (content.startsWith('@')) {
                content = content.substring(1);
            }

            try {
                //初始化操作
                const jsonData = JSON.parse(content);
                this.jsonData = jsonData;
            } catch (error) {
                
            }
        }

        this.saveTimer = setInterval(() =>{
            this.scheduleSave();
        }, 500)

    }
    setConfigDataWithoutSave(key :string, value:any){
        const account = this.jsonData.userId;
        if (this.jsonData[account]){
            this.jsonData[account][key] = value;
        } else {
            console.error("no account can not save")
        }
    }
    
    setConfigData(key: string, value:any){
        this.setConfigDataWithoutSave(key,value)
        this.markSave = true;
    }

    getConfigData(key: string){
        const account = this.jsonData.userId;
        if (this.jsonData[account]) {
            const value = this.jsonData[account][key];
            return value ? value :"";
        }else{
            cc.log("no account can not load")
            return "";
        }
    }

    setGlobalData (key: string, value:any) {
        this.jsonData[key] = value;
    }

    getGlobalData (key: string) {
        return this.jsonData[key];
    }

    setUserId (userId:string) {
        this.jsonData.userId = userId;
        if (!this.jsonData[userId]) {
            this.jsonData[userId] = {};
        }
        this.save();
    }

    getUserId () {
        return this.jsonData.userId;
    }
    
    scheduleSave () {
        if (!this.markSave) {
            return;
        }

        this.save();
    }
    
     /**
     * 标记为已修改
     */
      markModified () {
        this.markSave = true;
    }

    save(){
       //
       const str = JSON.stringify(this.jsonData);

       let zipStr = str;

       this.markSave = false;

       if (!cc.sys.isNative) {
            const ls = cc.sys.localStorage;
            ls.setItem(this.KEY_CONFIG, zipStr);
            return;
       }
    }

    /**
     * 生成随机账户
     * @returns
     */
     public static generateGuestAccount () {
        return `${Date.now()}${0 | (Math.random() * 1000, 10)}`;
    }
}
