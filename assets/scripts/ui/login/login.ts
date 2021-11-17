import { clientEvent } from "../../framework/clientEvent";
import { playerData } from "../../data/playerData";
import { gameLogic } from "../../logic/gameLogic";
import { configuration } from "../../framework/configuration";
import { audioManager } from "../../framework/audioManager";
import { constant } from "../../framework/constant";
import { uiManager } from "../../framework/uiManager";
const {ccclass, property} = cc._decorator;

@ccclass
export default class login extends cc.Component {

    @property(cc.Label)
    lbl: cc.Label = null; 

    uid:string;
    start () {


        //普通用户登录
        playerData.instance.loadGlobalCache();
        if (!playerData.instance.userId) {
            //需要创建个账号
            this.uid = configuration.generateGuestAccount();
        } else {
            this.uid = playerData.instance.userId;
        }

        //
       
    }
    onEnable () {
        clientEvent.on('loginSuccess', this.loginSuccessHandler.bind(this), this);
        
    }

    onDisable () {
        clientEvent.off('loginSuccess', this.loginSuccessHandler.bind(this), this);
        
    }

    loginSuccessHandler(){
        this.lbl.string = this.uid;

     
    }

    clickBtn(){
        console.log("-------------->");
        audioManager.instance.playSound(constant.AUDIO_SOUND.CLICK)
        audioManager.instance.closeMusic()
       gameLogic.afterLogin();
    }
}
