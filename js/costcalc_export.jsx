var rawexport=[];

class ManageExport extends React.Component {
    constructor(props) {
        super(props);
        this.make_export = this.make_export.bind(this);
        this.make_copy = this.make_copy.bind(this);
        this.rmvempty = this.rmvempty.bind(this);
        this.state={
            output:'',
            cols:["Category","Service","Name","Comments","Options","Cost"],
            disp:false,
            rmvempty:false,

        }
        this.typexp="";

    }

    render() {
        let opt="";
        if (this.state.disp){
            opt=this.options_btn();
        }
        return (
            <div id="export-group">
                <div className="card">
                    <div className="card-header">
                        {this.export_btn()}
                    </div>
                    <div className="card-body">
                        <div id="export-output" >
                            {this.state.output}

                        </div>
                    </div>
                    <div className="card-footer">
                        {opt}
                    </div>
                </div>
            </div>
        );
    }

    export_btn(){
        return(
            <div className="row" id="export-btn">
                <div className="col-auto">
                    <ButtonInput class="btn-primary" onClick={this.make_export} id="btn-export" name="Export HTML" tips="Export in HTML, can also be used into Word"
                                 n="html"/>
                </div>
                <div className="col-auto">
                    <ButtonInput class="btn-secondary" onClick={this.make_export} id="btn-export" name="Export HTML Source" tips="Export in HTML source code"
                                 n="htmlsrc"/>
                </div>
                <div className="col-auto">
                    <ButtonInput class="btn-success" onClick={this.make_export} id="btn-export" name="Export Markdown" tips="Export in Markdown source code"
                                 n="mark"/>
                </div>
            </div>
        )
    }

    options_btn(opt){
        let Namermv="";
        if (this.state.rmvempty){
             Namermv="Display Empty Lines";
        }else {
             Namermv="Remove Empty Lines";
        }
        return(
            <div className="row">
                <div className="col-auto">
                    <ButtonInput class="btn-secondary" onClick={this.make_copy} id="btn-export" name="Copy to Clipboard" tips="Copy the output into your clipboard"
                         n="mark"/>
                </div>
                <div className="col-auto">
                    <ButtonInput class="btn-primary" onClick={this.rmvempty} id="btn-export" name={Namermv} tips="Remove line(s) that don't have a provider"
                                 n="mark"/>
                </div>
            </div>
        );
    }
    rmvempty(){
        this.state.rmvempty=!this.state.rmvempty;
        this.make_export(this.typexp)
    }
    make_copy(){
        this.fnSelect("export-output");
        document.execCommand("copy");
        this.fnDeSelect()
        alert("Copied");
    }
    make_export(typexp){
        var data=this.read_export(typexp);
        this.typexp=typexp;
        switch(typexp){
            case 'html':
                this.setState({output:this.htmlout(data)});
                this.setState({disp:true});
                return;
            case 'htmlsrc':
                this.setState({output:this.htmlsrcout(data)});
                this.setState({disp:true});
                return;
            case 'mark':
                this.setState({output:this.markout(data)});
                this.setState({disp:true});
                return;
        }
    }

    htmlout(data){

        return(
            <div id="htmlexport" className="container">
                    <table className="table table-striped table-bordered" width="100%">
                        <thead className="thead-dark">
                            <tr>
                                {this.makecol(this.state.cols,'html',true)}
                            </tr>
                        </thead>
                        <tbody>
                            {this.htmltable(data)}
                            <tr className="table-info">
                                <td colSpan="5" align="right"><strong>Total Cost</strong></td>
                                <td align="center"><strong>{this.props.total}</strong></td>
                            </tr>
                        </tbody>
                </table>
            </div>
        );
    }
    htmlsrcout(data){

        return(
            <div id="htmlexport">
                <pre><code>
                    &lt;table&gt;<br/>
                    &lt;thead&gt;<br/>
                    {this.makecol(this.state.cols,'htmlsrc',true)}
                    &lt;/thead&gt;<br/>
                    &lt;tbody&gt;<br/>
                    {this.htmlsrctable(data)}
                    &lt;tr &gt;<br/>
                    &lt;td colSpan="5" align="right"&gt;&lt;strong&gt;Total Cost&lt;/strong&gt;&lt;/td&gt;&lt;td align="center"&gt;&lt;strong&gt;{this.props.total}&lt;/strong&gt;&lt;/td&gt;<br/>
                &lt;/tr&gt;<br/>
                &lt;/tbody&gt;<br/>
                &lt;/table&gt;<br/>
               </code></pre>
            </div>
        );
    }
    markout(data){
        const Head=Array.from({length: this.state.cols.length}, (v, k) => "---");
        return(
            <div id="htmlexport">
                <pre><code>
                    |{this.makecol(this.state.cols,'mark',true)}<br/>
                    |{this.makecol(Head,'mark')}<br/>

                    {this.marktable(data)}

                    | | | | |Total Cost |{this.props.total}|<br/>

               </code></pre>
            </div>
        );
    }


