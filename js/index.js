/**
 * Created by Kinpin on 2017/1/19.
 */

//初始页面
$(function () {
//person块请求
    $.ajax({
        url:'json/chat.json',
        success:function (res) {
            var data = res.person;
            $('.person').empty();
            $.each(data,function (i) {
                $('.person').append('<li><img src="' + data[i].img + '"/>' +
                    '<span data-name="'+ data[i].id +'">'+ data[i].name +'</span><svg class="icon cancel" aria-hidden="true"> '+
                    '<use xlink:href="#icon-guanbi1"></use> </svg></li>')
            });
        }
    });
    $('.close').hide();
    $('.top-content').show();
    $('.main-content').show();
    $('.prompt-message').show();
});
//header
$.ajax({
    url:"json/chat.json",
    success:function (res) {
        $('header>img').attr("src",res.mySelf.img);
        $('#name').text(res.mySelf.name);
        $('.headerMsg>p:first-child').text(res.mySelf.name);
        $('.headerMsg>p:nth-child(2)').text(res.mySelf.tel);
        $('.headerMsg>p:nth-child(3)').text(res.mySelf.section);
        $('.headerMsg>p:nth-child(4)').text(res.mySelf.position);
    }
})

$('.person').on('mouseout','li>img',function () {
    $('.msg').hide();
});
//设置
$('.setting').click(function (e) {
    e.stopPropagation();
    $(this).css('color','#30ddf8');
    $('.settingNav').removeClass('hide');
    $('.settingNav2').hide();
});
$(document).click(function (e) {
    e = window.event || e;
    e.stopPropagation();
    if(e.target.id!='nv'&&!$('.settingNav').hasClass('hide')){
        $('.settingNav').addClass('hide');
        $('.setting').css('color','#1fb0c2');
    }
})

$('.settingNav li:nth-child(3)>span').mouseenter(function () {
    $('.settingNav2').show();
});
$('.settingNav li:not(:nth-child(3))>span').mouseenter(function () {
        $('.settingNav2').hide();
})

//msg
$('header>img').hover(function () {
    $('header>.headerMsg').show();
},function () {
    $('header>.headerMsg').hide();
});
//person li hover
$('.person').on('mouseenter','li>img',function () {
    var datapost =  $(this).next().attr('data-name');
    var the = $(this);
    $.ajax({
        url:"./json/chat.json",
        dataType:"json",
        data:datapost,
        success:function (data) {
            var data = data.msg[datapost];
            var top = $(the).offset().top;
            var _top = $('.box').offset().top;
            top = top-_top;
            $('.msg').empty();
            $('.msg').append("<p>"+ data.name +"</p><p>"+ data.tel +"</p><p>" + data.section + "</p><p>"+
            data.position +"</p>");
            $('.msg').show().css("top",top);
        }
    })
});
$('.person').on('mouseout','li>img',function () {
    $('.msg').hide();
});
$('.person').on('mouseenter','li',function (event) {
    // event.cancelBubble;
    $(this).children('.cancel').show();
});
$('.person').on('mouseleave','li',function () {
   $(this).children('.cancel').hide();
});
//模糊搜索
$('.search>input').blur(function () {
    $('.mohuSearch li').click(function () {
        alert();
        $(this).parent().parent().children('input').val('');
        $('.mohuSearch').empty();
        $('.mohuSearch').hide();
    });
    $('.searchbtn').click(function () {
        $('.searchText').val('');
        $('.mohuSearch').empty();
        $('.mohuSearch').hide();
    })
});
$('.searchText').keyup(function () {
        $('.mohuSearch').empty();
        var text = $(this).val();
        if(text!=''){
            var list = $('.person li');
            var arr;
            $('.mohuSearch').show().css("height","auto");
            $.each(list,function (i) {
                var liText = $(this).children('span').text();
                if(liText.indexOf(text)>=0){
                    arr = $(list[i]).clone();
                    $(arr).children('div').remove();
                    $(arr).children('svg').remove();
                    $('.mohuSearch').append(arr);
                }
            });
            $('.mohuSearch li').hover(function () {
                $(this).css("background","#ccc");
            },function () {
                $(this).css("background","none");
            });
        }
});

