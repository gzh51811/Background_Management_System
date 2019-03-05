document.addEventListener("DOMContentLoaded", function() {
    //page=1&qty=10&sort=_id&desc=1

    if (Cookie.getCookie("page")) {

    } else {
        Cookie.setCookie("page", 1)
        Cookie.setCookie("qty", 10)
        Cookie.setCookie("sort", "time")
        Cookie.setCookie("desc", 1)
    }

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
    // console.log($(".img_sort")[0])


    //点击单选
    $(".layui-body").on("click", function(e) {
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
    $(".layui-body").on("click", $(".all"), function(e) {
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
    $(".top").on("click", function(e) {
        var e = event || window.event;

        // 点击添加
        if ($(e.target).hasClass("addAll")) {
            console.log($(e.target))
        }

        //点击删除所有
        // if ($(e.target).hasClass("deteleAll")) {

        // }

        //点击搜索
        if ($(e.target).hasClass("search")) {
            console.log($(e.target))
        }

    })

    // 封装获取所有被勾选的行
    function getDeleteArr() {
        var arr = [];
        for (var a = 0; a < document.querySelectorAll("tbody>tr>td>div").length; a++) {
            // console.log($(document.querySelectorAll("tbody>tr>td>div")[a]).hasClass("layui-form-checked"))
            if ($(document.querySelectorAll("tbody>tr>td>div")[a]).hasClass("layui-form-checked")) {
                //arr.push($(document.querySelectorAll("tbody>tr>td>div")[a]).attr("data-id"))
            }
            //console.log($([...$("tbody").children()][a]).children().eq(1).children().eq(1).attr("data-id"))
        }
        console.log(arr)
    }

    //$(e.target).parent().parent().attr("data-id")
    $("tbody").on("click", (e) => {
        var e = event || window.event;

        // 点击编辑
        if ($(e.target).hasClass("compile")) {
            console.log($(e.target))
        }

        //点击删除
        if ($(e.target).hasClass("cancel")) {
            let _id = $(e.target).parent().parent().attr("data-id");
            if (confirm("是否删除该条商品信息")) {
                $.ajax({
                    type: "get",
                    url: `api/list/cancel`,
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

        //点击上下架
        if ($(e.target).hasClass("state")) {
            console.log($(e.target))
        }
    })

    //封装内容数据渲染,传入数组
    function render(arr) {
        return arr.map((item, index) => {
            return (
                `<tr data-id="${item._id}">
                    <td>
                        <div class="layui-unselect layui-form-checkbox " lay-skin="primary" data-id="${item._id}">
                            <i class="layui-icon layui-icon-ok one"></i>
                        </div>
                    </td>
                    <td>${index+1}</td>
                    <td>${item.name}</td>
                    <td>${item.classify}</td>
                    <td>${item.price}</td>
                    <td>${item.sale}</td>
                    <td>${item.inventory}</td>
                    <td>${item.state}</td>
                    <td>${item.time}</td>
                    <td data-id="${item._id}">
                        <button class="layui-btn layui-btn-sm">
                            <i class="layui-icon compile"></i>
                        </button>
                        <button class="layui-btn layui-btn-primary layui-btn-sm ">
                                <i class="layui-icon cancel"></i>
                        </button>
                        <button class="layui-btn layui-btn-sm state">下架</button>
                    </td>
                </tr>`
            )
        }).join(",")
    }


    //封装页码数据渲染，传入num
    function creatPage(num) {
        var str = `<button class="layui-btn layui-btn-sm layui-btn-primary pagePrve">上一页</button>`;
        for (var a = 0; a < num; a++) {
            str += `<button class = "layui-btn layui-btn-sm layui-btn-primary pageNum"> ${a + 1}</button>`
        }
        str += `<button class="layui-btn layui-btn-sm layui-btn-primary pageNext">下一页</button>`;
        return str;
    }
    //封装页码高亮
    function activePage(num) {
        $(".page button").eq(num).removeClass("layui-btn-primary")
    }
    //
    // 封装清除页码高亮
    function removeactivePage() {
        for (var a = 1; a < $(".page button").length - 1; a++) {
            $(".page button").eq(a).addClass("layui-btn-primary")
                // console.log($(".page button").eq(a))
        }

    }
    // //页面初始化
    function init() {
        $.ajax({
            type: "get",
            //url: `/api/list/page=${page}&qty=${qty}&sort=${sort}&desc=${desc}`,
            url: `/api/list`,
            data: `page=${Cookie.getCookie("page")}&qty=${Cookie.getCookie("qty")}&sort=${Cookie.getCookie("sort")}&desc=${Cookie.getCookie("desc")}`,
            success: function(data) {
                // console.log(Math.ceil(data.allLength / data.currLength))
                // console.log($(".page"))
                $("#bit").val(Cookie.getCookie("qty"))
                $("tbody").html(render(data.data))
                $(".page").html(creatPage(Math.ceil(data.allLength / data.qty)))
                Cookie.setCookie("allLength", data.allLength)
                if (Math.ceil(data.allLength / data.qty) < Cookie.getCookie("page")) {
                    Cookie.setCookie("page", Math.ceil(data.allLength / data.qty))
                    init()
                }
                activePage(Cookie.getCookie("page"))

                //设置输入页码框的最大值
                $(".toPage input").prop("max", Math.ceil(data.allLength / data.qty))
                    //console.log(Math.ceil(data.allLength / data.qty))
                getDeleteArr()
            }
        });
    }
    init()


    //点击页码
    $(".page").on("click", "button", e => {
        //点击页码
        if ($(e.target).hasClass("pageNum")) {
            removeactivePage()
                //console.log($(e.target).html())
            Cookie.setCookie("page", $(e.target).html())
            init()

        }
        //点击上一页
        if ($(e.target).hasClass("pagePrve")) {
            // console.log(222)
            if (Cookie.getCookie("page") > 1) {

                Cookie.setCookie("page", Cookie.getCookie("page") - 1)
                init()
            }
        }
        //点击下一页
        if ($(e.target).hasClass("pageNext")) {
            if (Cookie.getCookie("page") < $(".page").children().length - 2) {
                console.log(Cookie.getCookie("page"))
                Cookie.setCookie("page", Cookie.getCookie("page") * 1 + 1)
                init()
            }
        }
    })

    //选择条数

    $("#bit").on("input", function() {
        Cookie.setCookie("qty", $(this).val())
        if (Math.ceil(Cookie.getCookie("allLength") / $(this).val()) < Cookie.getCookie("Page")) {
            Cookie.setCookie("page", Math.ceil(Cookie.getCookie("allLength") / $(this).val()))
        }
        init()
    })

    // 输入页数
    $(".toPage input").on("input", function() {

        if ($(this).val() * 1 > $(this).prop("max") * 1) {

            $(this).val($(this).prop("max"))

        } else if ($(this).val() < 1) {
            $(this).val(1)

        }

    })


    //点击确定
    $(".toPageBtn").on("click", () => {
        Cookie.setCookie("page", $(".toPage input").val())
        init()
    })


})