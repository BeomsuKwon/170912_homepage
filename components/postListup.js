class Listup {
    constructor(){
        this.render();
        this.init();
    }
    render(keyword, keywordType){
        $('tbody').empty().append(function(){
            {
                var posts = [];
                var returnVal = [];
                $.ajax({
                    url:'./model.php',
                    datatype:'json',
                    data: {
                        select:{
                            table: 'post',
                            keyword:keyword,
                            keywordType:keywordType,
                            pageIndex: pagination.pageIndex,
                            perPage: 20
                        }
                    },
                    method:'post',
                    success: function(data){
                        console.log('load posts');
                        posts = JSON.parse(data);
                        if(posts != null){
                            returnVal = posts.map(post => {
                                return (
                                    `<tr type="button" class="post" data-toggle="modal" data-target="#postDetail">
                                        <td id="post_id">${post.post_id}</td>
                                        <td id="user_id">${post.user_id}</td>
                                        <td id="title">${post.title}</td>
                                        <td id="content">${post.content}</td>
                                        <td id="date">${post.date}</td>
                                        <td id="changeDate">${post.update_date ? post.update_date : post.date}</td>
                                        <td id="hits">${post.hits}</td>
                                    </tr>
                                    `
                                );
                            });
                        }
                    },
                    async:false
                });
                return returnVal;
            }(keyword, keywordType);
        });
    }
    init(keyword, keywordType){
        $('.post').mouseenter(function(){
            $(this).addClass('panel-footer');
        });
        $('.post').mouseleave(function(){
            $(this).removeClass('panel-footer');
        });
        $('.post').click(function(e){
            console.log('load post detail');
            components.PostDetail.postDetail(e);
            let post = $(e.currentTarget);
            $.ajax({
                url:'./model.php',
                datatype:'json',
                data:{
                    update:{
                        table:'post',
                        post_id:$(post.find('#post_id')).text(),
                        hits: true
                    }
                },
                success: data=>{
                    console.log('hits updated');
                    
                },
                method: 'post',
            })
        });
    }
}