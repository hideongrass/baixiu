$('#userForm').on('submit', function () {
    var formData = $(this).serialize();
    //向服务器发送添加用户的请求
    $.ajax({
        url: '/users',
        type: 'post',
        data: formData,
        success: function () {
            location.reload();
        },
        error: function () {
            alert('用户添加失败')
        }
    })
    //阻止表单默认的提交行为
    return false;
})


//处理头像上传功能
$('#modifyBox').on('change','#avatar' ,function () {
    //二进制文件上传
    var formData = new FormData();
    formData.append('avatar', this.files[0]);

    //开始发请求
    $.ajax({
        type: 'post',
        url: '/upload',

        data: formData,
        //不要解析请求参数
        processData: false,
        //不要设置请求参数的类型
        contentType: false,
        success: function (resp) {
            //1.让用户看到这张图
            // console.log(resp);

            var url = resp[0].avatar;

            //实现图片预览
            $('#preview').attr('src', url);

            //2.设置隐藏域
            $('#hiddenAvatar').val(url)

        }
    })
})

$.ajax({
    type: 'get',
    url: '/users',
    success: function (response) {
        // console.log(response)
        // 使用模板引擎将数据和HTML字符串进行拼接
        var html = template('userTpl', { data: response });
        // 将拼接好的字符串显示在页面中
        $('#userBox').html(html);
    }
});

$('#userBox').on('click', '.edit', function () {
    //获取被点击用户的ID值
    var id = $(this).attr('data-id');
    //  alert(id)

    $.ajax({
        type: 'get',
        url: '/users/' + id ,
        success: function (response) {
            // console.log(response);
           var html=  template('modifyTpl',response);
            $('#modifyBox').html(html);
        }
    })
})

$('#modifyBox').on('submit','#modifyForm',function(){
    alert(1)
    //获取用户在表单中输入的内容
    var formData = $(this).serialize();
    console.log(formData);
    
    //获取要修改的那个用户的id
    var id  =$(this).attr('data-id');
    $.ajax({
        type: 'put',
        url: '/users/' +id,
        data: formData,
        success: function(response){
            alert(1)
            location.reload();
        }
    })
    return false;
})