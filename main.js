var currentUser = {};
var options = {
    pageIndex:1,
    perPage:20,
    searchCondition:null,
    keyword:'',
    keywordType:''
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
        'Search':'./components/Search',
        // 'PageIndex':'./components/PageIndex'
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
        'Search',
        // 'PageIndex'
    ], function($){
    $(document).ready(function(){
        components.Search = new Search();
        components.Heading = new Heading();
        components.Login = new Login();
        components.Write = new WritePost();
        components.Listup = new Listup();
        components.Pagination = new Pagination();
        components.PostDetail = new PostDetail();
        // components.PageIndex = new PageIndex();
    });
});