var currentUser = {};
var pagination = {
    pageIndex:0,
    searchCondition:null,
};
var components = {};

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
        components.Heading = new Heading();
        components.Login = new Login();
        components.Write = new WritePost();
        components.Listup = new Listup();
        components.Pagnation = new Pagination();
        components.PostDetail = new PostDetail();
        components.Search = new Search();

    });
});