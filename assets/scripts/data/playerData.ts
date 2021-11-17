import { configuration } from "../framework/configuration";
import { constant } from "../framework/constant";

const { ccclass, property } = cc._decorator;

@ccclass 
export    class playerData extends cc.Component {

    //对外提供单例模式
    static _instance: playerData;

    static get instance() {
        if (this._instance) {
            return this._instance;
        }
        this._instance = new playerData();
        return this._instance;
    }

    //设置用户信息，已经本地保存数据的数据结构
    userId: string = "";
    playerInfo: { [name: string]: any } = {};
    dataVersion: string = '';

    loadGlobalCache() {
        let userId = configuration.instance.getUserId();
        if (userId) {
            this.userId = userId;
        }
    }

    loadFromCache() {
        //读取玩家基础数据
        this.playerInfo = this.loadDataByKey(constant.LOCAL_CACHE.PLAYER)
    }

    loadDataByKey(keyName: string) {
        let ret = {}
        let str = configuration.instance.getConfigData(keyName);
        if (str) {
            try {
                ret = JSON.parse(str);
            } catch (error) {
                ret = {}
            }
        }

        return ret;
    }

    createPlayerInfo(loginData?: {[ name: string ]:any}){
        this.playerInfo.createDate = new Date();
        this.playerInfo.cars =[];//数组属性
        this.playerInfo.cars.push(1);//数组属性
        this.playerInfo.level = 1;//单个属性

        this.playerInfo.signInInfo = {};// 对象属性

        if(loginData){
            for(let key in loginData){
                this.playerInfo[key] = loginData[key];
            }
        }

    }

    saveAccount(userId: any) {
        this.userId = userId; 
        configuration.instance.setUserId(userId);
    }

     /**
     * 保存玩家数据
     */
    savePlayerInfoToLocalCache() {
        configuration.instance.setConfigData(constant.LOCAL_CACHE.PLAYER, JSON.stringify(this.playerInfo));
    }

    /**
     * 当数据同步完毕，即被覆盖的情况下，需要将数据写入到本地缓存，以免数据丢失
     */
    saveAll() {
        configuration.instance.setConfigDataWithoutSave(constant.LOCAL_CACHE.PLAYER, JSON.stringify(this.playerInfo)); 
    }

     /**
     * 更新用户信息
     * 例如钻石，金币，道具
     * @param {String} key
     * @param {Number} value
     */
    updatePlayerInfo(key:string, value:any){
        let isChange = false;
        if (this.playerInfo.hasOwnProperty(key)) {
            if (typeof value === 'number'){
                isChange = true;
                this.playerInfo[key] += value;
                if(this.playerInfo[key] < 0){
                    this.playerInfo[key] = 0;
                }
            } else if (typeof value === 'boolean' || typeof value === 'string'){
                isChange = true;
                this.playerInfo[key] = value;
            }
        }

        if (isChange) {
            //有修改就保存到localcache
        }
    }

}
