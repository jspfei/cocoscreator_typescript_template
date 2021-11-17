import { clientEvent } from "../framework/clientEvent";
const {ccclass, property} = cc._decorator;

@ccclass
export  class gameLogic {
    public static afterLogin (){
        //用户签到
        //玩家gold 添加
        clientEvent.dispatchEvent("loginSuccess")
    }
}