// 跳转事件
var jumpEvent  = function(){
    $('#group_sendBtn').click(function(){
        // 拿到群名称
        var groupName = $(this).parent().parent().children().eq(0).children().eq(1).html();
        $('.main-content').css('display','none');
        $('.top-content').css('display','none');
        $('.one-chatting .chatting-top span').html(groupName);
        $('.one-chatting').css('display','block');
    });
    // 点击查找聊天记录 跳转到聊天记录页面
    $('#search_record').click(function(){
        $('.close').hide();
        $('.top-content').show();
        $('.main-content').css('display','none');
        $('.one-chatting').css('display','none');
        $('.chatting-record').css('display','block');
    });

    //点击文件查找
    $('#search_file').click(function(){
        $('.close').hide();
        $('.file-view').show();
    });
    // 点击chat下的li 跳转到相应的聊天窗口
    $('.chat li').click(function(){
        $('.main-content').css('display','none');
        $('.top-content').css('display','none');
        $('.one-chatting').css('display','block');
    });
};
jumpEvent();

//选择块
$('.nav li svg').click(function () {
    $('.navIcon').css('color','#1fb0c2');
    $(this).css('color','#30ddf8');
    var name = $(this).attr('name');
    $('.content').hide();
    $('.'+ name).show();
    if (name == 'add'){
        $('.close').hide();
        $('.top-content>span').text('详细信息');
        $('#addFriend').show();
    }else if(name=='person'){
        $('.close').hide();
        $('.top-content>span').text('详细信息');
        $('.top-content').show();
        $('.main-content').show();
        $('.prompt-message').show();
    }else if(name=='qun'){
        $('.close').hide();
        $('.top-content>span').text('详细信息');
        $('.top-content').show();
        $('.main-content').show();
        $('.prompt-message').show().text('请点击群查看详情！');
    }else if(name=='chat'){
        $('.close').hide();
        $('.top-content').show();
        $('.main-content').show();
        $('.prompt-message').show().text('请点击列表查看详情！');

    }
});

//设置我的信息跳转
/*$('#myMsg').click(function () {
    $('.close').hide();
    $('.top-content').show();
    $('.main-content').show();
    $('.my-message').show();
});*/

//设置陌生人的信息跳转
var Message =  function(the){
        $('.close').hide();
        $('.top-content').show();
        $('.main-content').show();
        console.log(the);
        // $("." +  $(the).attr("data-name")).show();
        $(".friend-message").show();
}

/*//设置好友的信息跳转
var myFriendMessage =  on('click',function () {
    $('.close').hide();
    $('.top-content').show();
    $('.main-content').show();
    $('.myFriend-message').show();
});*/

//选择好友时

//找人/找群
$('#addFriend header span:nth-child(2)').click(function () {
    $('.close').hide();
    $('#addQun').show();
})
$('#addQun header span:nth-child(1)').click(function () {
    $('.close').hide();
    $('#addFriend').show();
});

//person单项单击
$('.person').on('click','li',function () {
    var the = $(this);
    $('.close').hide();
    $('.one-chatting').show();
    $('.chatting-top>span').text($(this).children('span').text());
    $.ajax({
        type:"get",
        url:'./json/chat.json',
        dataType:"json",
        success:function (data) {
            $('.one-chatting .person-talk').empty();
            var nam = the.children('span').attr('data-name');
            var dataChat = data.chatting[nam];
            $.each(dataChat,function (i) {
                var judge = dataChat[i].class == 'your_talk'?'':"<img src='" + dataChat[i].img + "'/>";
                var judge1 = dataChat[i].class == 'your_talk'?"<img src='" + dataChat[i].img + "'/>":'';
                var textJudge = dataChat[i].class == 'your_talk'?'right':'left';
                var place = dataChat[i].class == 'your_talk'?'right-name':'left-name';
                $('.one-chatting .person-talk').append(
                    "<ul style='text-align:" + textJudge + "' class='"+ dataChat[i].class +"'><li>"+ judge +"</li><li><p class='" +
                    place + "'>" + dataChat[i].name +"</p><span>" + dataChat[i].span + "</span></li><li>" + judge1
                    +"</li></ul>"
                );
            })
        }
    })
});

