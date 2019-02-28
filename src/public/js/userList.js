jQuery(function ($) {
    // layui  JavaScript代码区域
    layui.use('element', function () {
        var element = layui.element;
    });
    //添加用户按钮
    let $addUserBtn = $(".addUserBtn");
    $addUserBtn.click(function(){
        location.href = '../html/addUser.html'
    })
    //全选删除按钮
    let $allDelBtn = $(".allDelBtn");
    //渲染用户列表
    let $tbody = $("tbody");
    userShow()
    function userShow(){
        $.get('./api/userList/find',data)
    }
    
})