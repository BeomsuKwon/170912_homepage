class PageIndex {
    static get perPage(){return 'perPageAmount'}
    constructor(){
        this.render();
    }
    render(){
        $('.panel-body').prepend(a=>{
            return (`
                <div class="navbar-right">
                    <span>페이지당 게시물 수</span>
                    <select name="${PageIndex.perPage}>
                        <option value="10">10개씩</option>
                        <option value="20">20개씩</option>
                        <option value="30">30개씩</option>
                    </select>
                </div>
            `);
        });
    }
}