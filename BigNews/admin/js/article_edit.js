

$(function () {
    // 入口函数

    /*思路
    1.jeDate日期插件
    2.tinyMCE插件
    */

    /* 1.获取从article_list页面传递过来的参数 : 文章 id */
    var id = window.location.href.split("=")[1];
    console.log(id);
    /* 2.通过id查询文章详细信息  */
    $.ajax({
        url: BigNew.category_list,
        type: 'get',
        dataType: 'json',
        // data:'',
        success: function (backData) {
            $('.category').html(template('cat_list', backData))
        }
    });

    /*3. ajax请求文章详细信息 */
    $.ajax({
        url: BigNew.article_search,
        type: 'get',
        dataType: 'json',
        data: {
            // 将从article_list页面传过来的参数传入到这
            id: id
        },
        success: function (backData) {
            console.log(backData);
            $('#inputTitle').val(backData.data.title);
            $('.article_cover').attr('src', backData.data.cover);
            // 将返回的文章类别id赋值给类别选项
            $('.category').val(backData.data.categoryTd);
            // 将时间参数赋值日历插件
            $('#testico').val(backData.data.date);
            // wang富文本插件: 将返回来的文本内容通过wang富文本的方法传递给他
            editor.txt.html(backData.data.content);
        }
    });

    /* 4. 文件预览  */
    //1.给file表单元素注册onchange事件
    $('#inputCover').change(function () {
        //1.2 获取用户选择的图片
        var file = this.files[0];
        //1.3 将文件转为src路径
        var url = URL.createObjectURL(file);
        //1.4 将url路径赋值给img标签的src
        $('.article_cover').attr('src', url);
    });
    /* 5.编辑文字 :文件上传 */
    $('.btn-edit').on('click', function (e) {
        //禁用表单默认提交事件
        e.preventDefault();
        editArticle('已发布')

    });


    $('.btn-draft').on('click', function (e) {
        //禁用表单默认提交事件
        e.preventDefault();
        editArticle('草稿')

    });

    function editArticle(state) {
        // 创建FormData对象 : 修改失败 ,提示是表单dom对象
        var fd = new FormData($('#form')[0]);
        // 由于$('#testico')是jq对象,所以要在后面接上下标转成dom对象
        /*
        1.发现问题: 修改失误, 提示参数错误
        2.分析问题: FormData能够自动遍历表单中所有的元素,将name属性值与value值拼接成参数
            如果表单没有name属性值,formData无法获取
        3.解决方案:
            使用formData的append()方法动态追加参数
        */
        fd.append('id', id);
        fd.append('date', $('#testico').val());
        fd.append('content', editor.txt.html());
        fd.append('state', state);
        $.ajax({
            url: BigNew.article_edit,
            type: 'post',
            dataType: 'json',
            data:fd,
            contentType: false,
            processData: false,
            success: function (backData) {
                if (backData.code == 200) {
                    alert('编辑成功');
                    window.location.href = './article_list.html';
                }
            }
        });
    }
});