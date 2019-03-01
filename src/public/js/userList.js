jQuery(function ($) {
    // layui  JavaScript代码区域
    layui.use('element', function () {
        var element = layui.element;
    });
    //添加用户按钮
    let $addUserBtn = $(".addUserBtn");
    $addUserBtn.click(function () {
        location.href = '../html/addUser.html'
    })
    let $tbody = $("tbody");
    //全选删除按钮
    let $allDelBtn = $(".allDelBtn");
    //渲染用户列表

    function userShow(res) {
        $.each(res, function (idx, item) {
            let date = time(item.reqTime * 1)
            let times = `${date.year}-${date.month}-${date.day}`;
            console.log(times)
            let html = `
            <tr>
                <td class="td1"><i class="layui-icon"></i></td>
                <td class="td2">${idx+1}</td>
                <td class="td3">${item.username}</td>
                <td class="td4">${item.nickname}</td>
                <td class="td5">${item.gander}</td>
                <td class="td6">${item.city}</td>
                <td class="td7">${item.job}</td>
                <td class="td8">${item.birthday}</td>
                <td class="td9">${item.tel}</td>
                <td class="td10">${times}</td>
                <td class="td11">
                    <div class="layui-btn-group">
                        <button class="layui-btn layui-btn-sm changeMsg">
                            <i class="layui-icon"></i>
                        </button>
                    </div>
                    <div class="layui-btn-group">
                        <button class="layui-btn layui-btn-primary layui-btn-sm delUser">
                            <i class="layui-icon">&#xe640;</i>
                        </button>
                    </div>
                </td>
            </tr>
            `
            $tbody.append(html)
        })
    }
    //账户信息请求

    function userAjax(data) {
        return new Promise((resolve, reject) => {
            $.get('../api/userList/find', data, function (res) {
                console.log(res)
                if (res.code) {
                    resolve(res)
                    userShow(res.data);
                }
            }, 'json')
        })
    }
    // userAjax({
    //     "jurisdiction": 'common'
    // })
    //渲染完成后执行
    (async () => {
        await userAjax({
            "jurisdiction": 'common'
        })
        ckeckBtn()
        // userShow(res.data)
    })()

    //check按钮
    function ckeckBtn(){
        var $allBtn = $('.allBtn');
        var $check = $('tbody .td1 i');
        $check.click(function(){
            $(this).toggleClass('layui-icon-ok check');
            var checkLen = $check.filter('.check').length;
           checkLen==$check.length?$allBtn.addClass('layui-icon-ok'):$allBtn.removeClass('layui-icon-ok');
            
        })
        $allBtn.click(function(){
            $allBtn.hasClass('layui-icon-ok')?$check.addClass('layui-icon-ok check'):$check.removeClass('layui-icon-ok check');
        })
        
    }

})