define(["jquery","template","ckeditor","uploadify","region","datepicker","language"], function ($, template,CKEDITOR) {
    $.ajax({
        type: "get",
        url: "/api/teacher/profile",
        dataType: "json",
        success: function (data) {
            //console.log(data);
            var html = template("settingsTpl",data.result);
            $("#settingsInfo").html(html);

            //����ͷ���ϴ�
            $("#upfile").uploadify({
                width: 120,
                height: 120,
                buttonText: "",
                itemTemplate: "<span></span>",
                swf: "/public/assets/uploadify/uploadify.swf",
                uploader: "/api/uploader/avatar",
                fileObjName: "tc_avatar",
                onUploadSuccess: function (a, b) {
                    console.log(b);
                    var obj = JSON.parse(b);
                    $(".preview img").attr("src",obj.result.path);
                }
            });

            //ʡ�м�����
            $("#pcd").region({
                url: "/public/assets/jquery-region/region.json"
            });

            //�����ı�
            CKEDITOR.replace("editor",{
                toolbarGroups : [
                { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
                { name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] }
            ]
            });

            gitModifyInfo();
        }
    });

    //������水ť,��װ����
    function gitModifyInfo() {
        $("#btn-success").on("click", function () {
            $.ajax({
                type: "post",
                url: "/api/teacher/modify",
                data: $("#modifyInfo").serialize(),
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    location.reload();
                }
            });
        });
    };




});