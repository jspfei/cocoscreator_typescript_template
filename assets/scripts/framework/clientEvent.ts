 
import { oneToMultiListener } from "./oneToMultiListener";
const {ccclass, property} = cc._decorator;

@ccclass
export  class clientEvent extends oneToMultiListener {

    static handlers = {};
}
