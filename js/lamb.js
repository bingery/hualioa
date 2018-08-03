var log = function() {
    console.log.apply(console, arguments)
}
var e = function(selector) {
    return document.querySelector(selector)
}
var es = function(selector) {
    return document.querySelectorAll(selector)
}
var bindEvent = function(element, eventName, callback) {
    element.addEventListener(eventName, callback)
}
var bindAll = function(selector, eventName, callback) {
    var elements = document.querySelectorAll(selector)
    for(var i = 0; i < elements.length; i++) {
        var e = elements[i]
        bindEvent(e, eventName, callback)
    }
}
var toggleClass = function(element, className) {
    if (element.classList.contains(className)) {
        element.classList.remove(className)
    } else {
        element.classList.add(className)
    }
}
var removeClassAll = function(element, className) {
    var selector = '.' + className
    var elements = element.querySelectorAll(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        e.classList.remove(className)
    }
}
var removeClassAllSel = function(Sel, className) {
    var elements = es(Sel)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        e.classList.remove(className)
    }
}
var find = function(element, selector) {
    return element.querySelector(selector)
}
var closestClass = function(element, className){
    var e = element
    while (e != document) {
        if (e.classList.contains(className)) {
            return e
        } else {
            e = e.parentElement
        }
    }
    return null
}
var closestTag = function(element, TagName){
    var e = element.parentElement
    while (e != null) {
        if (e.tagName === TagName) {
            return e
        } else {
            e = e.parentElement
        }
    }
    return null
}
var appendHtml = function(element, html) {
	element.insertAdjacentHTML('beforeend', html)
}

// ajax api
var ajax = function(request) {
    var sev_url = 'http://39.105.81.193:13000'
    var r = new XMLHttpRequest()
    r.open(request.method, sev_url+request.url, true)
    if (request.contentType !== undefined) {
        r.setRequestHeader('Content-Type', request.contentType)
    }
    if(request.token){
        xmlHttp.setRequestHeader('Authorization',request.token);
    }
    r.onreadystatechange = function(event) {
        if(r.readyState === 4) {
            var response = JSON.parse(r.response)
            request.callback(response)
        } else if(r.readyState == 4 && r.status != 200){
            request.error(r)
        }
    }
    if (request.method === 'GET') {
        r.send()
    } else {
        r.send(request.data)
    }
}
// var api = function(callback) {
//     var url = 'meta/class/1/fields'
//     // var form = {
//     //     "title": json.title,
//     //     "field": json.field,
//     //     "tag":json.tag,
//     //     "belong_to": json.belong_to,

//     // }
//     // let formData = new FormData()
//     // formData.append('user', 'zhang')
//     // var data = JSON.stringify(form)
//     var request = {
//         method: 'GET',
//         url: url,
//         // data: data,
//         contentType: 'application/json',
//         callback: callback,
//         error:function(r){
//             console.error(r)
//         }
//     }
//     ajax(request)
// }
var ajaxPromise = function(request){
	return new Promise(function(resolve,reject){
        var sev_url = 'http://39.105.81.193:13000/'
        // var sev_url = 'http://192.168.4.156:9000/'

        var r = new XMLHttpRequest()
        r.open(request.method, sev_url+request.url, true)
        if (request.contentType !== undefined) {
            r.setRequestHeader('Content-Type', request.contentType)
        }
        if(request.token){
            xmlHttp.setRequestHeader('Authorization',request.token);
        }
        r.onreadystatechange = function(event) {
            if(r.readyState === 4) {
                var response = JSON.parse(r.response)
                resolve(response)
            } else if(r.readyState == 4 && r.status != 200){
                reject(r)
            }
        }
        if (request.method === 'GET') {
            r.send()
        } else {
            r.send(request.data)
        }
	})
}

var reqsToProms = function(){
    var arr = []
    for(var i = 0;i < arguments.length;i++){
        arr.push(arguments[i])
    }
    return arr.map(function(item){
        return ajaxPromise(item)
    })
}

// var req1 = {
//     method: 'GET',
//     url: 'meta/class/1/fields',
// }
// let formData = new FormData()
// formData.append('item.MetaClassID', Number(e('.form-container').dataset.class_id))
// formData.append('item.Values', JSON.stringify(values))
// var req2 = {
//     method: 'POST',
//     url: 'meta/item',
//     data: formData,
// }
// var promises = reqsToProms(req1,req2)
// Promise.all(promises).then(function(r){
//     log(r)
// })

   




// 时间戳处理
var timestampToDate = function(time,string = '-'){
    if(String(time).length === 10 || String(time).length === 9){
        time = time * 1000
    }
    var year = new Date(time).getFullYear()
    var month = new Date(time).getMonth() + 1
    var date = new Date(time).getDate()
    if(month<10){
        month = '0' + month
    }
    if(date<10){
        date = '0' + date
    }
    return year + string + month + string + date
}
var timestampToTime = function(time,string = ':'){
    if(String(time).length === 10){
        time = time * 1000
    }
    var hour = new Date(time).getHours()
    var minute = new Date(time).getMinutes()
    if(hour<10){
        hour = '0' + hour
    }
    if(minute<10){
        minute = '0' + minute
    }
    return hour + string + minute
}

// //手机端双击
// var times
// bindAll('','click',function(){
//     times++
//     setTimeout(function () {
//         times = 0;
//     }, 500);
//     if (times > 1) {
//         e('').focus()
//     }
// })

var uuid = function() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";
 
    var uuid = s.join("");
    return uuid;
}

var uploadFile = function(file,name,callback) {
    var dist = "silutest/"
    var id = uuid()
    var name = id + name.replace(/\s/g, "");
    var filePath = dist + name
    var formData = new FormData();
    formData.append('name',name);
    formData.append('key',filePath);
    formData.append('success_action_status',200);
    formData.append('file',file);
    ajaxUpload(formData,callback);
}

var ajaxUpload = function(data, successCallback,errorCallback) {
    var xmlHttp = new XMLHttpRequest()
    var oss_url="http://panoon.oss-cn-shanghai.aliyuncs.com"
    xmlHttp.open('post', oss_url, true)
    xmlHttp.onreadystatechange = function() {
        if(xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            if(successCallback){
                successCallback(oss_url+"/"+data.get("key"));
            }
        }else if(xmlHttp.readyState == 4 && xmlHttp.status != 200){
            if(errorCallback){
                errorCallback(xmlHttp);
            }
        }
    }

    // xmlHttp.upload.onprogress = function(evt){
    //     var loaded = evt.loaded;
    //     var tot = evt.total;
    //     var per = Math.floor(100*loaded/tot);  //已经上传的百分比
    // }
    xmlHttp.send(data)
}

var cleanForm = function(containerDom,removeSelector){
    var inputs = containerDom.querySelectorAll('input')
    var textareas = containerDom.querySelectorAll('textarea')
    var classdoms = containerDom.querySelectorAll(removeSelector)
    for(var i = 0;i < inputs.length;i++){
        inputs[i].value = ''
    }
    for(var i = 0;i < textareas.length;i++){
        textareas[i].value = ''
    }
    for(var i = 0;i < classdoms.length;i++){
        classdoms[i].remove()
    }
}

var quertstringToObj = function(quertstring){
    var arr = quertstring.split('&')
    var obj = {}
    for(let a of arr){
        let r = a.split('=')
        let k = r[0],
            v = r[1]
        obj[k] = v
    }
    return obj
}

