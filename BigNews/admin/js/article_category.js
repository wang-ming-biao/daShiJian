
// 入口函数
$(function(){
    /*页面加载之后发送ajax请求所有文章分类 */
    $.ajax({
        // 通过传参值调取地址
        url: BigNew.category_list,
        type:'get',
        dataType:'json',
        // data:'',
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
// show 方法调用之后立即触发该事件。如果是通过点击某个作为触发器的元素，
// 则此元素可以通过事件的 relatedTarget 属性进行访问。
    $('#myModal').on('shown.bs.modal',function(e) {
        if (e.relatedTarget == $('#xinzengfenlei')[0]) {
            // 新增按钮
            $('.btn-confirm').text('新增');
        }else {
            // 编辑按钮
            $('.btn-confirm').text('编辑');
            // 传递文章name
            // 找到当前点击选项的父元素的上一个兄弟的上一个兄弟的文本
            $('#recipient-name').val($(e.relatedTarget).parent().prev().prev().text());
            // 传递文章的slug
            // 找到当前点击选项的父元素的上一个兄弟的文本
            $('#message-text').val($(e.relatedTarget).parent().prev().text());
            // 传递文章的id
            // 通过dom元素的attr拿到当前点击的编辑按钮的data-id,赋值给新增按钮
            $('.confirm').attr('data-id',$(e.relatedTarget).attr('data-id'));
        }
    });


    // 模态框新增按钮
    $('.btn-confirm').click(function(){
        if ($(this).text() == '新增') {
            console.log('点击新增');
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
                type:'post',
                dataType:'json',
                data:{
                    name:$('#recipient-name').val(),
                    slug:$('#message-text').val(),
                    // 通过编辑按钮赋值一个data-id给新增按钮,再通过this获取到data-id
                    id:$(this).attr('data-id')
                },
                success: function(backData){
                if (backData.code == 200) {
                    alert('编辑成功');
                    // 刷新页面
                    window.location.reload();
                }
                }
            });
        }
    });

    // 模态框取消按钮
    
    $('.btn-cancel').click(function(){
        // 表单清空
        // 重置表单 : DOM对象的reset()方法
        $('.modal-body>form')[0].reset();
    })




   /*4.删除文章类别 
   注意点: 删除按钮是模板引擎动态添加的,需要注册委托事件
   */
//   将tbody原有的注册事件委托给'btn-delete'
    $('.table>tbody').on('click','.btn-delete',function() {
        // 获取当前点击的按钮的id;
        var id = $(this).attr('data-id');
        $.ajax({
            url:BigNew.category_delete,
            type:'post',
            dataType:'json',
            // 将上面获取的id作为属性值传给服务器
            // 左边属性名,右边属性值
            data:{ id:id },
            success: function(backData){
                // 若返回值等于204则代表成功
            if (backData.code == 204) {
                alert('删除成功');
                // 刷新页面
                window.location.reload();
            }
            }
        });
    })
});