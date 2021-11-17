
import { clientEvent } from "../../framework/clientEvent";
import { uiManager } from "../../framework/uiManager";

const {ccclass, property} = cc._decorator;

@ccclass
export   class fightManager extends cc.Component {

    start(){
        clientEvent.dispatchEvent('startGame')
    }

    onEnable(){
        clientEvent.on('startGame',this.startGame, this)
    }

    onDisable(){
        clientEvent.off('startGame',this.startGame, this)
    }

    startGame(){
        this.showLogin();
    }

    showLogin () {
        //一开始加载主界面
        uiManager.instance.showDialog('login/login');
    }

    hideLogin () {
        uiManager.instance.hideDialog('login/login');
    }
}
