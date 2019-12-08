$(function () {
    // 入口函数
    // 页面加载之后发送ajax请求所有分类,并加载到分类框中

    $.ajax({
        url: BigNew.category_list,
        type: 'get',
        dataType: 'json',
        // data:'',
        success: function (backData) {
            // 模板引擎渲染时是渲染给父元素,
            $('#selCategory').html(template('cat-list', backData));
            console.log(backData);
        }
    });
    /*解题思路
    1. 页面一加载: 默认请求数据
    
    2.筛选按钮点击事件
    筛选按钮  #btnSearch
    文章类别下拉菜单 : #selCategory
    文章状态下拉菜单 : #selStatus
    */
    // 页面加载后默认请求数据
    // $('#selCategory')
    // $.ajax({
    //     url: BigNew.article_query,
    //     type: 'get',
    //     dataType: 'json',
    //     data: {
    //         page: 1,
    //         perPage: 10
    //     },
    //     success: function (backData) {
    //         console.log(backData);
    //         // 将内容渲染给表单时,将其赋值给tbody
    //         $('.table>tbody').html(template('art-list', backData));
    //         // 01.默认加载之后初始化分页插件
    //         // (1)先销毁已经存在的插件
    //         $('#pagination').twbsPagination('destroy');
    //         // (2)初始化新的插件
    //         $('#pagination').twbsPagination({
    //             totalPages: backData.data.totalPage,//总页数
    //             startPage: 1,//起始页数
    //             visiblePages: 6,//可见页数
    //             first: "首页",
    //             prev: "上一页",
    //             next: "下一页",
    //             last: "尾页",
    //             onPageClick: function (event, page) {
    //                 $('#page-content').text('Page ' + page);
    //             }
    //         })
    //     }
    // });
    /*02.筛选按钮点击事件 
    筛选按钮 : #btnSearch
    注意点: 筛选按钮在form表单内,表单按钮要阻止默认跳转行为
    文章类别下拉菜单 : #selCategory
    文章状态下拉菜单 : #selStatus
    */

    $('#btnSearch').click(function (e) {
        // 02.1 阻止表单默认跳转行为
        e.preventDefault();
        // 02.2 ajax发送请求
        getArticleList(1, true);
        // $.ajax({
        //     url: BigNew.article_query,
        //     type: 'get',
        //     dataType: 'json',
        //     data: {
        //         type: $('#selCategory').val(),
        //         state: $('#selStatus').val(),
        //         page: 1,
        //         perpage: 10
        //     },
        //     success: function (backData) {
        //         console.log(backData);
        //         // 将内容渲染给表单时,将其赋值给tbody
        //         $('.table>tbody').html(template('art-list', backData));
        //         // 01.默认加载之后初始化分页插件
        //         // 调用下面封装好的函数,传入系统返回的总页数,以及起始页数
        //         loadPagination(backData.data.totalPage,1);
        //     }
        // });
    })
    // 主动触发文件加载程序
    $('#btnSearch').trigger('click');

    /**
    * @description: 加载分页插件
    * @param {type} 
    * @return: totalPage : 总页数
    * @return: startPage : 起始页数
    */
    function loadPagination(totalPage, startPage) {
        // (1)先销毁已经存在的插件
        $('#pagination').twbsPagination('destroy');
        // (2)初始化新的插件
        $('#pagination').twbsPagination({
            totalPages: totalPage,//总页数
            startPage: startPage,//起始页数
            visiblePages: 6,//可见页数
            first: "首页",
            prev: "上一页",
            next: "下一页",
            last: "尾页",
            onPageClick: function (event, page) {
                // $('#page-content').text('Page ' + page);
                // 在这里调用分页插件的封装函数,使得内容跟随页码变化
                if (startPage != page) {
                    getArticleList(page)
                }
            }
        })
    }


    /*03. 分页插件 : 点击页码展示对应页码数据*/
    /**
    * @description: 根据页码请求文章列表数据
    * @param {type} currentPage : 需要请求的页数
    * @return: 
    */
    function getArticleList(currentPage, flag) {
        $.ajax({
            url: BigNew.article_query,
            type: 'get',
            dataType: 'json',
            data: {
                type: $('#selCategory').val(),
                state: $('#selStatus').val(),
                page: currentPage,
                perpage: 10
            },
            success: function (backData) {
                // 将内容渲染给表单时,将其赋值给tbody
                $('.table>tbody').html(template('art-list', backData));
                // 如果是筛选按钮,需要加载分页插件, 如果点击的是页面,则不需要重新加载分页插件
                // 加载分页插件
                if (flag) {
                    loadPagination(backData.data.totalPage, currentPage);
                }
            }
        });
    }



    /* 04.删除 : 动态添加的标签,需要注册委托事件*/
    $('.table-striped>tbody').on('click', '.delete', function () {
        var id = $(this).attr('data-id');
        $.ajax({
            url: BigNew.article_delete,
            type: 'post',
            dataType: 'json',
            data: {
                id: id
            },
            success: function (backData) {
                alert(backData.msg);
                // 删除成功之后刷新页面
                window.location.reload();
            }
        });
    })

    // 5.发表文章按钮
    $('#release_btn').click(function () {
        // 点击发表文章: 侧边栏发表文章选项高亮
        /*注意点
        如何在子窗口article_list页面 获取 父窗口index.html的dohm树
        $(选择器,dom树?) :  第二个参数默认值是window.document
        $(选择器,window.document) : 当前页面dom树查找元素
        $(选择器,window.parent.document) : 在父页面dom树查找元素
        */
        console.log();
        $('.level02>li:eq(1)', window.parent.document).addClass('active').siblings().removeClass('active');
    })



    /* 05.编辑 : a标签href跳转 (页面间传参)*/
    /* 06. 发布 : a标签href跳转 */









})