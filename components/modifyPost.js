class ModifyPost {
    static get modal(){return 'modifyPostModal'}
    static get title(){return 'modifyPostTitle'}
    static get post_id(){return 'modifyPostId'}
    static get user_id(){return 'modifyPostUserId'}
    static get date(){return 'modifyPostChangeDate'}
    static get changeDate(){return 'modifyPostChangeDate'}
    static get hits(){return 'modifyPostHits'}
    static get content(){return 'modifyPostContents'}
    static get submit(){return 'modifyPostSubmit'}

    render(){
        return(`
            <div id="${ModifyPost.modal}" class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title" id="${ModifyPost.title}">Title</h4>
                        </div>
                        <div class="modal-body">
                            <div >
                            </div>
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    글번호<span id="${ModifyPost.post_id}" class="label label-default"></span>
                                    작성자<span id="${ModifyPost.user_id}" class="label label-default"></span>
                                    작성일<span id="${ModifyPost.date}" class="label label-default"></span>
                                    수정일<span id="${ModifyPost.changeDate}" class="label label-default"></span>
                                    조회수<span id="${ModifyPost.hits}" class="label label-default"></span>
                                </div>
                                <div id="${ModifyPost.content}" class="panel-body">
                                    Contents
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button id="${ModifyPost.submit}" type="button" class="btn btn-primary hide" data-dismiss="modal">완료</button>
                        </div>
                    </div>
                </div>
            </div>
        `);
    }
    init(){
        $(`#${ModifyPost.submit}`).click(function(){
            submit();
        });
    }
    submit(){
        $.ajax({
            url:'./modal.php',
            datatype:'json',
            data:{
                update:{

                }
            },
            method:'post',
            success:data=>{
                console.log('post modify success');
            }
        });
    }
}