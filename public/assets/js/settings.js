//当管理员选择logo图片
$('#logo').on('change',function(){
    //获取管理员选择到的图片
    alert(1)
    var file = this.files[0];   
    console.log(file);
     
    //创建formData对象 实现二进制文件上传
    var formData = new FormData();
    //将管理员选择到的文件添加到formData 对象中
    formData.append('logo',file);
    //向服务器发送请求 实现文件上传
    $.ajax({
        type: 'post',
        url: '/upload',
        processData:false,
        contentType: false,
        success: function(response){
            console.log(response);
            $('#hiddenLogo').val(response[0].logo);
            //将logo图片显示在页面中
            $('#preview').attr('src',response[0].logo);
        }
    })
})