define(["jquery","cookie"], function ($) {
    $("#loginBtn").on("click", function () {
        $.ajax({
            type: "post",
            url: "/api/login",
            data: $("#loginForm").serialize(),
            dataType: "json",
            success: function (data) {
//                    console.log(data);
                if(data.code == 200) {
                    //���û��ĵ�¼��Ϣ�洢��cookie�У������ҳ�湲������
                    $.cookie("loginInfo",JSON.stringify(data.result),{path:"/"});
                    location.href = "/main/index";

                }

            }

        });


        return false;
    })
});

