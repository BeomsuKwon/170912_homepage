var currentUser = {};
var pagination = {
    pageIndex:0,
    searchCondition:null,
};

requirejs.config({
    baseUrl: '.',
    paths:{
        'jquery':'jquery-1.12.4.min',
        'bootstrap':'bootstrap.min',
        'heading':'./components/heading',
        'login':'./components/login',
        'listup':'./components/postlistup',
        'writePost':'./components/writePost',
        'pagination':'./components/pagination',
        'postDetail':'./components/PostDetail',
        'Search':'./components/Search'
    },
    shim:{
        'bootstrap':{
            deps:['jquery']
        }
    }
});

requirejs(
    [   'jquery',
        'bootstrap',
        'heading',
        'login',
        'listup',
        'writePost',
        'pagination',
        'postDetail',
        'Search'
    ], function($){
    $(document).ready(function(){
        let heading = new Heading();
        let login = new Login();
        let write = new WritePost();
        let listup = new Listup();
        let pagnation = new Pagination();
        let postDetail = new PostDetail();
        let search = new Search();

        $('heading').append(heading.render());
        $('nav').append(write.render())
        $('nav').append(login.render());
        $('nav').append(search.render());
        listup.init();
        // $('pagination').append(pagnation.render());
        $('body').append(postDetail.render());

        $(`#${WritePost.submit}`).click(write.submit);
        $(`#${Login.submit}`).click(login.login);
        $(`#${Login.logoutButton}`).click(login.logout);
        $(`#${PostDetail.delete}`).click(function(){
            postDetail.deletePost();
            listup.init();
        });
        $(`#${PostDetail.update}`).click(function(){
            postDetail.modifyPost();
            listup.init();
        });
    });
});