class Login {
    static get idElemName(){return 'userId'}
    static get pwElemName(){return 'userPw'}
    static get submit(){return 'loginSubmit'}
    static get loginButton(){return 'loginButton'}
    static get logoutButton(){return 'logoutButton'}

    constructor(){
        this.render();
    }
    render(){
        $('.navbar-header').append(a=>{
            return(`
                <button id="${Login.loginButton}" type="button" class="btn btn-primary" data-toggle="modal" data-target="#loginModal">
                    로그인
                </button>
                <button id="${Login.logoutButton}" type="button" class="btn btn-primary hide">
                    로그아웃
                </button>
            `);
        });
        $('body').append(a=>{
            return(`
                <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 class="modal-title" id="myModalLabel">로그인</h4>
                            </div>
                            <div class="modal-body">
                                <div style="max-width:300px">
                                    <div class="input-group input-group-sm">
                                        <span class="input-group-addon">아이디</span>
                                        <input id="${Login.idElemName}" type="text" class="form-control" placeholder="아이디" />
                                    </div>
                                    <div class="input-group input-group-sm">
                                        <span class="input-group-addon">비밀번호</span>
                                        <input id="${Login.pwElemName}" type="password" class="form-control" placeholder="비밀번호" />
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button id="${Login.submit}" type="button" class="btn btn-primary" data-dismiss="modal">로그인</button>
                            </div>
                        </div>
                    </div>
                </div>
            `)
        });
        $(`#${Login.submit}`).click(this.login);
        $(`#${Login.logoutButton}`).click(this.logout);
    }

    login(){
        $.ajax({
            url:'./login.model.php',
            datatype: 'json',
            data : {
                select: {
                    table: 'user',
                    user_id: $(`#${Login.idElemName}`).val(),
                    user_pw: $(`#${Login.pwElemName}`).val(),
                }
            },
            method: 'post',
            fail: function(){
                console.log('ajax failed');
                return false;
            }
        }).done(data=>{
            if(data !== "null"){
                currentUser = JSON.parse(data);
                $(`#${Login.loginButton}`).addClass('hide');
                $(`#${Login.logoutButton}`).removeClass('hide');
                $(`#${WritePost.button}`).removeClass('hide');

                $(`#${Login.idElemName}`).val('');
                $(`#${Login.pwElemName}`).val('');
                console.log('login completed');
            }
        });
    }
    logout(){
        $.ajax({
            url:'./login.model.php',
            datatype: 'json',
            data: {
                deleteCookie: true
            },
            method: 'post',
            success: data=>{
                currentUser = null;
                $(`#${Login.logoutButton}`).addClass('hide');
                $(`#${WritePost.button}`).addClass('hide');
                $(`#${Login.loginButton}`).removeClass('hide');
                console.log('logout');
            }
        });
    }
}
