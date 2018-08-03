(function(){

        // 数据生成单个控件
        var domByInputdata = function(json){
            var data = json.input_data
            var titlespan,rightcontrol

            if(data.is_required){
                titlespan = 
                `
                <span class="form-li-title"><span class="form-li-required">*</span>${data.label}</span>

                `
            } else {
                titlespan = 
                `
                <span class="form-li-title">${data.label}</span>

                `
            }

            if(data.input_type === 'combocheck'){
                var options = ''
                for(var i = 0;i < data.enumerated_source.length;i++){
                    var option = `<li class="form-select-li">${data.enumerated_source[i].label}</li>`
                    options += option
                }
                rightcontrol =
                `
                <div class="form-select-container clearfix" name=${data.name}>
                    <div class="form-select-member">
                    </div>
                    <div class="form-select-button">+</div>
                    <ul class="form-select-ul">
                    ${options}
                    </ul>
                </div>
                `
            }
            else if(data.input_type === 'combo'){
                var options = ''
                for(var i = 0;i < data.enumerated_source.length;i++){
                    var option
                    if(data.enumerated_source[i].checked){
                        option = `<option value="${data.enumerated_source[i].label}" selected>${data.enumerated_source[i].label}</option>`
                    } else {
                        option = `<option value="${data.enumerated_source[i].label}">${data.enumerated_source[i].label}</option>`
                    }
                    options += option
                }
                rightcontrol = 
                `
                <select name=${data.name} class="form-select">
                    ${options}
                </select>
                `
                // <option selected="selected" disabled="disabled"  style='display: none' value=''></option>
                
            }
            else if(data.input_type === 'text'){
                if(data.field_type === 'date'){
                    rightcontrol = 
                    `
                    <input type="date" class="form-input" name=${data.name}>
            
                    `
                }
                else if(data.field_type === 'float'){
                    rightcontrol = 
                    `
                    <input type="number" class="form-input" name=${data.name}>
            
                    `
                }
                else if(data.field_type === 'string'){
                    rightcontrol = 
                    `
                    <input type="text" class="form-input" name=${data.name}>
            
                    `
                }
                
                
            }
            else if(data.input_type === 'datetime'){
                rightcontrol = 
                `
                <input type="datetime-local" class="form-input" name=${data.name}>

                `
            }
            else if(data.input_type === 'number'){
                rightcontrol = 
                `
                <input type="number" class="form-input" name=${data.name}>

                `
            }
            else if(data.input_type === 'file'){
                rightcontrol = 
                `
                <input type="file" class="form-input" name=${data.name} id=file-${data.name} style='display: none' multiple>
                <div class="form-file-container">
                    <label for=file-${data.name} class="label-choice">选择</label>
                    <div class="form-file-span">
                        <div class="file-member file-member-1">
                            <span>没有文件...没有文件...没有文件...</span>
                        </div>
                    </div>
                </div>
                `
            }
            else if(data.input_type === 'textarea'){
                rightcontrol = 
                `
                <textarea class="form-textarea" name=${data.name}></textarea>

                `
            }
            
            var tem = 
            `
            <li class="form-li-container clearfix">
                    ${titlespan}
                    ${rightcontrol}
            </li>
            `
            return tem
        }
        // 记录数组生成模板记录
        var itemarrayToTem = function(array,i,id){
            var top = `<li class="clearfix" data-id=${id}>`
            var bottom = '<div class="menu"><span class="content-value-edit">编辑</span><span class="content-value-delete">删除</span></div></li>'
            var value = `<div class="value">${i}</div>`
            for(let i = 0;i < array.length;i++){
                if(array[i].value){
                    var tem = `<div class="value" title=${array[i].value}>${array[i].value}</div>`
                    value += tem
                } else{
                    var tem = `<div class="value">暂无</div>`
                    value += tem
                }
                
            }
            return top + value + bottom
            
        }
        // 编辑记录数组赋值给表单
        var itemarrayShowFields = function(array){
            for(let i = 0;i < array.length;i++){
                if(!(array[i].value instanceof Array)){
                    e(`[name="${array[i].field_name}"]`).value = array[i].value
                }else if(array[i].value instanceof Array){
                    var tem = ''
                    for(let j = 0;j < array[i].value.length;j++){
                        spantem = 
                        `
                        <div class="member"><span>${array[i].value[j]}</span><span class="form-select-off">×</span></div>

                        `
                        tem += spantem
                    }
                    e('.form-select-member').innerHTML = ''
                    appendHtml(e('.form-select-member'),tem)
                }
                
            }
        }
        //生成自定义表单页面
        var showpageByDatas = function(dataArray,headArray,itemArray){
            e('.form-container').dataset.class_id = dataArray[0].class_id
            var tem = '<ul class="form-ul-container clearfix">'
            var contenttem = '<div class="content-container-menu clearfix"><div class="content-container-add button">添加</div></div><div class="content-header-container clearfix"><div class="content-header">序号</div>'
            var itemtem = `<ul class="content-value-container">`
            for(let i = 0;i < dataArray.length;i++){
                let tems = domByInputdata(dataArray[i])
                tem += tems
            }
            for(let i = 0;i < headArray.length;i++){

                let tems = 
                `
                <div class="content-header">${headArray[i].label}</div>
                `
                contenttem += tems
            }
            for(let i = 0;i < itemArray.length;i++){

                let tems = itemarrayToTem(itemArray[i].data,i,itemArray[i].id)
                itemtem += tems
            }
            tem = tem + '<li class="form-li-container"><div class="form-button form-button-save">保存</div></li><li class="form-li-container"><div class="form-button form-button-cancel">取消</div></li></ul>'
            contenttem = contenttem + '</div>'
            itemtem = itemtem + '</ul>'
            appendHtml(e('.form-container'),tem)
            appendHtml(e('.content-container'),contenttem)
            appendHtml(e('.content-container'),itemtem)

        }
        //表单数据by控件doms
        var getjsonByDoms = function(doms){
            var data = {}
            for(let a of doms){
                var k
                var v
                if(a.type === 'file' && a.tagName === 'INPUT'){
                    k = a.name
                    let c = closestClass(a,'form-li-container')
                    let ms = c.querySelectorAll('.file-member')
                    let arr = []
                    for(let m of ms){
                        let d = m.dataset.value
                        arr.push(d)
                    }
                    v = arr
                }else if(a.classList.contains('form-select-container')){
                    k = a.getAttribute('name')
                    var ms = a.querySelectorAll('.member')
                    var arr = []
                    for(var m of ms){
                        var d = m.querySelectorAll('span')[0].innerText
                        arr.push(d)
                        v = arr
                    }
                }
                else{
                    k = a.name
                    v = a.value
                }
                data[k] = v
            }
            return data
        }

        //添加清空表单值
        var initFromInputs = function(doms){
            var time = timestampToDate(new Date().getTime()) + 'T' + timestampToTime(new Date().getTime())
            
            log(time)
            for(let i = 0;i < doms.length;i++){
                if(doms[i].classList.contains('form-select-container')){
                    doms[i].querySelector('.form-select-member').innerHTML = ''
                } else if(doms[i].type === 'datetime-local'){
                    doms[i].value = time
                } 
                else {
                    doms[i].value = ''
                }
            }
        }



        bindAll('#right-content','click',function(event){
            var t = event.target
            var rc = e('#right-content')
            var fc = rc.querySelector('.form-container')
            var cc = rc.querySelector('.content-container')

            //复选下拉+按钮呈现选项
            if(t.classList.contains('form-select-button')){
                let li = closestClass(t,'form-select-container')
                let ul = find(li,'ul')
                toggleClass(ul,'show')
            }
            //复选下拉选项删除
            if(t.classList.contains('form-select-off')){
                let member = closestClass(t,'member')
                member.remove()
            }
            //复选下拉选项添加
            if(t.classList.contains('form-select-li')){
                let text = t.innerText
                let c = closestClass(t,'form-li-container')
                let mc = find(c,'.form-select-member')
                let tem = 
                `
                <div class="member"><span>${text}</span><span class="form-select-off">×</span></div>

                `
                appendHtml(mc,tem)
            }
            // 点击《保存》保存
            if(t.classList.contains('form-button-save') && t.dataset.submit === 'add'){
                let ul = closestClass(t,'form-ul-container')
                let controls = ul.querySelectorAll('[name]')
                let values = getjsonByDoms(controls)
                log(String(values))
                let formData = new FormData()
                formData.append('item.MetaClassID', Number(e('.form-container').dataset.class_id))
                formData.append('item.Values', JSON.stringify(values))
                let req = {
                    method: 'POST',
                    url: 'meta/item',
                    data: formData,
                }
                ajaxPromise(req)
                .then(function(r){
                    log(r)
                    if(r.data === 'ok'){
                        alert('保存成功')
                        location.reload()
                    }
                })
            }
            // 点击《保存》更新
            if(t.classList.contains('form-button-save') && t.dataset.submit === 'update'){
                let ul = closestClass(t,'form-ul-container')
                let controls = ul.querySelectorAll('[name]')
                let values = getjsonByDoms(controls)
                let formData = new FormData()
                formData.append('_method', 'PUT')
                formData.append('item.ID', Number(e('.form-button-save').dataset.itemid))
                formData.append('item.MetaClassID', Number(e('.form-container').dataset.class_id))
                formData.append('item.Values', JSON.stringify(values))
                let req = {
                    method: 'POST',
                    url: 'meta/item',
                    data: formData,
                }
                ajaxPromise(req)
                .then(function(r){
                    log(r)
                    if(r.data === 'ok'){
                        alert('更新成功')
                        location.reload()
                    }
                })
            }
            //上传的文件删除
            if(t.classList.contains('form-file-off')){
                let m = closestClass(t,'file-member')
                m.remove()
            }
            //点击《添加》按钮
            if(t.classList.contains('content-container-add')){
                var doms = fc.querySelectorAll('[name]')
                initFromInputs(doms)
                cc.classList.add('hide')
                fc.classList.add('show')
                e('.form-button-save').dataset.submit = 'add'
            }
            //取消表单添加
            if(t.classList.contains('form-button-cancel')){
                fc.classList.remove('show')
                cc.classList.remove('hide')
            }
            // 删除单个表单记录
            if(t.classList.contains('content-value-delete')){
                let li = closestTag(t,'LI')
                let id = li.dataset.id
                log(id)
                let form = new FormData()
                form.append('_method','DELETE')
                form.append('id',id)
                let url = `meta/item/${id}`
                let req = {
                    method: 'POST',
                    url,
                    data:form
                }
                ajaxPromise(req)
                .then(function(r){
                    log(r)
                    if(r.data === 'ok'){
                        alert('删除成功')
                        li.remove()
                    }
                })
            }
            // 点击按钮《编辑》
            if(t.classList.contains('content-value-edit')){
                let li = closestTag(t,'LI')
                let id = li.dataset.id
                log(id)
                let url = `meta/item/${id}/fields`
                let req = {
                    method: 'GET',
                    url,
                }
                ajaxPromise(req)
                .then(function(r){
                    log('1',r)
                    itemarrayShowFields(r.data)
                    e('.form-button-save').dataset.submit = 'update'
                    e('.form-button-save').dataset.itemid = id
                    cc.classList.add('hide')
                    fc.classList.add('show')

                })
            }
            
        })
        bindAll('#right-content','change',function(event){
            var t = event.target
            //上传文件图片控件返回地址
            if(t.type === 'file' && t.tagName === 'INPUT'&& t.multiple){
                var file = t.files
                var url = 'uploads'
                var form = new FormData()
                // file  files   image   images
                form.append('typ','images')
                for(let a of file){
                    form.append('images',a)
                }
                var request = {
                    method: 'POST',
                    url,
                    data:form
                }
                ajaxPromise(request)
                .then(function(r){
                    log(r)
                    var data = r.data.uri_path
                    var path = r.data.file_path
                    var c = closestClass(t,'form-li-container')
                    var cc = find(c,'.form-file-span')
                    var m1 = find(cc,'.file-member-1')
                    if(m1){
                        m1.remove()
                    }
                    for(let i = 0;i < data.length;i++){
                        var array = data[i].split('/')
                        var name = array[array.length-1]
                        var value = path[i]
                        log(name)
                        var tem = 
                        `
                        <div class="file-member" data-value=${value}>
                            <span title=${name}>${name}</span>
                            <span class="form-file-off">×</span>
                        </div>
                        `
                        appendHtml(cc,tem)
                    }
                })
            }
            // if(t.type === 'file' && t.tagName === 'INPUT'){
            //     var file = t.files[0]
            //     var url = 'uploads'
            //     var form = new FormData()
            //     // file  files   image   images
            //     form.append('typ','file')
            //     form.append('file',file)
            //     var request = {
            //         method: 'POST',
            //         url,
            //         data:form
            //     }
            //     ajaxPromise(request)
            //     .then(function(r){
            //         log(r)
            //         t.dataset.value = r.data.file_path
            //     })
            // }
            
        })

        //左侧导航跳转home
        bindAll('.left-nav-li','click',function(event){
            var t = event.target
            var li = closestClass(t,'left-nav-li')
            var name = li.dataset.name
            log(name)

        })



        var obj = quertstringToObj(decodeURIComponent(location.search.split('?')[1]))
        log(obj)
        var id = obj.id
        var title = obj.name
        e('.form-header').innerText = title

        var req1 = {
            method: 'GET',
            url:`meta/class/${id}/fields`,
        }
        var req2 = {
            method: 'GET',
            url:`meta/item/records/${id}`,
        }

        Promise.all(reqsToProms(req1,req2))
        .then(function(r){
            log(r)
            showpageByDatas(r[0].data,r[1].data.t_head,r[1].data.t_body)
        })


        // var url3 = 'sidebar/tree/list'
        // var req3 = {
        //     method: 'GET',
        //     url:url3,
        // }
        // ajaxPromise(req3)
        // .then(function(r){
        //     log(r)
        // })

        // var url4 = 'meta/category/basic'
        // var req4 = {
        //     method: 'GET',
        //     url:url4,
        // }
        // ajaxPromise(req4)
        // .then(function(r){
        //     log(r)
        // })



})()










