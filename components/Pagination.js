class Pagination {
    constructor(){
        this.render();
        this.init();
    }

    render(){
        let pages = [];

        for(let i = 0; i < 5; i++){
            pages[i] = parseInt(options.pageIndex / 5) * 5 + i;
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
                options.numOfPost = JSON.parse(data);
            }
        });
        // .find('li.pageButton')
        $('pagination').empty().append(a=>{
            return(`
                <nav id="pagination" aria-label="Page navigation">
                    <ul class="pagination pagination-lg">
                        <li>
                        <a id="previous" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                        </li>
                        ${pages.map(a=>{return '<li class="pageButton"><a>'+a+'</a></li>'})}
                        <li>
                        <a id="next" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                        </li>
                    </ul>
                <nav>
            `);
        });
        $('#pagination').find('li.pageButton').click(this.pageMove);
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
        options.pageIndex = $(e.currentTarget).text();

        components.Listup.render();
        components.Listup.init();
        components.Pagination.render();
        components.Pagination.init();
    }
    prev(){
        options.pageIndex = parseInt(options.pageIndex) - 5;
        components.Pagination.render();
        components.Pagination.init();
    }
    next(){
        options.pageIndex = parseInt(options.pageIndex) + 5;
        components.Pagination.render();
        components.Pagination.init();
        // $.map($('.pageButton>a'), a=>{
        //     $(a).text(parseInt($(a).text()) + 5);
        // });
    }
}