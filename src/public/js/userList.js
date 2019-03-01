jQuery(function ($) {
    // layui  JavaScript代码区域
    layui.use('element', function () {
        var element = layui.element;
    });

    let $tbody = $("tbody");

    //渲染用户列表

    function userShow(res) {
        $.each(res, function (idx, item) {
            let date = time(item.reqTime * 1)
            let times = `${date.year}-${date.month}-${date.day}`;
            console.log(times)
            let html = `
            <tr>
                <td class="td1"><i class="layui-icon"></i></td>
                <td class="td2" data-id="${item._id}">${idx+1}</td>
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
    //删除账号请求
    function delUser($checked) {
        /**
         * @删除单个or多个账户请求
         * 1.获取全部勾选的账户
         * 2.遍历元素，获取对应的账户名
         * 3.把用户名推入空数组
         * 4.把数组转字符串
         * 5.把字符串作为参数发起请求
         * 6.请求成功后删除该行元素
         * 7.删除后要对编号重新排序
         *   7.1获取所有tbody里的.td2元素
         *   7.2遍历.td2元素的值为索引+1
         */
        var nameArr = [];
        $.each($checked, function (idx, item) {
            var uname = $(item).closest('tr').find('.td3').html()
            nameArr.push(uname)
        })
        var data = {
            "usernames": nameArr.join()
        }
        $.post('../api/userList/delAll', data, function (res) {
            if (res.code) {
                $checked.closest('tr').remove();
                let $td2 = $("tbody tr .td2");
                $.each($td2, function (idx, item) {
                    $(item).html(idx + 1)
                })
            }
        }, 'json')
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

    //选择按钮
    function ckeckBtn() {
        var $allBtn = $('.allBtn ');
        var $check = $('tbody .td1 i');
        var $addUserBtn = $('.addUserBtn');
        var $allDelBtn = $('.allDelBtn');
        var $delUser = $('.delUser');
        var $changeMsg = $(".changeMsg");
        //单选按钮
        $check.click(function () {
            $(this).toggleClass('layui-icon-ok check');
            var checkLen = $check.filter('.check').length;
            checkLen == $check.length ? $allBtn.addClass('layui-icon-ok') : $allBtn.removeClass('layui-icon-ok');

        })
        //全选按钮
        $allBtn.click(function () {
            $(this).toggleClass('layui-icon-ok');
            $allBtn.hasClass('layui-icon-ok') ? $check.addClass('layui-icon-ok check') : $check.removeClass('layui-icon-ok check');
        })
        //添加按钮
        $addUserBtn.click(function () {
            location.href = '../html/addUser.html'
        })
        //多选删除按钮
        $allDelBtn.click(function () {
            var $checked = $check.filter('.check')
            delUser($checked)
        })
        //单选删除按钮
        $delUser.click(function () {
            delUser($(this))
        })
        //修改用户信息按钮
        $changeMsg.click(function () {
            var id = $(this).closest('tr').find('.td2').attr("data-id");
            location.href = `addUser.html?id=${id}`
        })
    }


})