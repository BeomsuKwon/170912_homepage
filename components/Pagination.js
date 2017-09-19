class Pagination {
    constructor(){
        this.render();
    }

    render(pagination={pageIndex:0}){
        let condition = {
            cPage:pagination.pageIndex
        };
        let pageIndex = [];
        $('pagination').append(a=>{
            return(`
                <nav id="pagination" aria-label="Page navigation">
                    <ul class="pagination pagination-lg">
                        <li class="disabled">
                        <a id="previous" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                        </li>
                        <li class="active"><a>1</a></li>
                        <li><a>2</a></li>
                        <li><a>3</a></li>
                        <li><a>4</a></li>
                        <li><a>5</a></li>
                        <li>
                        <a id="next" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                        </li>
                    </ul>
                <nav>
            `);
        });
    }
    init(){

    }
}