/**
 * Created by Kinpin on 2017/2/4.
 */
function change(self){
    var text;
    if(self.children('span').children('b')[0]){
        text = self.children('span').children('b').text();
    }else{
        text = self.children('span').text();
    }
    var imgUrl = self.children('img').attr('src');
    $('.chatting-top>span').text(text);
    $('.your_talk li p').text(text);
    $('.your_talk li img').attr('src',imgUrl);
    
}
