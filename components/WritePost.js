class WritePost {
    static get title(){return 'writePostTitle'}
    static get content(){return 'writePostContent'}
    static get submit(){return 'writePostSubmit'}
    static get button(){return 'writePostButton'}
    render(){
        $('nav').append(a=>{
            return(`
                <button id="${WritePost.button}" type="button" class="btn btn-primary navbar-btn hide" data-toggle="modal" data-target="#writePostModal">
                    글 쓰기
                </button>
                <div class="modal fade" id="writePostModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 class="modal-title" id="myModalLabel">글 쓰기</h4>
                            </div>
                            <div class="modal-body">
                                <div class="input-group">
                                    <span class="input-group-addon">제목</span>
                                    <input id="${WritePost.title}" type="text" class="form-control">
                                </div>
                                <span class="input-group-addon">내용</span>
                                <textarea id="${WritePost.content}" class="form-control" rows="10" style="resize:none;"></textarea>
                            </div>
                            <div class="modal-footer">
                                <button id="${WritePost.submit}" type="button" class="btn btn-primary" data-dismiss="modal">작성</button>
                            </div>
                        </div>
                    </div>
                </div>
            `);
        });
        $(`#${WritePost.submit}`).click(this.submit);
    }
    submit(){
        $.ajax({
            url: 'model.php',
            datatype: 'json',
            data: {
                insert: {
                    table: 'post',
                    user_id: currentUser['user_id'],
                    title: $(`#${WritePost.title}`).val(),
                    content: $(`#${WritePost.content}`).val()
                }
            },
            method: 'post',
            success: function(){
                
            }
        })
        .done(function(){
            $(`#${WritePost.title}`).val('');
            $(`#${WritePost.content}`).val('');
        });
    }
}