document.addEventListener("DOMContentLoaded", function () {
    //page=1&qty=10&sort=_id&desc=1
    userShow()

    //点击排序
    $("thead").on("click", "img", e => {
        var e = event || window.event;
        if ($(e.target).hasClass("sheng")) {
            removePriceActive()
            $(e.target).prop("src", "../img/jiantou1.png")
            Cookie.setCookie("sort", $(e.target).parent().attr("data-type"))
            Cookie.setCookie("desc", 1)
            init()
            // console.log("已执行上")
        }
        if ($(e.target).hasClass("jiang")) {
            removePriceActive()
            $(e.target).prop("src", "../img/jiantou1.png")
            Cookie.setCookie("sort", $(e.target).parent().attr("data-type"))
            Cookie.setCookie("desc", "-1")
            init()
            // console.log("已执行下")
        }
    })

    //封装清除排序选项高亮
    function removePriceActive() {
        // console.log(111)

        for (var a = 0; a < $(".img_sort").length; a++) {
            // console.log(a)
            $(".img_sort").eq(a).prop("src", "../img/jiantou.png")
            // console.log($(".img_sort").eq(a))
        }
        // console.log($(".img_sort").length)
    }

    //封装刷新时保持排序图标高亮
    activeIcon()

    function activeIcon() {
        //Cookie.getCookie("sort")
        //Cookie.getCookie("desc")
        for (var a = 0; a < $("thead>tr>th").length; a++) {
            if ($("thead>tr>th").eq(a).attr("data-type") == Cookie.getCookie("sort")) {
                if (Cookie.getCookie("desc") == 1) {
                    $("thead>tr>th").eq(a).children().eq(0).prop("src", "../img/jiantou1.png");
                } else if (Cookie.getCookie("desc") == -1) {
                    $("thead>tr>th").eq(a).children().eq(1).prop("src", "../img/jiantou1.png");
                }
            }


        }
    }

    //点击单选
    $(".layui-body").on("click", function (e) {
        var e = event || window.event;
        if ($(e.target).hasClass("one")) {

            if ($(e.target).parent().hasClass("layui-form-checked")) {

                $(e.target).parent().removeClass("layui-form-checked")
            } else {

                $(e.target).parent().addClass("layui-form-checked")
            }

            if (ifAllcheck()) {

                $(".all").parent().addClass("layui-form-checked")
            } else {
                $(".all").parent().removeClass("layui-form-checked")

            }

        }
    })

    //点击全选
    $(".layui-body").on("click", $(".all"), function (e) {
        var e = event || window.event;
        if ($(e.target).hasClass("all")) {

            if ($(e.target).parent().hasClass("layui-form-checked")) {

                $(e.target).parent().removeClass("layui-form-checked")
                ifcheck(false)
            } else {

                $(e.target).parent().addClass("layui-form-checked")
                ifcheck(true)

            }
        }
    })


    //封装判断是否所有单选都被勾上
    function ifAllcheck() {
        var oneArr = [...document.querySelectorAll(".one")];
        for (var a = 0; a < oneArr.length; a++) {
            // console.log([...oneArr[a].parentElement.classList].includes("layui-form-checked"))
            if ([...oneArr[a].parentElement.classList].includes("layui-form-checked") == false) {
                return false
            }
        }
        return true
    }

    //封装点击全选时改变所有单选的状态
    function ifcheck(boolean) {
        var oneArr = [...document.querySelectorAll(".one")]
        // console.log()
        for (var a = 0; a < oneArr.length; a++) {
            // $(oneArr[a].parentElement).addClass("layui-form-checked")
            if (boolean) {
                $(oneArr[a].parentElement).addClass("layui-form-checked")
                //console.log(oneArr[a].paremtElement) //.addClass("layui-form-checked")
                //console.log(111)
            } else {
                $(oneArr[a].parentElement).removeClass("layui-form-checked")
            }
        }

    }

    //头部提功能
    $(".top").on("click", function (e) {
        var e = event || window.event;

        // 点击添加
        if ($(e.target).hasClass("addAll")) {
            location.href = `../html/addclassify.html`
        }

        //点击删除所有
        if ($(e.target).hasClass("deteleAll")) {

            let arr = getDeleteArr();
            let _id = JSON.stringify(arr)
            console.log(_id)
            if (arr.length > 0) {
                if (confirm("是否删除所选商品信息")) {
                    $.ajax({
                        type: "get",
                        url: `/api/classifyList/cancelMany`,
                        data: `_id=${_id}`,
                        success: (data) => {
                            if (data.code == 1) {
                                alert("删除成功")
                                $(".all").parent().removeClass("layui-form-checked");
                                init();
                            } else {
                                alert("删除失败")
                            }
                        }
                    })
                }
            } else {
                alert("请选择需要删除的数据");
            }
        }

    })

    // 封装获取所有被勾选的行
    function getDeleteArr() {
        var arr = [];
        for (var a = 0; a < document.querySelectorAll("tbody>tr>td>div").length; a++) {

            if ($(document.querySelectorAll("tbody>tr>td>div")[a]).hasClass("layui-form-checked")) {

                arr.push($(document.querySelectorAll("tbody>tr>td>div")[a]).attr("data-id"))
            }
        }
        return arr
    }

    //$(e.target).parent().parent().attr("data-id")
    $("tbody").on("click", (e) => {
        var e = event || window.event;

        // 点击编辑
        if ($(e.target).hasClass("compile")) {
            location.href = `../html/addclassify.html?_id=${$(e.target).parent().parent().attr("data-id")}`
        }

        //点击单个删除
        if ($(e.target).hasClass("cancel")) {
            let _id = $(e.target).parent().parent().attr("data-id");
            if (confirm("是否删除该条商品信息")) {
                // ifValue()
                $.ajax({
                    type: "get",
                    url: `/api/classifyList/cancel`,
                    data: `_id=${_id}`,
                    success: (data) => {
                        if (data.code == 1) {
                            alert("删除成功")
                            init();
                        } else {
                            alert("删除失败")
                        }
                    }
                })
            }

        }
    })

    //封装内容数据渲染,传入数组
    function render(arr) {
        return arr.map((item, index) => {
            return (
                `<tr data-id="${item._id}">
                    <td style="text-align:center">
                        <div class="layui-unselect layui-form-checkbox " lay-skin="primary" data-id="${item._id}">
                            <i class="layui-icon layui-icon-ok one"></i>
                        </div>
                    </td>
                    <td style="text-align:center">${index+1}</td>
                    <td style="text-align:center">${item.classify}</td>
                    <td style="text-align:center">${item.time}</td>
                    <td data-id="${item._id}" style="text-align:center">
                        <button class="layui-btn layui-btn-sm">
                            <i class="layui-icon compile"></i>
                        </button>
                        <button class="layui-btn layui-btn-primary layui-btn-sm ">
                                <i class="layui-icon cancel"></i>
                        </button>
                        
                    </td>
                </tr>`
            )
        }).join(",")
    }

    // //页面初始化
    function init() {
        var str = `sort=${Cookie.getCookie("sort")}&desc=${Cookie.getCookie("desc")}`
        // console.log(str)
        $.ajax({
            type: "get",
            //url: `/api/list/page=${page}&qty=${qty}&sort=${sort}&desc=${desc}`,
            url: `/api/classifyList`,
            data: str,
            success: function (data) {
                // console.log(Math.ceil(data.allLength / data.currLength))
                // console.log($(".page"))
                $("#bit").val(Cookie.getCookie("qty"))
                $("tbody").html(render(data.data))
            }
        });
    }
    init()





})