import { resourceUtil } from "./resourceUtil";

interface IPanel extends cc.Component {
  show?: Function;
  hide?: Function;
}
export class uiManager {

  dictSharedPanel: { [path: string]: cc.Node } = {};
  dictLoading: { [path: string]: boolean } = {};
  arrPopupDialog: {
    panelPath: string,
    scriptName?: string,
    param: any,
    isShow: boolean
  }[] = [];

  static _instance: uiManager;

  static get instance() {
    if (this._instance) {
      return this._instance;
    }
    this._instance = new uiManager();
    return this._instance;
  }

  /**
    * 显示单例界面
    * @param {String} panelPath
    * @param {Array} args
    * @param {Function} cb 回调函数，创建完毕后回调
    */
  showDialog(panelPath: string, args?: any, cb?: Function) {
    if (this.dictLoading[panelPath]) {
      return;
    }

    let idxSplit = panelPath.lastIndexOf('/');
    let scriptName = panelPath.slice(idxSplit + 1);

    if (!args) {
      args = [];
    }

    if (this.dictSharedPanel.hasOwnProperty(panelPath)) {
      let panel = this.dictSharedPanel[panelPath];
      if (cc.isValid(panel)) {
        panel.parent = cc.find("Canvas");
        panel.active = true;
        let script = panel.getComponent(scriptName) as IPanel;
        if (script.show) {
          script.show.apply(script, args);
        }

        cb && cb(script);
        return;
      }
    }

    this.dictLoading[panelPath] = true;
    resourceUtil.createUI(panelPath, (err, node) => {
      //判断是否有可能在显示前已经被关掉了？
      let isCloseBeforeShow = false;
      if (!this.dictLoading[panelPath]) {
        //已经被关掉
        isCloseBeforeShow = true;
      }

      this.dictLoading[panelPath] = false;
      if (err) {
        console.error(err);
        return;
      }

      this.dictSharedPanel[panelPath] = node!;

      let script = node!.getComponent(scriptName)! as IPanel;
      if (script.show){
         script.show.apply(script, args);
      }
      cb && cb(script);
      if (isCloseBeforeShow){
         this.hideDialog(panelPath)
      }
    })
  }
   /**
     * 隐藏单例界面
     * @param {String} panelPath
     * @param {fn} callback
     */
    hideDialog (panelPath: string, callback?: Function) {
       if (this.dictSharedPanel.hasOwnProperty(panelPath)) {
          let panel = this.dictSharedPanel[panelPath]
          if (panel && cc.isValid(panel) ) {
             panel.parent = null;
             if (callback  && typeof callback === "function") {
                callback();
             }
          }
       } else if (callback && typeof callback ==='function'){
         callback();
       }

       this.dictLoading[panelPath] = false;
    }
}