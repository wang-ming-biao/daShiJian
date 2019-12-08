// 入口函数
$(function() {
    // 1.代码加载后 ,向后台请求数据
    getCommentList(1);
    //2.分页功能
    function getCommentList(currentPage) {
        $.ajax({
            url: BigNew.comment_search,
            type:'get',
            dataType:'json',
            data:{
                page:currentPage,
                perpage:10
            },
            success: function(backData){
            console.log(backData);
            $('.table>tbody').html(template('com_list',backData));
            loadPagination(backData.data.totalPage,currentPage);
            }
        });
    }
    // 分页功能
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
            if (page != startPage) {
                getCommentList(page);
            }
        }
    })
}

    // 3.审批
    $('.table>tbody').on('click','.btn-pass',function() {
        var id = $(this).attr('data-id');
        $.ajax({
            url:BigNew.comment_pass,
            type:'post',
            dataType:'json',
            data:{
                id:id
            },
            success: function(backData){
            console.log(backData);
            alert('审核通过');
            window.location.reload();
            }
        });
    })
    // 4.拒绝
    $('.table>tbody').on('click','.btn-reject',function() {
        var id = $(this).attr('data-id');
        $.ajax({
            url:BigNew.comment_reject,
            type:'post',
            dataType:'json',
            data:{
                id:id
            },
            success: function(backData){
            console.log(backData);
            alert('已拒绝');
            window.location.reload();
            }
        });
    })
    // 5.删除
    $('.table>tbody').on('click','.btn-delete',function() {
        var id = $(this).attr('data-id');
        $.ajax({
            url:BigNew.comment_delete,
            type:'post',
            dataType:'json',
            data:{
                id:id
            },
            success: function(backData){
            console.log(backData);
            alert('删除成功');
            window.location.reload();
            }
        });
    })
})