export interface IUserInfo{
    userId: number;
    nickName: string;
    level: number;
    headImg: string;
}

export class constant {
    public static LOCAL_CACHE = {
        PLAYER: "player",
        DATA_VERSION: "dataVersion",
    }

    //初始车辆
    public static INITIAL_CAR = 1;

    public static AUDIO_SOUND = {
        BACKGROUND: 'background',       //背景音乐

        CLICK:"click",
        CRASH: "crash",             //撞车
        GET_MONEY: "getMoney",      //赚钱
        IN_CAR: "inCar",            //上车
        NEW_ORDER: "newOrder",      //新订单
        CAR_START: "carStart",      //车辆启动
        WIN: "win",                 //胜利
        STOP: "stop",               //刹车
        TOOTING1: "tooting1",        //鸣笛声1
        TOOTING2: "tooting2",         //鸣笛声2
    }
}

