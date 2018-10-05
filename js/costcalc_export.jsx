"use strict";

class ManageExport extends React.Component {
    constructor(props) {
        super(props);
        this.make_export = this.make_export.bind(this);
        this.make_copy = this.make_copy.bind(this);
        this.rmvempty = this.rmvempty.bind(this);
        this.hide = this.hide.bind(this);
        this.state={
            output:'',
            cols:["Category","Provider","Name","Comments","Options","Cost"],
            disp:false,
            rmvempty:false,
            typexp:"",

        }

    }

    render() {
        let opt="";
        let output="";
        if (this.state.disp){
            opt=this.options_btn();
            output=this.make_output(this.props.data.data);
        }

        return (
            <div id="export-group">
                <div className="card">
                    <div className="card-header">
                        {this.export_btn()}
                    </div>
                    <div className="card-body">
                        <div id="export-output" >
                            {output}

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
                <div className="col-auto">
                    <ButtonInput class="btn-dark" onClick={this.hide} id="btn-export" name="Hide Export" tips="Hide export"
                                 n="mark"/>
                </div>
            </div>
        );
    }
    rmvempty(){
        this.setState({rmvempty:!this.state.rmvempty});
        // this.make_export(this.typexp)
    }
    hide(){
        this.setState({disp:false})
    }
    make_copy(){
        this.fnSelect("export-output");
        document.execCommand("copy");
        this.fnDeSelect()
        alert("Copied");
    }
    make_output(rdata){
        const data=this.read_export(rdata,this.state.typexp);
        const hcol=this.state.cols;
        switch(this.state.typexp){
            case 'html':
                return this.htmlout(hcol,data);
            case 'htmlsrc':
                return this.htmlsrcout(hcol,data);
            case 'mark':
                return this.markout(hcol,data);
        }
    }
    make_export(typ){
        this.setState({typexp:typ});
        this.setState({disp:true});

    }

    htmlout(hcol,data){
        return(
            <div id="htmlexport" className="container">
                    <table className="table table-striped table-bordered" width="100%">
                        <thead className="thead-dark">
                            <tr>
                                {this.makecol(hcol,'html',true)}
                            </tr>
                        </thead>
                        <tbody>
                            {this.htmltable(data)}
                            <tr className="table-info">
                                <td colSpan={hcol.length-1} align="right"><strong>Total Cost</strong></td>
                                <td align="center"><strong>{this.props.data.total}</strong></td>
                            </tr>
                        </tbody>
                </table>
            </div>
        );
    }
    htmlsrcout(hcol,data){

        return(
            <div id="htmlexport">
                <pre><code>
                    &lt;table&gt;<br/>
                    &lt;thead&gt;<br/>
                    {this.makecol(hcol,'htmlsrc',true)}
                    &lt;/thead&gt;<br/>
                    &lt;tbody&gt;<br/>
                    {this.htmlsrctable(data)}
                    &lt;tr &gt;<br/>
                    &lt;td colSpan={hcol.length-1} align="right"&gt;&lt;strong&gt;Total Cost&lt;/strong&gt;&lt;/td&gt;&lt;td align="center"&gt;&lt;strong&gt;{this.props.data.total}&lt;/strong&gt;&lt;/td&gt;<br/>
                &lt;/tr&gt;<br/>
                &lt;/tbody&gt;<br/>
                &lt;/table&gt;<br/>
               </code></pre>
            </div>
        );
    }
    markout(hcol,data){
        const Head=Array.from({length: this.state.cols.length}, (v, k) => "---");
        const col=Array.from({length: hcol.length-1}, (v, k) => "| ");
        return(
            <div id="htmlexport">
                <pre><code>
                    |{this.makecol(hcol,'mark',true)}<br/>
                    |{this.makecol(Head,'mark')}<br/>

                    {this.marktable(data)}

                    {col} Total Cost |{this.props.data.total}|<br/>

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
        return items;
    }
    htmlsrctable(data){
        var items=[];
        for(let i=0;i<data.length;i++){
            const row=Object.values(data[i]);
            let children = this.makecol(row,'htmlsrc')
            items.push(<span key={i}>&lt;tr&gt; {children} &lt;/tr&gt;<br/></span>);
        }
        return items;
    }
    marktable(data){
        var items=[];
        for(let i=0;i<data.length;i++){
            const row=Object.values(data[i]);
            let children = this.makecol(row,'mark')
            items.push(<span key={i}>|{children}<br/></span>);
        }
        return items;
    }

    read_export(rawexport,n) {
        var output = [];
        for (let cat = 0; cat < rawexport.length; cat++) {
            const state = rawexport[cat];
            for (let mod = 0; mod < state.length; mod++) {
                if((!this.state.rmvempty) || (state[mod].Provider!==''))
                output.push(
                    {
                        Category:state[mod].Category,
                        Provider: state[mod].Provider,
                        Name: state[mod].Name,
                        Comments: state[mod].Comments,
                        Options: this.read_options(state[mod].ExportCmp),
                        Cost: state[mod].Cost,
                    }
                );


            }}
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

