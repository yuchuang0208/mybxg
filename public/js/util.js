define(["jquery"], function ($) {
    return {
        searchStr: function (key) {
            //��ȡurl��ָ���Ĳ���ֵ
            var param = location.search.substr(1);
            var result = null;
            if(param) {
                var ps = param.split("&");
                $.each(ps, function (index, item) {
                    var kv = item.split("=");
                    if(kv[0]== key) {
                        result = kv[1];
                        return false;    //��ֹѭ��
                    }
                });
            }
            return result;
        },
        setMenu : function (path) {
            //���ò˵���������ʾ
            $(".aside .navs a[href='"+path+"']").addClass("active").closest("ul").show();
        }
    }
});