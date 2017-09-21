define(["jquery","cookie"], function ($) {
    //点击登录按钮
    $("#loginBtn").on("click", function () {
        $.ajax({
            type: "post",
            url: "/api/login",
            data: $("#loginForm").serialize(),
            dataType: "json",
            success: function (data) {
                //响应成功，跳转页面
                if(data.code == 200) {
                    //设置cookie携带登录的信息,json格式转化成字符串
                    $.cookie("loginInfo",JSON.stringify(data.result),{path:"/"})
                    location.href = "/main/index";
                }

            }
        });
        return false;
    });
});