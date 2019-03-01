jQuery(function ($) {

    let $username = $(".username");
    let $nickname = $(".nickname");
    let $userpw = $(".userpw");
    let $tel = $(".tel");
    let $gander = $(".gander");
    let $shengri = $(".shengri");
    let $zhiye = $(".zhiye");
    let $city = $(".city");
    let $youxiang = $(".youxiang");
    let $beizhu = $(".beizhu");
    let $btn = $(".btn");



    //获取id,判断是否有id传入
    var _id = location.search.slice(1).split('=')[1];
    if (_id) {
        (async () => {
            let res = await userAjax({
                _id
            })
            msgShow(res.data[0])
            //提交按钮
            $btn.click(function () {
                let $tipsGander = $(".tipsGander");
                var _gander = $gander.find(`.layui-anim dd`).filter('.layui-this').html();
                if (_gander == '男' || _gander == '女') {
                    $tipsGander.html('')
                } else {
                    $tipsGander.html('请选择性别').css('color', 'red')
                    return false
                }
                submitMsg('update')
            })
        })()
    } else {
        //JavaScript代码区域

        layui.use('element', function () {
            var element = layui.element;

        });
        layui.use('laydate', function () {
            var laydate = layui.laydate;

            //执行一个laydate实例
            laydate.render({
                elem: '#test1' //指定元素
            });
        });
        layui.use('form', function () {
            var form = layui.form;

            //各种基于事件的操作，下面会有进一步介绍
        });
        //提交按钮
        $btn.click(function () {
            let $tipsGander = $(".tipsGander");
            var _gander = $gander.find(`.layui-anim dd`).filter('.layui-this').html();
            if (_gander == '男' || _gander == '女') {
                $tipsGander.html('')
            } else {
                $tipsGander.html('请选择性别').css('color', 'red')
                return false
            }
            submitMsg('insert')
        })
    }
    //修改用户信息时渲染
    function msgShow(res) {
        $username.val(res.username);
        $nickname.val(res.nickname);
        $userpw.val(res.upw);
        $shengri.val(res.birthday);
        $zhiye.val(res.job);
        $city.val(res.city);
        $youxiang.val(res.email);
        $beizhu.val(res.markdown);
        $tel.val(res.tel);
        $gander.find(`select option:contains(${res.gander})`).prop('selected', 'selected')
        //JavaScript代码区域

        layui.use('element', function () {
            var element = layui.element;

        });
        layui.use('laydate', function () {
            var laydate = layui.laydate;

            //执行一个laydate实例
            laydate.render({
                elem: '#test1' //指定元素
            });
        });
        layui.use('form', function () {
            var form = layui.form;

            //各种基于事件的操作，下面会有进一步介绍
        });

    }
    //提交用户信息请求
    function submitMsg(req) {
        var data = {
            username: $username.val(),
            nickname: $nickname.val(),
            upw: $userpw.val(),
            birthday: $shengri.val(),
            job: $zhiye.val(),
            city: $city.val(),
            email: $youxiang.val(),
            markdown: $beizhu.val(),
            tel: $tel.val(),
            gander: $gander.find(`.layui-anim dd`).filter('.layui-this').html()
        }
        if (req === "insert") {
            insert(data);
        } else if (req === "update") {
            update(data)
        }

    }
    // 失去焦点判断用户名是否注册
    $username.change(function () {
        var username = $username.val();
        insert({
            username
        });
    })
    //insert请求
    function insert(defaults) {
        var $tips1 = $('.tips1');
        var obj = {
            jurisdiction: 'common',
            photoUrl: '../images/touxiang.jpg',
            reqTime: Date.now()
        }
        var data = Object.assign({}, defaults, obj);
        $.post('../api/userList/add', data, function (res) {
            if (!res.code) {
                $tips1.html(res.msg).css('color', 'red')
            } else if (res.code == 1) {
                location.href = 'userList.html';
            } else if (res.code == 2) {
                $tips1.html(res.msg).css('color', 'green')
            }
        }, 'json')
    }
    //update请求
    function update(defaults) {
        var obj = {
            _id
        };
        var data = Object.assign({}, defaults, obj);
        $.post('../api/userList/update', data, function (res) {
            if (res.code) {
                location.href = 'userList.html';
            }
        }, 'json')
    }

})