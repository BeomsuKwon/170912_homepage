class Pagination {
    static get length(){return 9}

    constructor(){
        this.render();
        this.init();
    }

    render(){
        let pages = [];

        for(let i = 0; i < Pagination.length; i++){
            let val = options.pageIndex + i - parseInt(Pagination.length / 2);
            if(options.pageIndex <= parseInt(Pagination.length / 2) + 1)
                pages[i] = i + 1;
            else
                 pages[i] = val;
        }
        $.ajax({
            url:'model.php',
            datatype:'json',
            method:'post',
            data:{
                select:{
                    table: 'post',
                    keyword:options.keyword,
                    keywordType:options.keywordType,
                    pageIndex: options.pageIndex,
                    perPage: options.perPage
                }
            },
            success:data=>{
                options.numOfPost = JSON.parse(data).length;
            }
        }).done(()=>{
            $('.pageButton').map((button, name)=>{
                let index = parseInt($(name).text());
                if((index - 1) * options.perPage > options.numOfPost){
                    $(name).addClass("disabled");
                }
            });
            $('.disabled').unbind('click');
        });
        $('pagination').empty().append(a=>{
            let page = "";
            pages.map(a=>{page += '<li class="pageButton"><a>'+a+'</a></li>'});
            return(`
                <nav id="pagination" aria-label="Page navigation">
                    <ul class="pagination pagination-lg">
                        <li>
                        <a id="previous" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                        </li>
                        ${page.replace(',','')}
                        <li>
                        <a id="next" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                        </li>
                    </ul>
                <nav>
            `);
        });
        $('.pageButton').unbind('click');
        $('#previous').unbind('click');
        $('#next').unbind('click');
        $('.pageButton').click(this.pageMove);
        $('#previous').click(this.prev);
        $('#next').click(this.next);
    }
    init(){
        $.map($('.pageButton'), a=>{
            if($(a).text() == options.pageIndex){
                $(a).addClass('active');
            }
        });
    }
    pageMove(e){
        options.pageIndex = parseInt($(e.currentTarget).text());

        components.Listup.render();
        components.Listup.init();
        components.Pagination.render();
        components.Pagination.init();
    }
    prev(){
        options.pageIndex = options.pageIndex - Pagination.length;
        if(options.pageIndex - Pagination.length <= 0) options.pageIndex = 1;
        components.Listup.render();
        components.Listup.init();
        components.Pagination.render();
        components.Pagination.init();
    }
    next(){
        if((options.pageIndex + Pagination.length - 1) * options.perPage > options.numOfPost){return ;}
        options.pageIndex = options.pageIndex + Pagination.length;
        components.Listup.render();
        components.Listup.init();
        components.Pagination.render();
        components.Pagination.init();
    }
}