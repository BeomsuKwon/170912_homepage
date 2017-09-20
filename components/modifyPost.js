class ModifyPost {
    static get modal(){return 'modifyPostModal'}
    static get title(){return 'modifyPostTitle'}
    static get post_id(){return 'modifyPostId'}
    static get user_id(){return 'modifyPostUserId'}
    static get date(){return 'modifyPostDate'}
    static get changeDate(){return 'modifyPostChangeDate'}
    static get hits(){return 'modifyPostHits'}
    static get content(){return 'modifyPostContents'}
    static get submit(){return 'modifyPostSubmit'}
    constructor(){
        this.render();
    }
    render(){
        $('body').append(a=>{
            return(`
                <div id="${ModifyPost.modal}" class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
                    <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 class="modal-title">글 수정</h4>
                            </div>
                            <div class="modal-body">
                                <div class="panel panel-default">
                                    <div class="panel-heading">
                                        글번호<span id="${ModifyPost.post_id}" class="label label-default"></span>
                                        작성자<span id="${ModifyPost.user_id}" class="label label-default"></span>
                                        작성일<span id="${ModifyPost.date}" class="label label-default"></span>
                                        수정일<span id="${ModifyPost.changeDate}" class="label label-default"></span>
                                        조회수<span id="${ModifyPost.hits}" class="label label-default"></span>
                                    </div>
                                    <div class="input-group">
                                        <span class="input-group-addon">제목</span>
                                        <input id="${ModifyPost.title}" type="text" class="form-control">
                                    </div>
                                    <span class="input-group-addon">내용</span>
                                    <textarea id="${ModifyPost.content}" class="form-control" rows="10" style="resize:none;"></textarea>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button id="${ModifyPost.submit}" type="button" class="btn btn-primary" data-dismiss="modal">완료</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `);
        });
        $(`#${ModifyPost.submit}`).unbind('click');
        $(`#${ModifyPost.submit}`).click(this.submit);
    }
    init(){
        $(`#${ModifyPost.title}`).val($("#"+PostDetail.title).text());
        $(`#${ModifyPost.content}`).val($("#"+PostDetail.content).text());
    }
    submit(){
        $.ajax({
            url:'./model.php',
            datatype:'json',
            data:{
                update:{
                    table:'post',
                    post_id:$(`#${ModifyPost.post_id}`).text(),
                    title:$(`#${ModifyPost.title}`).val(),
                    content:$(`#${ModifyPost.content}`).val(),
                    update:true
                }
            },
            method:'post',
            success:data=>{
                components.Listup.render();
                components.Listup.init();
                console.log('post modify success');
            }
        });
    }
}