
//ÅäÖÃÎÄ¼ş
require.config({
    baseUrl: "/public/assets",
    paths: {
        jquery: "jquery/jquery",
        cookie: "jquery-cookie/jquery.cookie",
        template: "artTemplate/template-web",
        bootstrap: "bootstrap/js/bootstrap.min",
        common: "../js/common",
        login: "../js/login1",
        teacherList: "../js/teacher-lists"

    },
    shim : {
        bootstrap : {
            deps : ['jquery']
        }
    }

});