
export class httpMangaer {
  public static  httpGet(url,params) {
    return new Promise((resolve,reject)=>{
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.onreadystatechange = function () {
            cc.log('xhr.readyState='+xhr.readyState+'  xhr.status='+xhr.status);
            if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)) {
                var respone = xhr.responseText;
                resolve(respone);
            }
        };
        let value = ""
        for (let key in params){
          value = value + key+"="+params[key]+"&"
        }
        let url_temp = url+"?"+value
        xhr.open("GET", url, true);
       

        // note: In Internet Explorer, the timeout property may be set only after calling the open()
        // method and before calling the send() method.
        xhr.timeout = 5000;// 5 seconds for timeout
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");  
        xhr.send();
    })
  }

public static  httpPost(url,params) {
    return new Promise((resolve,reject)=>{
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.onreadystatechange = function () {
            cc.log('xhr.readyState='+xhr.readyState+'  xhr.status='+xhr.status);
            if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)) {
                var respone = xhr.responseText;
                resolve(respone);
            }
        };
      
        xhr.open("POST", url, true);
       

        // note: In Internet Explorer, the timeout property may be set only after calling the open()
        // method and before calling the send() method.
        xhr.timeout = 5000;// 5 seconds for timeout
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");  
        xhr.send(params);
    })
  }
}