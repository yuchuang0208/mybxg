define(["jquery","cookie"], function ($) {
    //�����¼��ť
    $("#loginBtn").on("click", function () {
        $.ajax({
            type: "post",
            url: "/api/login",
            data: $("#loginForm").serialize(),
            dataType: "json",
            success: function (data) {
                //��Ӧ�ɹ�����תҳ��
                if(data.code == 200) {
                    //����cookieЯ����¼����Ϣ,json��ʽת�����ַ���
                    $.cookie("loginInfo",JSON.stringify(data.result),{path:"/"})
                    location.href = "/main/index";
                }

            }
        });
        return false;
    });
});