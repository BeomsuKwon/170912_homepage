class Listup {
    constructor(){
        this.render();
        this.init();
    }
    render(){
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
                            keyword:options.keyword,
                            keywordType:options.keywordType,
                            pageIndex: options.pageIndex,
                            perPage: options.perPage,
                            limit:true
                        }
                    },
                    method:'post',
                    success: function(data){
                        posts = JSON.parse(data);
                        if(posts != null){
                            returnVal = posts.map(post => {
                                post.content = post.content.length > 10 ? post.content.slice(0,7)+'...' : post.content;
                                post.title = post.title.length > 10 ? post.title.slice(0,7)+'...' : post.title;
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
            };
        });
    }
    init(){
        $('.post').mouseenter(function(){
            $(this).addClass('panel-footer');
        });
        $('.post').mouseleave(function(){
            $(this).removeClass('panel-footer');
        });
        $('.post').click(function(e){
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
                method: 'post',
            }).done(function(){
                $(`#${PostDetail.modal}`).on('shown.bs.modal', ()=>{
                    components.PostDetail.postDetail(e);
                });
            }(e));
        });
    }
}