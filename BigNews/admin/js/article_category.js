
// 入口函数
$(function(){
    /*页面加载之后发送ajax请求所有文章分类 */
    $.ajax({
        url: BigNew.category_list,
        type:'get',
        dataType:'json',
        data:'',
        success: function(backData){
        console.log(backData);
        // 数据响应之后 模板引擎渲染页面
        // 找到table下面的tbody,使用模板引擎的template方法进行渲染,
        $('.table>tbody').html(template('cat_list',backData));
        }
    });


    /*
    新增与文字编辑难点分析 : 模态框复用

    (1) 发现问题 : 点击新增与编辑都要弹出模态框
        新增逻辑
            a.模态框表单清空
            b.模态框显示新增按钮
            c.新增接口 : /admin/category/add  参数: name  /  slug
        编辑逻辑
            a.模态框显示点击分类信息
            b.模态框显示编辑按钮
            c.编辑接口:  /admin/category/edit  参数:  id  name  slug


    (2) 结合bootstrap官网 模态框时间介绍 (模态框复用)
    1.给新增和编辑按钮添加  data-toggle="modal" data-target="#myModal"
        作用: 点击的时候弹出模态框
    2.给模态框注册 shown.bs.modal 事件 :模态框出现之前会触发
        作用: 获取 事件对象 e.relatedTarget 获取模态框事件触发源
    3.给模态框确认按钮注册点击事件
        作用: 判断按钮的文字 : 新增  | 编辑
    4.给模态框取消按钮注册点击事件
    清空表单  原生 DOM.reset();
    */
   
   /*2.新增文章类别 */
    $('#myModal').on('shown.bs.modal',function(e) {
        if (e.relatedTarget == $('#xinzengfenlei')[0]) {
            // 新增按钮
            $('.btn-confirm').text('新增');
        }else {
            // 编辑按钮
            $('.btn-confirm').text('编辑');
            // 传递文章name
            $('#recipient-name').val($(e.relatedTarget).parent().prev().prev().text());
            // 传递文章的slug
            $('#message-text').val($(e.relatedTarget).parent().prev().text());
            // 传递文章的id
            $('.confirm').attr('data-id',$(e.relatedTarget).attr('data-id'));
        }
    });


    // 模态框新增按钮
    $('.btn-confirm').click(function(){
        if ($(this).text() == '新增') {
            console.log('新增');
            $.ajax({
                url:BigNew.category_add,
                type:'post',
                dataType:'json',
                data:{
                    name:$('#recipient-name').val(),
                    slug:$('#message-text').val()
                },
                success: function(backData){
                console.log(backData);
                if (backData.code == 201) {
                    alert('新增成功');
                    window.location.reload();
                }
                }
            });
        }else {
            console.log('点击编辑');
            /*3.编辑文章类别 */
            $.ajax({
                url:BigNew.category_edit,
                type:'get',
                dataType:'json',
                data:{
                    name:$('#recipient-name').val(),
                    slug:$('#message-text').val(),
                    id:$(this).attr('data-id')
                },
                success: function(backData){
            
                }
            });
        }
    });

    // 模态框取消按钮
    
    $('.btn-cancel').click(function(){
        // 表单清空
        $('.modal-body>form')[0].reset();
    })




   /*4.删除文章类别 */
});