import { AssetType ,LoadCompleteCallback} from "./configuration";
export class resourceUtil{
  public static loadRes(url: string, type: any | null, cb?:  any) {
    if(type){
      cc.resources.load(url, type, (err, res) => {
            if (err) {
               
                if (cb) {
                    cb(err, res);
                }

                return;
            }

            if (cb) {
                cb(err, res);
            }
        });
    } else {
      cc.resources.load(url, (err, res) => {
            if (err) {
                
                if (cb) {
                    cb(err, res );
                }

                return;
            }

            if (cb) {
                cb(err, res  );
            }
        });
    }
}
public static getUIPrefabRes(prefabPath: string, cb?: (err: Error | null, asset?: cc.Prefab) => void) {
  this.loadRes("prefab/ui/" + prefabPath, cc.Prefab, cb);
}

  public static createUI(path: string, cb?: (err: Error | null, node?:cc.Node) => void, parent?:cc.Node | null){
      this.getUIPrefabRes(path, (err: Error |null, prefab?: cc.Prefab) =>{
         if (err) return;
         const node = cc.instantiate(prefab);
         node.setPosition(0,0,0);
         if (!parent) {
            parent = cc.find("Canvas")
         }
         parent!.addChild(node);
         if (cb){
            cb (null,node)
         }
      })
  }
}