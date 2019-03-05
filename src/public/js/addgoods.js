document.addEventListener("DOMContentLoaded", () => {
    //点击上下架
    $(".shangjia").on("click", function() {
        //console.log($(this))
        if ($(this).html() == "上架") {
            $(this).html("下架")
        } else if ($(this).html() == "下架") {
            $(this).html("上架")
        }
    })
    let href = location.search.slice(1);
    if (href) {
        let arr = href.split("=");
        // console.log(arr)
        $.ajax({
            type: "get",
            url: "/api/list/one",
            data: `${arr[0]}=${arr[1]}`,
            success: function(data) {
                $(".shopInput").val(data.data.name).attr("data-id", data.data._id)
                $(".titleInput").val(data.data.title)
                $(".priceInput").val(data.data.price)
                $(".saleInput").val(data.data.sale)
                $(".kucunInput").val(data.data.inventory)
                $("textarea").val(data.data.title)
                    // $(".classifyInput").val(data.data.classify)
                    // $(".stateInput").attr("lay-text", data.data.state)
                    // console.log(data.data.title)
                switch (data.data.classify) {
                    case "iphone":
                        $(".classifyInput").children().eq(0).prop("selected", true);
                        // console.log(1)
                        break
                    case "miui":
                        $(".classifyInput").children().eq(1).prop("selected", true);
                        // console.log(2)
                        break
                    case "honor":
                        $(".classifyInput").children().eq(2).prop("selected", true);
                        // console.log(3)
                        break
                }

                switch (data.data.state) {
                    case "上架":
                        $(".shangjia").html("上架")
                            // console.log(666)
                        break;
                    case "下架":
                        $(".shangjia").html("下架")
                            // console.log(111)
                        break;
                }
                //console.log($(".classifyInput").val())

                $(".yes_btn").on("click", () => {
                    //console.log($(".shangjia").html())
                    $.ajax({
                        type: "get",
                        url: "/api/list/update",
                        data: `_id=${$(".shopInput").attr("data-id")}&name=${$(".shopInput").val()}&title=${$(".titleInput").val()}&price=${$(".priceInput").val()}&sale=${$(".saleInput").val()}&inventory=${$(".kucunInput").val()}&classify=${$(".classifyInput").val()}&state=${$(".shangjia").html()}`,
                        success: function(data) {
                            if (data.code == 1) {
                                alert("更新成功")
                                location.href = `../index.html`
                            } else {
                                alert("更新失败")
                            }
                        }
                    })
                })
            }
        })
    } else {
        $(".yes_btn").on("click", () => {
            //console.log($(".shangjia").html())
            $.ajax({
                type: "get",
                url: "/api/list/insert",
                data: `name=${$(".shopInput").val()}&title=${$(".titleInput").val()}&price=${$(".priceInput").val()}&sale=${$(".saleInput").val()}&inventory=${$(".kucunInput").val()}&classify=${$(".classifyInput").val()}&state=${$(".shangjia").html()}`,
                success: function(data) {
                    // console.log(data)
                    if (data.code == 1) {
                        alert("添加成功")
                        location.href = `../index.html`
                    } else {
                        alert("添加失败")
                    }
                }
            })
        })
    }
})