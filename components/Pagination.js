class Pagination {
    constructor(){
        this.render();
        this.init();
    }

    render(cPage){

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
                let posts = JSON.parse(data);
                
            }
        });
        // .find('li.pageButton')
        $('pagination').empty().append(a=>{
            return(`
                <nav id="pagination" aria-label="Page navigation">
                    <ul class="pagination pagination-lg">
                        <li class="disabled">
                        <a id="previous" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                        </li>
                        <li class="pageButton active"><a>1</a></li>
                        <li class="pageButton"><a>2</a></li>
                        <li class="pageButton"><a>3</a></li>
                        <li class="pageButton"><a>4</a></li>
                        <li class="pageButton"><a>5</a></li>
                        <li class="pageButton"><a>6</a></li>
                        <li class="pageButton"><a>7</a></li>
                        <li class="pageButton"><a>8</a></li>
                        <li class="pageButton"><a>9</a></li>
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
    }
    init(){
    }
    pageMove(e){
        let cPage = $(e.currentTarget).text();
        options.pageIndex = $(e.currentTarget).text();
        $('#pagination').find('li.pageButton').map(list=>{
            $(list).text
        });
        components.Listup.render();
        components.Listup.init();
        components.Pagination.render();
        components.Pagination.init();
    }
}