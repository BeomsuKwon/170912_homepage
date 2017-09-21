class Comment {
    static get submit(){return 'commentSubmit'}
    static get contnet(){return 'commentContent'}
    constructor(){
    }
    render(){
        $(`#${PostDetail.comment}`).empty()
        .append(()=>{
            return(`
                <div class="panel panel-default">
                    <div class="meida">
                        <div class="media-body media-middle">
                            <div class="input-group">
                                <input id="${Comment.content}" class="form-control" type="text" />
                                <div class="input-group-btn">
                                    <button id="${Comment.submit}" type="button" class="btn btn-primary">작성</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `);
        });
        $(`#${PostDetail.modal}`).on('shown.bs.modal', ()=>{
            $.ajax({
                url:'./model.php',
                datatype:'json',
                method:'post',
                data:{
                    select:{
                        table:'post',
                        post_pid:$(`#${PostDetail.post_id}`).text(),
                    }
                }
            }).done(data=>{
                if(data == "null") return;
                let posts = JSON.parse(data);
                $(`#${PostDetail.comment}`)
                .find('.comments')
                .remove();
                $(`#${PostDetail.comment}`)
                .append(posts.map(post=>{
                    return(`
                        <!-- 댓글 엘리먼트 --!>
                        <div class="media comments">
                            <!-- <div class="media-left media-top">${post}</div> -->
                            <div class="media-body">
                                <h4 class="media-heading">${post.title}</h4>
                                ${post.content}
                            </div>
                        </div>
                    `);
                }));
            });
        })
        // $(`#${PostDetail.comment}`).append(()=>{
        //     return(`
        //         <!-- 댓글 엘리먼트 --!>
        //         <div class="media">
        //             <!-- <div class="media-left media-top">1</div> -->
        //             <div class="media-body">
        //                 <h4 class="media-heading">Bob</h4>
        //                 wow!!!
        //             </div>
        //         </div>
        //     `)
        // });
        $(`#${Comment.subtmi}`).unbind('click');
        $(`#${Comment.submit}`).on('click', this.submit);
    }
    init(){

    }
    submit(){
        $.ajax({
            url:'model.php',
            dataType:'json',
            method:'post',
            data:{
                insert:{
                    table:'post',
                    post_pid:$(`#${PostDetail.post_id}`).text(),
                    user_id:currentUser.user_id,
                    title:currentUser.user_id,
                    content:$(`#${Comment.content}`).val(),
                }
            }
        }).done((e)=>{
            $(`#${PostDetail.modal}`).modal('hide');
        });
    }
}