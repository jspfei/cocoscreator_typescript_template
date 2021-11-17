
import { audioManager } from "./framework/audioManager";
import { constant } from "./framework/constant";
const { ccclass, property } = cc._decorator;

@ccclass
export  class App extends cc.Component {

    //项目 test1
    onLoad(){
        audioManager.instance.playMusic(constant.AUDIO_SOUND.BACKGROUND)
    }
    uid: string = ""
    start() {
        
    }

    onEnable(){
       
    }

    // update (dt) {}
}
