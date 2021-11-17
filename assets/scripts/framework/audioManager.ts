
import { configuration } from "./configuration";
import { resourceUtil } from "./resourceUtil";

export class audioManager {
  private static _instance: audioManager;
  private static _audioSource?: cc.audioEngine;

  static get instance() {
    if (this._instance) {
      return this._instance;
    }

    this._instance = new audioManager();
    this._instance.init()
    return this._instance;
  }

  soundVolume: number = 1;
  bgmAudioID: number = -1;
  bgmVolume: number = 1;
  // init AudioManager in GameRoot.
  init() {
    this.soundVolume = this.getConfiguration(false) ? 1 : 0;
    this.bgmVolume = this.getConfiguration(true) ? 1 : 0;
  }

  getConfiguration(isMusic: boolean) {
    let state;
    if (isMusic) {
      state = configuration.instance.getGlobalData('music');
    } else {
      state = configuration.instance.getGlobalData('sound');
    } 

    return !state || state === 'true' ? true : false;
  }

  /**
   * 播放音乐 
   */
  playMusic(name: string) { 
    //音效一般是多个的，不会只有一个
    let path = 'gamePackage/audio/music/';
    resourceUtil.loadRes(path + name, cc.AudioClip, (err, clip) => {
      if (err) {
        console.error(err)
        return;
      }
      if (this.bgmVolume > 0) {
        this.bgmAudioID = cc.audioEngine.play(clip, true, this.bgmVolume);
      }
    });

  }

  /**
   * 播放音效
   * @param {String} name 音效名称可通过constants.AUDIO_SOUND 获取
   */
  playSound(name: string) {
    //音效一般是多个的，不会只有一个
    let path = 'gamePackage/audio/sound/';

    resourceUtil.loadRes(path + name, cc.AudioClip, (err, clip) => {
      if (err) {
        console.error(err)
        return;
      }
      if (this.soundVolume > 0) {
        cc.audioEngine.play(clip, false, this.soundVolume);
      }
    });

  }

  setMusicVolume(flag: number) {
    if (this.bgmAudioID >= 0) {
      if (flag > 0) {
        cc.audioEngine.resume(this.bgmAudioID);
      }
      else {
        cc.audioEngine.pause(this.bgmAudioID);
      }
    }
    if (this.bgmVolume != flag) {
      this.bgmVolume = flag;
      cc.audioEngine.setVolume(this.bgmAudioID, flag);

    }
  }

  setSoundVolume(flag: number) {
    if (this.soundVolume != flag) {
      this.soundVolume = flag;
    }
  }

  openMusic() {
    this.setMusicVolume(0.8);
    configuration.instance.setGlobalData('music', 'true');
  }

  closeMusic() {
    this.setMusicVolume(0);
    configuration.instance.setGlobalData('music', 'false');
  }

  openSound() {
    this.setSoundVolume(1);
    configuration.instance.setGlobalData('sound', 'true');
  }

  closeSound() {
    this.setSoundVolume(0);
    configuration.instance.setGlobalData('sound', 'false');
  }
}
