class Search {
    static get option(){return 'searchOption'}
    static get button(){return 'searchButton'}
    render(){
        return(`
        <div id="search" class="input-group">
            <span class="input-group-btn">
                <button type="button" id="${Search.button}" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">검색 <span class="caret"></span></button>
                <ul class="dropdown-menu">
                    <li><a onClick="Search.dropdownClcik(event)">작성자</a></li>
                    <li><a onClick="Search.dropdownClcik(event)">제목</a></li>
                    <li><a onClick="Search.dropdownClcik(event)">내용</a></li>
                    <li><a onClick="Search.dropdownClcik(event)">작성자+제목+내용</a></li>
            </ul>
            </span>
            <input id="searchValue" type="text" class="form-control" />
            </div>
            <div>
            <button type="button" class="btn btn-default" onClick="Search.submit()">Search</button>
        </div>
        `);
    }
    static dropdownClcik(e){
        $(`#${Search.button}`).text(e.currentTarget.innerText);
    }
    static submit(){
        let listup = new listup();

        listup.render();
    }
}