//qun单项单击
$('.qun li').click(function () {
    var theQun = $(this);
    $('.close').hide();
    $('.top-content').children('span').text($(this).children('span').text());
    $('.top-content').show();
    $('.main-content').show();
    $('.two-groupPerson').show();
    $('#groupName span').text(theQun.children("span").text());
    boxRight.changeGroupName(theQun);
});

//chat单项单击
$('.chat li').click(function () {
    $('.close').hide();
    $(this).children('i').remove();
    $('.one-chatting').show();
    var self = $(this);
    change(self);

});

//add单项双击
$('.chat li.yanzheng').click(function () {
    $('.close').hide();
    $('.add1').show();
});

//添加按钮
$('.boxLeft .addBtn').click(function () {
    layer.open({
        skin:"addBox",
        title:"添加好友",
        content:"请求已发送等待对方回复",
        area: ['5rem', '3rem']
    })
});


//删除
$('.person').on('click','li .cancel',function () {
    var e=this;
    layer.confirm('是否确定删除？',{
            btn:['确认','取消'],
            btn1:function (index) {
                $('.close').hide();
                $('.top-content').show();
                $('.main-content').show();
                $('.prompt-message').show().text('请点击列表查看详情！');
                $(e).parent().remove();
                layer.close(index);
            }
        }
    );
});

//boxRight

/*****************Two 群组功能********************/
//功能1 AJAX请求获得好友数据
var html = '';
$.ajax({
    type:"GET",
    url:"data/addPerson.json",
    dataType:"json",
    success:function(data){
        var html = '';
        // console.log(data);
        $.each(data,function(key,val){
            // console.log(val);
            // console.log(key);
            html +=
                '<li>'+
                '<dl>'+
                '<dt>'+
                '<img src="img/p1_l.jpg" alt="">'+
                '</dt>'+
                '<dd>'+val.name+'</dd>'+
                '</dl>'+
                '</li>';
        });
        $('ul#group_addArea').prepend(html);
        /*var groupLi = $('ul#group_addArea li');
        console.log(groupLi.length);
        if(groupLi.length == 20){
            $('ul#group_addArea').css("height",'1.98rem');
        }*/
    }
});

