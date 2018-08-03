(function(){

    //二级获取数据渲染三级导航
    var showThreenavBytwoid = function(id,sel,stringtem){
        var req = {
            method: 'GET',
            url:`meta/category/${id}/class`,
        }
        var tem = ''
        var c = e(sel)
        c.innerHTML = stringtem


        ajaxPromise(req)
        .then(function(r){
            log(r)
            var data = r.data
            log(c)
            for(let a of data){
                let ddtem = `<a href="/form.html?id=${a.id}&name=${a.name}"><dd class='nav-dd' data-id=${a.id}>${a.name}</dd></a>`
                tem += ddtem
            }
            appendHtml(c,tem)
        })
    }



    if(location.search){
        let queryObj = quertstringToObj(location.search.split('?')[1])
        log(queryObj)
        let name = queryObj.name
        let id = queryObj.id
        if(id === '2'){
            showThreenavBytwoid(10,'.nav-container-rsgl',`<dt data-id='10'>人事管理</dt>`)
        }
        removeClassAllSel('.nav-container','show')
        e(`.nav-container-${name}`).classList.add('show')
        
    } else {
        e('#nav-li-sy').classList.add('show')
    }
    

})()











