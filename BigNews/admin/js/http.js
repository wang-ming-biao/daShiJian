/*通过闭包实现沙箱模式 
服务器基地址  和  每一个接口地址  放到网络层js文件中*/
// 后台接口
(function(w) {
    // 项目基地址
    var baseURL = 'http://localhost:8080/api/v1';

    var BigNew = {
        baseURL:          baseURL,//项目基地址
        user_login:       baseURL + '/admin/user/login',//用户登录
        user_info:        baseURL + '/admin/user/info', //用户信息
        user_edit:        baseURL + '/admin/user/edit',//用户编辑
        category_list:    baseURL + '/admin/category/list',//文章类别查询
        category_add:     baseURL + '/admin/category/add',//新增文章类别
        category_search:  baseURL + '/admin/category/search', //文章类别查询
        category_edit:    baseURL + '/admin/category/edit',//编辑文章类别
        category_delete:  baseURL + '/admin/category/delete', //删除文章类别
        article_query:    baseURL + '/admin/article/query',//文章搜索
        article_publish:  baseURL + '/admin/article/publish',//发布文章
        article_search:   baseURL + '/admin/article/search',//文章信息查询
        article_edit:     baseURL + '/admin/article/edit',//文章编辑
        article_delete:   baseURL + '/admin/article/delete',//文章删除
        data_info:        baseURL + '/admin/data/info',//获取统计数据
        data_article:     baseURL + '/admin/data/article',//日新增文章数量统计
        data_category:    baseURL + '/admin/data/category',//各类型文章统计
        data_visit:       baseURL + '/admin/data/visit',//日文章访问量
        comment_search:   baseURL + '/admin/comment/search',//文章评论搜索
        comment_pass:     baseURL + '/admin/comment/pass',//文章评论通过
        comment_reject:   baseURL + '/admin/comment/reject',//文章评论不通过
        comment_delete:   baseURL + '/admin/comment/delete',//删除评论
    };
    // 暴露接口
    w.BigNew = BigNew;
})(window);
