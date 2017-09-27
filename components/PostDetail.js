class PostDetail {
    static get post_id(){return 'postDetailPostId'}
    static get user_id(){return 'postDetailUserId'}
    static get title(){return 'postDetailTitle'}
    static get content(){return 'postDetailContent'}
    static get date(){return 'postDetailDate'}
    static get changeDate(){return 'postDetailChangeDate'}
    static get hits(){return 'postDetailHits'}
    static get modify(){return 'modifyPost'}
    static get delete(){return 'deletePost'}
    static get submit(){return 'modifySubmit'}
    static get modal(){return 'postDetail'}
    static get comment(){return 'commentSection'}

    constructor(){
        this.render();
    }
    render(){
        $('body').append(a=>{
            return(`
                <div id="${PostDetail.modal}" class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
                    <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 class="modal-title" id="${PostDetail.title}">Title</h4>
                            </div>
                            <div class="modal-body">
                                <div >
                                </div>
                                <div class="panel panel-default">
                                    <div class="panel-heading">
                                        글번호<span id="${PostDetail.post_id}" class="label label-default"></span>
                                        작성자<span id="${PostDetail.user_id}" class="label label-default"></span>
                                        작성일<span id="${PostDetail.date}" class="label label-default"></span>
                                        수정일<span id="${PostDetail.changeDate}" class="label label-default"></span>
                                        조회수<span id="${PostDetail.hits}" class="label label-default"></span>
                                    </div>
                                    <div id="${PostDetail.content}" class="panel-body">
                                        Contents
                                    </div>
                                    <div id="${PostDetail.comment}" class="panel-footer">
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button id="${PostDetail.modify}" type="button" class="btn btn-primary hide">수정</button>
                                <button id="${PostDetail.delete}" type="button" class="btn btn-danger hide" data-dismiss="modal">삭제</button>
                            </div>
                        </div>
                    </div>
                </div>
            `);
        });
        $(`#${PostDetail.delete}`).unbind('click');
        $(`#${PostDetail.modify}`).unbind('click');
        $(`#${PostDetail.delete}`).on('click', this.deletePost);
        $(`#${PostDetail.modify}`).on('click', this.modifyModalUp);
    }
    postDetail(e){
        let post = $(e.currentTarget);
        $.ajax({
            url:'./model.php',
            datatype:'json',
            data:{
                select:{
                    table: 'post',
                    post_id: post.find('#post_id').text(),
                }
            },
            method:'post',
            success:data=>{
                $(`#${PostDetail.modal}`).on('shown.bs.modal', function(){
                    let posts = JSON.parse(data);
                    posts.map(data => {
                        let changeDate = data.update_date ? data.update_date : data.date;
                        $(`#${PostDetail.post_id}`).text(data.post_id);
                        $(`#${PostDetail.user_id}`).text(data.user_id);
                        $(`#${PostDetail.title}`).text(data.title);
                        $(`#${PostDetail.content}`).html(data.content);
                        $(`#${PostDetail.date}`).text(data.date);
                        $(`#${PostDetail.changeDate}`).text(changeDate);
                        $(`#${PostDetail.hits}`).text(data.hits);
    
                        if(currentUser == null || currentUser.user_id != data.user_id){
                            $(`#${PostDetail.delete}`).addClass('hide');
                            $(`#${PostDetail.modify}`).addClass('hide');
                        } else {
                            $(`#${PostDetail.delete}`).removeClass('hide');
                            $(`#${PostDetail.modify}`).removeClass('hide');
                        }
                    });
                    components.Listup.render();
                    components.Listup.init();
                }(data));
            }
        });
        components.Comment.render();
    }
    deletePost(){
        let post_id = $(`#${PostDetail.post_id}`).text();

        $.ajax({
            url:'./model.php',
            datatype:'json',
            data:{
                delete:{
                    table:'post',
                    post_id:post_id,
                    user_id:currentUser.user_id
                }
            },
            method:'post',
            async: false
        });
        components.Listup.render();
        components.Listup.init();
    };
    modifyModalUp(){
        $.ajax({
            url:'./model.php',
            datatype:'json',
            data:{
                select:{
                    table: 'post',
                    post_id: $(`#${PostDetail.post_id}`).text(),
                }
            },
            method:'post',
            success:data=>{
                let posts = JSON.parse(data);
                posts.map(data => {
                    let changeDate = data.update_date ? data.update_date : data.date;
                    $(`#${ModifyPost.post_id}`).text(data.post_id);
                    $(`#${ModifyPost.user_id}`).text(data.user_id);
                    $(`#${ModifyPost.date}`).text(data.date);
                    $(`#${ModifyPost.changeDate}`).text(changeDate);
                    $(`#${ModifyPost.hits}`).text(data.hits);
                });
            }
        });
        components.ModifyPost.init();
        $(`#${PostDetail.modal}`).modal('hide');
        $(`#${PostDetail.modal}`).on('hidden.bs.modal', function(){
            components.ModifyPost.init();
           $(`#${ModifyPost.modal}`).modal('show');
           $(`#${PostDetail.modal}`).unbind('hidden.bs.modal');
        });
    };
}