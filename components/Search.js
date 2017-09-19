class Search {
    static get option(){return 'searchOption'}
    static get value(){return 'searchValue'}
    static get button(){return 'searchButton'}
    
    constructor(){
        this.render();
        options.keywordType = $(`#${Search.option}`).text();
        options.keyword = $(`#${Search.value}`).val();
    }
    render(){
        $('.navbar-container').append(a=>{return(`
            <div id="search" class="input-group">
                <span class="input-group-btn">
                    <button type="button" id="${Search.option}" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">작성자</button>
                    <ul class="dropdown-menu">
                        <li><a>작성자</a></li>
                        <li><a>제목</a></li>
                        <li><a>내용</a></li>
                        <li><a>작성자+제목+내용</a></li>
                </ul>
                </span>
                <input id="${Search.value}" type="text" class="form-control" />
                </div>
                <div>
                <button id="${Search.button}" type="button" class="btn btn-default">Search</button>
            </div>
            `);
        });
        $(`#${Search.button}`).click(this.submit);
        $(`#search`).find('a').click(this.dropdownClick);
    }
    dropdownClick(e){
        $(`#${Search.option}`).text(e.currentTarget.innerText);
    }
    submit(){
        options.keywordType = $(`#${Search.option}`).text();
        options.keyword = $(`#${Search.value}`).val();

        components.Listup.render(options.keyword, options.keywordType);
        components.Listup.init(options.keyword, options.keywordType);
    }
}