var oldHtml,newObj,element,html,spc;
$('#groupName span').click(function () {
    if(!$(this).children("input")[0]){
        console.log(spc[0]);
        var element = $(this);
        boxRight.changeMes(element,spc);
    }
});
var boxRight = {
    init: function(){
        this.preloadEvent();
        // this.changeGroupName();
        this.changeMyMes();
        this.pullFriends();
        this.showAddModal();
        this.deleteEvent();
        this.sendBtnEvent();
        this.enterBtnEvent();
        this.circleBgEvent();
        this.layuiEvent();
        this.searchGroupEvent();
        this.searchFriendEvent();
        this.fileViewEvent();
    },
    // 功能1 初始化后需要预加载的js 功能
    preloadEvent:function(){
        // qq表情预加载
        $('.biaoqing').qqFace({
            assign:'send_text', //给输入框赋值
            path:'img/arclist/'    //表情图片存放的路径
        });
    },
    // 功能2 单击群名变成修改状态
    changeGroupName:function(theQun){
        spc = theQun;
    },

    /********修改内容方法********/
    changeMes:function(element,theQun){
        var oldHtml = element.text();
        // 创建新的input元素
        newObj = document.createElement('input');
        $(newObj).css('width','auto').css('border','none');
        //为新增元素添加类型
        newObj.type = 'text';
        //为新增元素添加value值
        newObj.value = oldHtml;
        //为新增元素添加光标离开事件
            newObj.onblur = function() {
                //当触发时判断新增元素值是否为空，为空则不修改，并返回原有值
                element.html(this.value);

                if (($.trim(element.html()) === oldHtml) || ($.trim(element.html()) === '')) {
                    element.html(oldHtml);
                }else{
                    element.html($.trim(this.value));
                }
                $('.top-content').children('span').text(newObj.value);
                console.log($(theQun).children('span').text());
                $(theQun).children('span').text(newObj.value);
            };
        //设置该标签的子节点为空(dd标签)
        element.empty();
        $(element[0]).css("display","inline-block");
        //添加该标签的子节点，input对象
        element.append(newObj);
        //设置选择文本的内容或设置光标位置（两个参数：start,end；start为开始位置，end为结束位置；如果开始位置和结束位置相同则就是光标位置）
        // newObj.setSelectionRange(0, oldHtml.length);
        //设置获得光标
        newObj.focus();
    },
    // 功能3 改变我的信息
    changeMyMes:function(){
        var elementAll = $('#my_message dl dd');
        var count=true;
        $('#myChangeBtn').click(function(){
            $(this).parent().children('button').css('background',"white").css('color',"black");
            $(this).css({background:"rgb(14,140,157)",color:"white"});
            var color=$(this).css('color');
            if(count){
                for(var i = 0; i < elementAll.length; i++){
                    var element = $(elementAll[i]);
                    oldHtml = element.html();
                    newObj = document.createElement('input');
                    newObj.type = 'text';
                    newObj.className = 'ipnutT';
                    newObj.value = oldHtml;

                    //设置该标签的子节点为空(dd标签)
                    element.html('');
                    //添加该标签的子节点，input对象
                    element.append(newObj);
                    //设置选择文本的内容或设置光标位置（两个参数：start,end；start为开始位置，end为结束位置；如果开始位置和结束位置相同则就是光标位置）
                    newObj.setSelectionRange(0, oldHtml.length);
                    //设置获得光标
                    newObj.focus();
                }
                count = false;
            }
        });
        // 点击确定按钮 提交修改
        $('#mySureBtn').click(function(){
            $(this).parent().children('button').css('background',"white").css('color',"black");
            $(this).css({background:"rgb(14,140,157)",color:"white"});
            // this-->dd
            var str = '';
            $.each(elementAll,function(i){
                var inputVal = $(this).children('input').val();
                $(this).html(inputVal);
                str += inputVal + ',';
            });
            elementAll.remove('input');
            console.log(str.substring(0,str.length-2));
            count=true;
        });
    },


    /********聊天室********/
    // 功能4 点击下箭头 移出拉好友的界面
    pullFriends:function(){
        $('#pullIcon').click(function(){
            $('#chatting_addArea').slideToggle();
        });
    },

    // 功能5 点击添加按钮 弹出好友信息界面
    showAddModal:function(){
        $('#showModalBtn').click(function(){
            $('.close').hide();
            $('.one-chatting').show();
            $('.one-chatting .addArea').show();
            $('#modal').css('display','block');
        });
        $('#showQunModalBtn').click(function(){
            // $('.close').hide();
            // $('.top-content').show();
            $('#modal1').css('display','block');
        });
    },

    // 功能6 删除按钮 点击框消失
    deleteEvent:function(){
        $('#delete_icon').click(function(){
            $('.modal').css('display','none');
        });
        $('#delete_icon1').click(function(){
            $('.modal').css('display','none');
        });
    },

    /**********关于聊天的功能*********/
    // 功能7  发送新信息
    sendTalkEvent:function(){
        // 定义获取输入框
        var send_text = $('#send_text');

        function replace_em(str){
            str = str.replace(/\</g, '&lt;');

            str = str.replace(/\>/g, '&gt;');

            str = str.replace(/\n/g, '<br/>');

            str = str.replace(/\[em_([0-9]*)\]/g, '<img src="img/arclist/$1.gif" border="0" />');

            return str;
        }
        // 获取textarea中的内容
        var str = send_text.val();
        var talkHtml = replace_em(str);
        if ($.trim(talkHtml) === '') {
            alert('输入不能为空');
        } else {
            html =
                '<ul class="my_talk">'+
                '<li>'+
                '<img src="img/p2_l.jpg" alt="">'+
                '</li>'+
                '<li>'+
                '<p class="left-name">刘警官</p>'+
                '<span>'+talkHtml+'</span>'+
                '</li>'+
                '<li></li>'+
                '</ul>';
            $('#person-talk').append(html);
            // 滚动条至底部
            // console.log($('.chatting-middle')[0].scrollHeight);
            $('.chatting-middle').scrollTop($('.chatting-middle')[0].scrollHeight);
            
            send_text.val('');
            send_text.children().remove();
        }

    },


    // 功能8 点击发送按钮 发送  添加判断聊天框显示时有效
    sendBtnEvent:function(){
        $('#send_btn').click(function(){
            boxRight.sendTalkEvent();
        });
    },

    // 功能9 按回车键 发送
    // enterBtnEvent:function(){
    //     $(window).keydown(function(event){
    //         if(event.keyCode===13) {
    //             boxRight.sendTalkEvent();
    //         }
    //     });
    // },
    // 取消回车键的默认事件
    back:function (event){
        event = event || window.event;
        if(event.keyCode==13){
            event.returnValue = false;
            return false;
        }
    },
    // 功能10 点击圆圈 背景色改变 btn 数量和背景颜色改变
    circleBgEvent:function(){
        var num = 0,
            arrPic = [],
            arrName = [],
            pic='',
            name='',
            html_people='',
            html_num='',
            modalBtn = $('#modalBtn'),
            modalBtn1 = $('#modalBtn1'),
            circle = $('#group_list li b');
            circle1 = $('#group_list1 li b');
        circle.click(function(){
            // 判断圆圈是否 已被点击
            var hasBe = $(this).hasClass('active');
            if(hasBe){
                $(this).removeClass('active');
                num--;
            }else{
                $(this).addClass('active');
                num++;
            }
            // 改变 按钮的 背景颜色
            if(num){
                modalBtn.addClass('active');
            }else{
                modalBtn.removeClass('active');
            }

            // 改变数量
            var html_num = 	'确认'+
                '<span>('+num+')</span>';
            modalBtn.html(html_num);
            // 置空
            arrPic = [];
            arrName = [];
            // 遍历所有的b 如果有active则按钮bg改变 添加对应数量的数字
            for(var j=0; j<circle.length; j++){
                if($(circle[j]).hasClass('active')){

                    pic = $(circle[j]).next().attr('src');
                    name =  $(circle[j]).next().next().html();
                    arrPic.push(pic);

                    arrName.push(name);
                }
            }
            // console.log(arrName);
            // console.log(arrName.length);
            // 点击确定按钮 拼接到头部 chatting-top的addArea中
            modalBtn.click(function(){
                for(var i=0; i<arrName.length; i++){
                    html_people += '<li>'+
                        '<dl>'+
                        '<dt>'+
                        '<img src="'+arrPic[i]+'" alt="">'+
                        '</dt>'+
                        '<dd>'+arrName[i]+'</dd>'+
                        '</dl>'+
                        '</li>';
                }
                $('#chatting_addArea').append(html_people);
                $('#modal').hide();

                // 置空
                arrPic = [];
                arrName = [];
                pic='';
                name='';
                html_people='';
                html_num='';
                num=0;
                circle.removeClass('active');
                modalBtn.removeClass('active').html('确认<span></span>');
            });
        });
        circle1.click(function(){
            // 判断圆圈是否 已被点击
            var hasBe = $(this).hasClass('active');
            if(hasBe){
                $(this).removeClass('active');
                num--;
            }else{
                $(this).addClass('active');
                num++;
            }
            // 改变 按钮的 背景颜色
            if(num){
                modalBtn1.addClass('active');
            }else{
                modalBtn1.removeClass('active');
            }

            // 改变数量
            var html_num = 	'确认'+
                '<span>('+num+')</span>';
            modalBtn1.html(html_num);
            // 置空
            arrPic = [];
            arrName = [];
            // 遍历所有的b 如果有active则按钮bg改变 添加对应数量的数字
            for(var j=0; j<circle1.length; j++){
                if($(circle1[j]).hasClass('active')){

                    pic = $(circle1[j]).next().attr('src');
                    name =  $(circle1[j]).next().next().html();
                    arrPic.push(pic);

                    arrName.push(name);
                }
            }
            // console.log(arrName);
            // console.log(arrName.length);
            // 点击确定按钮 拼接到头部 chatting-top的addArea中
            modalBtn1.click(function(){
                for(var i=0; i<arrName.length; i++){
                    html_people += '<li>'+
                        '<dl>'+
                        '<dt>'+
                        '<img src="'+arrPic[i]+'" alt="">'+
                        '</dt>'+
                        '<dd>'+arrName[i]+'</dd>'+
                        '</dl>'+
                        '</li>';
                }
                $('#group_addArea').append(html_people);
                $('#modal1').css('display','none');

                // 置空
                arrPic = [];
                arrName = [];
                pic='';
                name='';
                html_people='';
                html_num='';
                num=0;
                circle1.removeClass('active');
                modalBtn1.removeClass('active').html('确认<span></span>');
            });
        });
    },
    // layui弹出层
    layuiEvent:function(){
        // 点击 退出 弹出确认提示层
        $('.exit').click(function(){
            layer.open({
                type:1,
                title:'退出',
                id:'out',
                area:['4.5rem','2.5rem'],
                btn:["确认","取消"],
                content:'<div style="text-align: center;margin-top: .8rem;">是否确认<span style="color:red;">退出</span>？</div>'
            });
        });

      /*  // 点击 添加 弹出添加群请求发送 弹出层
        $('').click(function(){
            layer.open({
                type:1,
                id:'out2',
                title:'添加群',
                area:['4.5rem','2.5rem'],
                btn:"确认",
                content:'<span class="layui-icon title-icon">&#x1006;</span><div style="text-align: center;margin-top: .8rem;"><span><i class="layui-icon">&#x1005;</i>入群请求已发送成功，正在等待管理员确认！</span></div>'

            });
        });*/
    },

    // 查找 人
    searchFriendEvent:function(){
        var input = $('#friendInput');
        /*点击delete后清空输入框中的内容*/
        $('.search-delete').on('click',function(){
            input.val('');
            $('#addFriend .searchContent').html('');
        });

        // 点击查找 拿到输入内容 ajax请求查找相关信息 拼接
        // 找人
        $('#addFriend button').click(function(){
            $.ajax({
                type:"GET",
                url:"data/searchPerson.json",
                dataType:"json",
                success:function(data){
                    if(data[0]){
                        html = '';
                        $('#addQun .searchContent').html('');
                        $.each(data,function(i){
                            console.log(data[i]);
                            html +=
                                '<li data-name="friend-message" onclick="Message()">'+
                                '<div>'+
                                '<div>'+
                                '<img src="'+data[i].pic+'"/>'+
                                '</div>'+
                                '<p>'+
                                '<span>'+data[i].name+'</span>'+
                                '<br/>'+
                                '<span>'+data[i].num+'</span>'+
                                '<button class="addBtn" onclick="addFriendBtn();" class="addFriendBtn">添加</button>'+
                                '</p>'+
                                '</div>'+
                                '</li>';
                        });
                    }else{
                        html='<span style="display: block;margin: 0 auto;text-align:center;color: red;margin-top: .2rem;">对不起！你搜索的用户不存在！</span>'
                    }
                    // 拼接
                    $('#addFriend .searchContent').html(html);
                }
            });
        });
        // 清空输入框
        input.val('');
    },

    // 找群
    searchGroupEvent:function(){
        var input = $('#groupInput');
        /*点击delete后清空输入框中的内容*/
        $('.search-delete').on('click',function(){
            input.val('');
            $('#addQun .searchContent').html('');
        });

        // 点击查找 拿到输入内容 ajax请求查找相关信息 拼接
        // 找群
        $('#addQun button').click(function(){
            $.ajax({
                type:"GET",
                url:"data/searchPerson.json",
                dataType:"json",
                success:function(data){
                    if(data[0]){
                        html = '';
                        $('#addQun .searchContent').html('');
                        $.each(data,function(i){
                            console.log(data[i].name)
                            html +=
                                '<li>'+
                                '<div>'+
                                '<div>'+
                                '<img src="'+data[i].pic+'"/>'+
                                '</div>'+
                                '<p style="padding-top: .08rem">'+
                                '<span>'+data[i].name+'</span>'+
                                '<button style="margin-top: .1rem" class="addBtn" onclick="addFriendBtn();" class="addFriendBtn">添加</button>'+
                                '</p>'+
                                '</div>'+
                                '</li>';
                        });
                        // 拼接
                    }else{
                        html='<span style="display: block;margin: 0 auto;text-align:center;color: red;margin-top: .2rem;">对不起！你搜索的用户不存在！</span>'
                    }

                    $('#addQun .searchContent').html(html);
                }
            });
        });
        input.val('');
    },
    // 关于文件部分的js
    fileViewEvent:function(){
        // 异步加载文件
        $.ajax({
            type:"GET",
            url:"data/searchFile.json",
            dataType:"json",
            success:function(data){
                html = '';
                $.each(data,function(key,val){
                    html +=
                        '<tr>'+
                        '<td>'+
                        '<img src="'+val.pic+'" >&nbsp;'+
                        '<span>'+val.name+'</span>'+
                        '</td>'+
                        '<td>'+
                        '<span class="fileDate">'+val.date+'</span>'+
                        '<ul class="progressNav" style="display:none;">'+
                        '<li class="download-speed">12.4MB/S</li>'+
                        '<li>'+
                        '<span class="progressBar"></span>'+
                        '<img src="img/stop.gif" alt="">'+
                        '<img src="img/delete.gif" alt="">'+
                        '</li>'+
                        '</ul>'+
                        '</td>'+
                        '<td>'+val.user+'</td>'+
                        '<td>'+
                        '<img src="'+val.state+'" alt="" class="'+val.className+'">'+
                        '</td>'+
                        '</tr>';
                });
                $('.file-table tbody').append(html);
            }
        });
        //模糊搜索功能 搜索框内容改变发起搜索
        var input = $('#file_input');
        input.on('input propertychange',function(){
            // console.log(input.val());
            var reg = new RegExp(input.val());
            $.ajax({
                type:"GET",
                url:"data/searchFile.json",
                dataType:"json",
                success:function(data){
                    html = '';
                    $.each(data,function(index,val){
                        if (val.name.match(reg) || val.user.match(reg)) {
                            // console.log(index);
                            html +=
                                '<tr>'+
                                '<td>'+
                                '<img src="'+data[index].pic+'" alt="">&nbsp;'+
                                '<span>'+data[index].name+'</span>'+
                                '</td>'+
                                '<td>'+
                                '<span class="fileDate">'+data[index].date+'</span>'+
                                '<ul class="progressNav" style="display:none;">'+
                                '<li class="download-speed">12.4MB/S</li>'+
                                '<li>'+
                                '<span class="progressBar"></span>'+
                                '<img src="img/stop.gif" alt="">'+
                                '<img src="img/delete.gif" alt="">'+
                                '</li>'+
                                '</ul>'+
                                '</td>'+
                                '<td>'+data[index].user+'</td>'+
                                '<td>'+
                                '<img src="'+data[index].state+'" alt="" class="'+data[index].className+'">'+
                                '</td>'+
                                '</tr>';
                        }
                    });
                    $('.file-table tbody').html(html);
                }
            });
        });
        //点击下载按钮 开始下载
        $('.file-table tbody').on('click','.downloadLogo',function(){
            // console.log('ok');
            var fileDate = $(this).parent().prev().prev().children()[0];
            var progressNav = $(this).parent().prev().prev().children()[1];
            $(fileDate).css('display','none');
            $(progressNav).css('display','block');

            // 设置定时器模拟 下载过程
            var timer = setTimeout(function(){
                $(fileDate).css('display','block');
                $(progressNav).css('display','none');
                // logo替换
                // console.log($(this));
                $(this).attr('src','img/file.gif').removeClass('downloadLogo').addClass('fileLogo');
            }.bind(this),2000);

            // clearTimeout(timer);
        });

        //点击文件夹按钮 打开文件夹位置
    }
};

var addFriendBtn =  function () {
    // 点击 添加 弹出好友请求发送 弹出层
    console.log($('.addFriendBtn'));
    layer.open({
        type:1,
        title:'添加好友',
        area:['4.5rem','2.5rem'],
        btn:["yes",'no'],
        yes:function (index) {
          alert("12");
            layer.close(index);
        },
        content:'<div style="text-align: center;margin-top: .8rem;"><span><i class="layui-icon">&#x1005;&nbsp;</i>请输入附加信息等待对方回复！</span>' +
        '<br/><input class="layui-input layui-input-inline" style="width: 80%;margin-top: .15rem" type="text" placeholder="请输入附加信息..."></div>'

    });
}
var addGroupBtn =  function () {
    // 点击 添加 弹出好友请求发送 弹出层
    console.log($('#addFriendBtn'));
    layer.open({
        type:1,
        title:'添加好友',
        area:['4.5rem','2.5rem'],
        btn:"确认",
        content:'<div style="text-align: center;margin-top: .8rem;"><span><i class="layui-icon">&#x1005;</i>请求已成功发送，正在等待对方确认！</span></div>'

    });
}
$(document).ready(function(){
    boxRight.init();
});