    makecol(cols,style,head){
        let children = [];
        switch(style) {
            case 'html':
                for (let j = 0; j < cols.length; j++) {
                    if(head){
                        children.push(<th key={j}>{cols[j]}</th>);
                    }else {
                        children.push(<td key={j}>{cols[j]}</td>);
                    }
                }
                return children;
            case 'htmlsrc':
            for (let j = 0; j < cols.length; j++) {
                if(head){
                    children.push(<span key={j}>&lt;th&gt; {cols[j]} &lt;/th&gt;</span>);
                }else {
                    children.push(<span key={j}>&lt;td&gt; {cols[j]} &lt;/td&gt;</span>);
                }
            }
            return children;
            case 'mark':
                for (let j = 0; j < cols.length; j++) {
                    children.push(<span key={j}> {cols[j]}|</span>);
                }
                return children;
        }

}
    htmltable(data){
        var items=[];
        for(let i=0;i<data.length;i++){
            const row=Object.values(data[i]);

            let children = this.makecol(row,'html')
            items.push(<tr key={i}>{children}</tr>);
        }
        // console.log(items);
        return items;
    }
    htmlsrctable(data){
        var items=[];
        for(let i=0;i<data.length;i++){
            const row=Object.values(data[i]);
            let children = this.makecol(row,'htmlsrc')
            items.push(<span key={i}>&lt;tr&gt; {children} &lt;/tr&gt;<br/></span>);
        }
        // console.log(items);
        return items;
    }
    marktable(data){
        var items=[];
        for(let i=0;i<data.length;i++){
            const row=Object.values(data[i]);
            let children = this.makecol(row,'mark')
            items.push(<span key={i}>|{children}<br/></span>);
        }
        // console.log(items);
        return items;
    }

    read_export(n) {

        var output = [];
        for (let cat = 0; cat < rawexport.length; cat++) {
            const state = rawexport[cat].state;
            // var data = [];
            for (let mod = 0; mod < state.length; mod++) {
                if((!this.state.rmvempty) || (state[mod].Provider!==''))
                output.push(
                    {
                        Category:rawexport[cat].data[0].Name,
                        Provider: state[mod].Provider,
                        Name: state[mod].Name,
                        Comments: state[mod].comments,
                        Options: this.read_options(state[mod].exportcmp),
                        Cost: state[mod].cost,
                    }
                );


            }}
            // output.push({
            //         ,
            //         Data: data
            //
            //     }


        return output;
    }
    read_options(Options){
        let output=[];
        for (let i = 0; i < Options.length; i++) {
            output.push(<span key={i}><b>{Options[i].Name}</b> : <i>{Options[i].Value}</i> <br/> </span> );
        }
        return output
    }

    fnSelect(objId){
        this.fnDeSelect();
        if (document.selection){
            var range = document.body.createTextRange();
            range.moveToElementText(document.getElementById(objId));
            range.select();
        }else if (window.getSelection){
            var range = document.createRange();
            range.selectNode(document.getElementById(objId));
            window.getSelection().addRange(range);
        }
    }
    fnDeSelect(){
        if (document.selection)
            document.selection.empty();
        else if (window.getSelection)
            window.getSelection().removeAllRanges();
    }
}

