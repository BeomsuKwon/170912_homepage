class Heading {
    constructor(){
        this.render();
    }
    render(){
        $('heading').append(a=>{
            return(`
                <div class="heading">
                    <h1>게시판이당<small>신난당</small></h1>
                </div>
            `);
        });
    }
}
