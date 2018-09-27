'use strict';

// Functions Tools
// ---------------------
// ---------------------
function Repeat(props) {
    let items = [];
    for (let i = 0; i < props.numTimes; i++) {
        items.push(props.children(i));
    }
    return <div>{items}</div>;
}

function tonumeric (value) {
    return parseFloat(
        value.toString().replace(/[^0-9\.]+/g, '')
    );
}

function tomoney(numeric) {
    if (typeof numeric == 'string') {
        numeric = parseFloat(numeric);
    }

    return numeric.toFixed(0).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' '+MainData.Currency;
}

function sum(obj) {
    const val=Object.values(obj);
    var total = 0;
    for (var i = 0; i < val.length; i++) {
        total = total + tonumeric(val[i]);
    }
    return total;
}

// Inputs Definition
// ---------------------
// ---------------------
class AmountInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onChange(e.target.value);
    }

    render() {
        const value = this.props.value;
        return (
            <div className="col"   >
                <span data-toggle="tooltip" data-placement="top" title={this.props.tips}>
                <label htmlFor={this.props.id}> {this.props.name} </label>
                <input type="range" className="form-control-range" id={this.props.id} min={this.props.min} max={this.props.max}
                       step={this.props.step} value={value}  onChange={this.handleChange}/>
                <small id="nas-amount-cost" className="form-text text-muted">Amount : {value} {this.props.unit} </small>
                </span>
            </div>
        );
    }
}

class SelectorInput extends React.Component {
    constructor(props) {
        super(props);
        // this.state={listoptions:this.makelist(props.options)};
        this.handleChange = this.handleChange.bind(this);

    }
    rate(i){
        return i;
    }
    makelist(data){
        var listoptions=[];

        for (var i = 0; i < data.length; i++) {
            listoptions.push(<button className="dropdown-item btn-success " type="button" key={i}  value={this.rate(i)} onClick={this.handleChange}>{data[i]}</button>);
        }
        return listoptions;
    }
    handleChange(select) {
        this.props.onChange(select.target.value);
    }
    makerate(){
        if (this.props.rate!=null){
            return( <small id="nas-amount-cost" className="form-text text-muted">Rate : {this.props.rate}  {this.props.unit}</small> );}
    }
    maketitle(title){
        const maxstr=20
        if (title.length>maxstr){
            title=title.substr(0,maxstr)+"...";
        }
        return title;
    }
    render() {
        return (

            <div className="Container">

                <div className="row">
                    <label htmlFor={this.props.id}> {this.props.name} </label>
                </div>


                <div className="row">
            <div className="btn-group">


                <a className={"btn "+this.props.class+" dropdown-toggle"} href="#" role="button" id={this.props.id} data-toggle="dropdown"
                   aria-haspopup="true" aria-expanded="false" >
            <span  data-toggle="tooltip" data-placement="top" title={this.props.tips}>
                    {this.maketitle(this.props.options[this.props.selected])}
            </span>
                </a>
                    <div className="dropdown-menu" aria-labelledby={this.props.id}>
                      {this.makelist(this.props.options)}
                    </div>

           </div>
            </div>
            <div className="row">
                {this.makerate()}
            </div>
            </div>
        )
    }
}

class MakeknowmoreInput extends React.Component {
    constructor(props) {
        super(props);
        this.state={btnsize:20}
    }
    render() {
        const data = this.props.data;
        if (((data.Url !== '') )) {
            // if (data.Url.length==1){
            //     return(
            //         <ButtonHrefInput name={<img src="./icons/info.png" width={this.state.btnsize}/>} url={data.Url[0].Url}
            //     id="btn-plugin-knowmore"
            // class="btn-primary btn-sm" tips={"Know more about " + data.Name}/>
            //     );
            // }else {
            return (<MenuInput name={<img src="./icons/info.png"  width={this.state.btnsize}/>} options={data.Url}
                               id="btn-plugin-knowmore"
                               class="btn-primary btn-sm" tips={"Know more about " + data.Name}/>);
        //}
        }
        else{
            return null
        }

    }
}

class CheckboxInput extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state={checked:this.props.defaults};
    }

    handleChange() {

        this.setState({checked: !this.state.checked});
        this.props.onChange(!this.state.checked);

    }

    render() {
        return (
            <div className="form-check">
                <input className="form-check-input" type="checkbox"  id={this.props.id} onChange={this.handleChange}
                       defaultChecked={this.state.checked}/>
                    <label className="form-check-label" htmlFor={this.props.id}>{this.props.name}</label>
            </div>
        );
    }
}

class ButtonHrefInput extends React.Component {

    constructor(props) {
        super(props);
    }



    render() {
        return (
            <a id={this.props.id} href={this.props.url} type="button" className="btn btn-primary" data-toggle="tooltip" data-placement="top" title={this.props.tips}  aria-disabled="true" target="_blank">{this.props.name}</a>
        );
    }
}

class ButtonInputWpop extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state={target:"Modal"+this.props.idp};

    }

    handleChange() {
        const out={n:this.props.n,target:this.state.target};
        this.props.onClick(out);

    }

    render() {
        return (
            <span>
                <button type="button" className={"btn "+ this.props.class} id={this.props.id} data-toggle="modal" data-target={"#"+this.state.target}>
                    {this.props.name}
                </button>

                <div className = "modal fade" id = {this.state.target} tabIndex = "-1" role = "dialog" >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" >Are you sure you want to suppress this line ?</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                You are removing a item. Please confirm you want to suppress : {this.props.info}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <button type="button" className="btn btn-danger" onClick={this.handleChange}>Yes I want to remove it</button>
                            </div>
                        </div>
                    </div>
                </div>
            </span>
        );
    }
}

class ButtonInput extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {

        this.props.onClick(this.props.n);

    }

    render() {
        return (
            <span>
                <button id={this.props.id} onClick={this.handleChange} type="button"
                        className={"btn "+ this.props.class} data-toggle="tooltip" data-placement="top"
                        title={this.props.tips}>{this.props.name}</button>
            </span>
        );
    }
}

class MenuInput extends React.Component {
    constructor(props) {
        super(props);
        this.state={listoptions:this.makelist(props.options)};

    }

    makelist(data){
        var listoptions=[];
        for (var i = 0; i < data.length; i++) {
            listoptions.push(<a className="dropdown-item" href={data[i].Url} key={data[i].Name} target="_blank">{data[i].Name}</a>);
        }
        return listoptions;
    }

    render() {
        return (

            <div className="btn-group">
                <a className={"btn "+this.props.class+" btn-sm dropdown-toggle"} href="#" role="button" id={this.props.id} data-toggle="dropdown"
                   aria-haspopup="true" aria-expanded="false" >
                     <span data-toggle="tooltip" data-placement="top" title={this.props.tips}>
                    {this.props.name}
                     </span>
                </a>
                <div className="dropdown-menu" aria-labelledby={this.props.id}>
                    {this.state.listoptions}
               </div>
            </div>
        );
    }
}

class TxtInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onChange(e.target.value);
    }

    render() {
        return (
            <span data-toggle="tooltip" data-placement="top" title={this.props.tips}>
                <label htmlFor={this.props.id}> {this.props.name} </label>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroupPrepend2">{this.props.Prepend}</span>
                    </div>
                    <input type="text" className={"form-control "+this.props.class} id={this.props.id} placeholder={this.props.placeholder} onChange={this.handleChange} value={this.props.value} />
                    <div className="invalid-feedback">
                        {this.props.InvalidMessage}
                    </div>
                </div>
            </span>
        );
    }
}

// Outputs definition
// ---------------------
// ---------------------
class CostOutput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        this.props.onCostChange(this.props.display);
    }

    render() {
        return (
            <div className={"form-group row align-items-center"}>
                <label htmlFor={this.props.id} className={"col-form-label"}>{this.props.name}</label>
                <div className="col align-self-center">
                    <input type={"text"} className={"form-control"} id={this.props.id} className={"form-control"}
                       value={this.props.value} onChange={this.handleChange} readOnly data-toggle="tooltip" data-placement="top" title={this.props.tips}/>
                </div>
            </div>
        );
    }
}

function Textoutput(props){
    return(
        <div className="alert alert-primary" role="alert" data-toggle="tooltip" data-placement="top" title="Expand this...">
            {props.text}
        </div>
    );
}

// Plugins definition
// ---------------------
// ---------------------
class AmountRatesCost extends React.Component {
    constructor(props) {
        super(props);
        this.state={amount : 1, SelectRate : 0 , Rate : this.props.data.Rates[Object.keys(this.props.data.Rates)[0]]};
        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.handleRateChange = this.handleRateChange.bind(this);
    }
    handleAmountChange(amount) {
        this.setState({amount: amount});
    }
    handleRateChange(select) {
        this.setState({SelectRate: select});
        this.setState({Rate: this.props.data.Rates[Object.keys(this.props.data.Rates)[select]]});
    }

    render() {
        const Amount = this.state.amount;
        const Rate=this.state.Rate;
        const Cost=this.makecost(Amount,Rate);

        return (
            <div className="row align-items-center">
                <div className="col">
                <AmountInput id={this.props.id} min={this.props.data.AmountMin} max={this.props.data.AmountMax}
                             step={this.props.data.AmountStep} value={Amount} name={this.props.data.AmountName}
                             unit={this.props.data.AmountUnit} onChange={this.handleAmountChange} tips="Select the desired amount"/>
                </div>
                <div className="col-3">
                    <SelectorInput id={this.props.id+'-Rates'} name={this.props.data.RateName} options={Object.keys(this.props.data.Rates)}
                                   class="btn-secondary" selected={this.state.SelectRate} rate={Rate} unit={this.props.data.RateUnit} onChange={this.handleRateChange} />
                </div>
                {/*<CostOutput id={this.props.name+'-Cost'} name={"Cost"} value={Cost} />*/}
            </div>
        );
    }
    makecost(amount,rate) {
        if (amount<=this.props.data.AmountFree){
            amount=0;
        }
        var total=amount*rate;
        total=tomoney(total);
        this.props.onCostChange(this.props.n,total);
        return total;
    }
    }

class CategoryAmountRatesCost extends React.Component {
    constructor(props) {
        super(props);
        this.state={SelectCat : 0,  Cat : this.props.data.Cat[Object.keys(this.props.data.Cat)[0]],
            amount : 1, SelectRate : 0 , Rate : this.props.data.Rates[Object.keys(this.props.data.Rates)[0]]};
        this.handleCatChange = this.handleCatChange.bind(this);
        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.handleRateChange = this.handleRateChange.bind(this);
        // this.handleCostChange = this.handleCostChange.bind(this);

    }
    handleAmountChange(amount) {
        this.setState({amount: amount});
    }
    handleRateChange(select) {
        this.setState({SelectRate: select});
        this.setState({Rate: this.props.data.Rates[Object.keys(this.props.data.Rates)[select]]});
    }

    handleCatChange(select) {
        this.setState({SelectCat: select});
        this.setState({Cat: this.props.data.Cat[Object.keys(this.props.data.Cat)[select]]});
    }

    render() {
        const Cat=this.state.Cat;
        const Amount = this.state.amount;
        const Rate=this.state.Rate;
        const Cost=this.makecost(Cat,Amount,Rate);

        return (
            <div className="row align-items-center">
                <div className="col-3">
                     <SelectorInput id={this.props.id+'-category'} name={this.props.data.CatName} options={Object.keys(this.props.data.Cat)} rate={Cat}
                                    class="btn-secondary" selected={this.state.SelectCat} unit={this.props.data.CatUnit} onChange={this.handleCatChange} />
                </div>

                <div className="col-4">
                <AmountInput id={this.props.id} min={this.props.data.AmountMin} max={this.props.data.AmountMax} step={this.props.data.AmountStep}
                             value={Amount} name={this.props.data.AmountName} unit={this.props.data.AmountUnit} onChange={this.handleAmountChange} />
                </div>
                <div className="col-4">
                    <SelectorInput id={this.props.id+'-Rates'} name={this.props.data.RateName} options={Object.keys(this.props.data.Rates)} rate={Rate}
                                   class="btn-secondary" selected={this.state.SelectRate} unit={this.props.data.RateUnit} onChange={this.handleRateChange} />
                </div>

                {/*<CostOutput id={this.props.name+'-Cost'} name={"Cost"} value={Cost} />*/}
            </div>
        );
    }
    makecost(cat,amount,rate) {
        if (amount<=this.props.data.AmountFree){
            amount=0;
        }
        var total=cat+amount*rate;
        total=tomoney(total);
        this.props.onCostChange(this.props.n,total);
        return total;
    }
}

class CategoryCost extends React.Component {
    constructor(props) {
        super(props);
        this.state={SelectCat : 0,  Cat : this.props.data.Cat[Object.keys(this.props.data.Cat)[0]]};
        this.handleCatChange = this.handleCatChange.bind(this);

    }


    handleCatChange(select) {
        this.setState({SelectCat: select});
        this.setState({Cat: this.props.data.Cat[Object.keys(this.props.data.Cat)[select]]});
    }

    render() {
        const Cat=this.state.Cat;

        const Cost=this.makecost(Cat);

        return (
            <div className="row align-items-center">
                <div className="col-4">
                    <SelectorInput id={this.props.id+'-category'} name={this.props.data.CatName} options={Object.keys(this.props.data.Cat)} rate={Cat}
                                   class="btn-secondary" selected={this.state.SelectCat} unit={this.props.data.CatUnit} onChange={this.handleCatChange} />

                </div>
            </div>
        );
    }
    makecost(cat) {
        var total=cat;
        total=tomoney(total);
        this.props.onCostChange(this.props.n,total);
        return total;
    }
}

class NoneSelect extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {
        const Cost=tomoney(0);
        this.props.onCostChange(this.props.n,Cost);

        return (<div className="alert alert-info" id="infotxt">
                Please select a provider in the list.

            </div>
        );
    }

}

class UserCost extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleProviderChange = this.handleProviderChange.bind(this);
        this.handleServiceChange = this.handleServiceChange.bind(this);
        this.state={total:0,
            CostError:false,
            ProviderError:true,
            ServiceError:true,
        };
    }
    handleChange(value){
        if (isNaN(value)||value===''){
           console.log("Nan Detected");
           this.setState({CostError: true});
           value=0;
        }else{
            this.setState({CostError: false});
        }
        this.setState({total:value});
        this.props.onCostChange(this.props.n,tomoney(value));
    }
    handleProviderChange(txt){
        this.props.handleProviderChange(txt);
        if(txt ===''){
            this.setState({ProviderError: true});
        }
        else {
            this.setState({ProviderError: false});
        }
    }
    handleServiceChange(txt){
        this.props.handleServiceChange(txt);
        if(txt ===''){
            this.setState({ServiceError: true});
        }
        else {
            this.setState({ServiceError: false});
        }
    }
    classtxt(error){
        if(error){
            return "is-invalid";
        }
        else {
            return "is-valid";
        }
    }
    render() {
        // this.handleChange(this.state.total);
        return (<div className="row align-items-baseline">
                <div className="col-3">
                    <TxtInput id={this.props.id+'-input'}  name="Provider" placeholder="Put your provider here" tips="Add your own cost calculation here" onChange={this.handleProviderChange}
                              class={this.classtxt(this.state.ProviderError)} Prepend="" InvalidMessage="Please provide a Provider"/>
                </div>
                <div className="col-3">
                    <TxtInput id={this.props.id+'-input'}  name="Service" placeholder="Put your service here" tips="Add your own cost calculation here" onChange={this.handleServiceChange}
                              class={this.classtxt(this.state.ServiceError)} Prepend="" InvalidMessage="Please provide a Service"/>
                </div>
                <div className="col-3">
                   <TxtInput id={this.props.id+'-input'}  name="Cost" placeholder="Put your cost here" tips="Add your own cost calculation here" onChange={this.handleChange}
                             class={this.classtxt(this.state.CostError)} Prepend={MainData.Currency} InvalidMessage="Please provide a correct numerical value" />
                </div>
            </div>
        );
    }

}

// Combine plugins
// ---------------------
// ---------------------
class ProviderPluginsSelector extends React.Component {
    constructor(props) {
        super(props);
        this.handleCostChange = this.handleCostChange.bind(this);
        this.handleProviderChange = this.handleProviderChange.bind(this);
        this.handleCommentChange = this.handleCommentChange.bind(this);
        this.handleAddPlugin = this.handleAddPlugin.bind(this);
        this.handleRmvPlugin = this.handleRmvPlugin.bind(this);
        this.handleProviderChangetxt = this.handleProviderChangetxt.bind(this);
        this.handleServiceChangetxt = this.handleServiceChangetxt.bind(this);
        this.state={
            selected:0,
            keys:this.ProvidersName(props.data),
            n:1,
            cost:0,
            prevcost:0,
            comments:"",
            Provider:"",
            Name:"",
            manualname:false,
        };
    }

    handleCostChange(n,e) {
        if (this.state.prevcost !== e ) {
            this.setState({cost: e});
            this.setState({prevcost: e});

        this.props.handleCostChange(n,e);}
    }
    handleProviderChange(select){
        this.state.Provider='';
        this.state.Name='';
        this.setState({selected:select});
        // this.setState({Cdata:this.cmpdata(this.state.selected)});
        // this.setSate({kmm:this.makemenu(this.state.Cdata,0)});
    }
    handleCommentChange(com){

        this.setState({comments:com});
    }
    handleAddPlugin(n){
        this.props.handleAddPlugin(n);
    }
    handleRmvPlugin(n){
        this.props.handleRmvPlugin(n);
    }

    handleProviderChangetxt(txt){
        this.setState({Provider:txt});


    }
    handleServiceChangetxt(txt){
        this.setState({Name:txt});
    }

    render() {
        // console.log("n= "+this.props.n)
        const selected=this.state.selected;
        this.state.manualname=false;
        this.state.keys=this.ProvidersName(this.props.data);
        const Cmp=this.cmp2string(this.cmpdata(selected).Style);
        const Cdata=this.cmpdata(selected);
        const id=this.props.data.Name.replace(/\s/g,'')+this.props.n;

        return(
           <div id={"plugin"}>

                <div className="card-header" id={id}>
                    <ModuleHeader id={id} data={this.props.data} selected={selected} Cdata={Cdata} n={this.props.n} Cost={this.state.cost}
                    comments={this.state.comments} handleAddPlugin={this.handleAddPlugin} handleRmvPlugin={this.handleRmvPlugin}
                                  keys={this.state.keys} show_minus={this.props.show_minus} />
                </div>


                <div id={"collapse"+id} className="collapse" aria-labelledby={id} data-parent="#accordion">
                    <div className="card-body">

                            <div className="row align-items-end">
                                <div className="col-auto">
                                    <div id="provider-selector" >
                                         <SelectorInput id="providerselect" name="Select a provider" selected={selected} options={this.state.keys}
                                                   class="btn-primary lg-btn" onChange={this.handleProviderChange} tips="Select a provider"/>
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <div id="plugin-knowmore" >
                                        <MakeknowmoreInput key={selected} data={Cdata}  name="" n="0" />
                                    </div>
                                </div>
                                <div className="col-4">
                                    <TxtInput type="text" id="module-comments" name="My Comments"
                                              placeholder="I can put a comment here..." onChange={this.handleCommentChange}/>
                                </div>
                            </div>

                            <div id="component" className="container bg-light">
                                <Cmp data={Cdata} key={selected} id="component-settings" onCostChange={this.handleCostChange} n={this.props.n}
                                handleProviderChange={this.handleProviderChangetxt} handleServiceChange={this.handleServiceChangetxt}/>
                            </div>
                    </div>
                </div>
            </div>
        );
    }


    cmpdata(select){
        let out=this.props.data.Data[select];
        if (this.state.manualname){
            out.Name=this.state.Name;
            if ( this.state.Provider ==='') {
                this.state.keys[select] = 'Please provide a Provider';
            }else {
                this.state.keys[select]=this.state.Provider;
            }
            }
        return out;
        }

    cmp2string(str){
        switch (str) {
            case "AmountRatesCost" : return AmountRatesCost;
            case "CategoryCost" : return CategoryCost;
            case "CategoryAmountRatesCost" : return CategoryAmountRatesCost;
            case "NoneSelect":return NoneSelect;
            case "UserCost":{this.state.manualname=true;  return UserCost;}

        }
    }
    ProvidersName(main){
        const data = main.Data;
        // console.log(data);

        var providers=[];
        for (var i = 0; i < data.length; i++) {
            providers.push(data[i].Provider);
        }
        return providers;
    }

}

function makeinfo(keys,selected,Cdata){
    let name=Cdata.Name;
    if ( name ===''&&keys[selected]===''){
        name='Please provide a Provider';
        return  (<span id="module-name">{name}</span>);
    }else if(keys[selected]==='None'){
        return  (<span id="module-name">{name}</span>);
    }else{
        return  (<span><span id="module-provider">{keys[selected]} : </span>  <span id="module-name">{name}</span></span>);
    }
}

class ModuleHeader  extends React.Component{
    constructor(props) {
        super(props);
        this.handleAddPlugin = this.handleAddPlugin.bind(this);
        this.handleRmvPlugin = this.handleRmvPlugin.bind(this);
    }
    handleAddPlugin(n){
        this.props.handleAddPlugin(n);
    }
    handleRmvPlugin(n){
        this.props.handleRmvPlugin(n);
    }
    render() {
        let minus='';
        if (this.props.show_minus){
            minus=<ButtonInputWpop class="btn-danger btn-sm" id="plugins-add-btn"
                                   name={<img className="img-fluid" src="icons\minus.png" width="20"/>}
                                   onClick={this.handleRmvPlugin} n={this.props.n} tips={"Remove this line"}
                                    idp={this.props.id} info={this.props.data.Name}/>;
        }
 return(
     <div className="container">
         <div className="row align-items-center">
             <div className="col-1 align-self-start">
                 <div className="row">
                 <div className="col-auto" id="plugin-add">
                     <ButtonInput class="btn-success btn-sm" id="plugins-add-btn" name={<img className="img-fluid" src="icons\plus.png" width="20"/>}
                                  onClick={this.handleAddPlugin} n={this.props.n} tips={"Add a new "+this.props.data.Name}/>
                 </div>
                 <div className="col-auto" id="plugin-add">
                     {minus}
                 </div>
                 </div>
                 <div id="plugin-knowmore">
                     <MakeknowmoreInput data={this.props.data} n={this.props.n}/>
                 </div>
            </div>
             <div  className=" col-1 align-self-start">
                 <img className="img-fluid" src={"icons/"+this.props.data.Icon} width="100"/>
             </div>
             <div className="col-3 ">
                 <div className="row align-items-end">
                     <div className="col-auto">
                                    <span data-toggle="tooltip" data-placement="top" title="Expand this..." >
                                        <button className="btn btn-outline-primary  dropdown-toggle" type="button" data-toggle="collapse" data-target={"#collapse"+this.props.id}
                                                aria-expanded="false" aria-controls={"collapse"+this.props.id} id="btn-plugins" >
                                            <span id={"plugin-number"}> {this.props.n+1}. </span> <span id={"plugin-name"}>{this.props.data.Name}</span>
                                        </button>
                                    </span>

                     </div>
                 </div>
             </div>
             <div id="plugin-info" className="col-4">
                 <div className="row">
                     {makeinfo(this.props.keys,this.props.selected,this.props.Cdata)}
                 </div>
                 <div className="row">
                     {this.props.comments}
                 </div>
             </div>

             <div id="plugin-cost" className="col-2 align-self-end">
                 <CostOutput id="ccost" name={"Cost"} value={this.props.Cost} tips="Total cost for this provider"/>
             </div>

         </div>

     </div>
 );
    }

}

class ManagePlugins extends React.Component{
    constructor(props) {
        super(props);
        this.handleCostChange = this.handleCostChange.bind(this);
        this.handleAddPlugin = this.handleAddPlugin.bind(this);
        this.handleRmvPlugin = this.handleRmvPlugin.bind(this);
        this.handletest = this.handletest.bind(this);

        this.state={
            displayed:[],
            varsum:{},
            plugins:[],
        };
        this.state.displayed.push(this.randomint());
        this.export=[];
    }
    handleRmvPlugin(n){
        $('#'+n.target).modal('hide');
        var tmp=this.state.displayed;
        tmp.splice(n.n,1);
        this.setState({displayed:tmp});
        this.handleCostChange(n.n,0);
    }
    handleAddPlugin(n){
        console.log("add")
        var tmp=this.state.displayed;
        tmp.splice(n+1,0,this.randomint());
        this.setState({displayed:tmp});
    }
    handleCostChange(n,cost) {
        this.state.varsum[n]=cost;
        this.props.handleCostChange(this.props.n,sum(this.state.varsum));
    }
    handletest(n){
        console.log(this.export[0])
    }

    randomint(){
        const tmp=this.state.displayed;
        var rnd;
        do {
            rnd=Math.floor(Math.random() * 100);
            var cont=false;
            for (let i = 0; i < tmp.length ; i++) {
                if (tmp[i]===rnd){
                    cont=true;
                }
            }
        } while(cont);
        return rnd;
    }
    give_id(index){
        return this.state.displayed[index]
    }
    give_n(){
        const disp=this.state.displayed;
        return disp.length
    }

    render() {
        let show_minus = false;
        if (this.give_n()>1) {
            show_minus=true;
        }
           return(
               <div>
    <Repeat numTimes={this.give_n()}>
        {(index) => <ProviderPluginsSelector data={this.props.data} key={this.state.displayed[index]}
                                 show_minus={show_minus} n={index}
                                 handleCostChange={this.handleCostChange} handleAddPlugin={this.handleAddPlugin}
                                             handleRmvPlugin={this.handleRmvPlugin} ref={(input) => {this.export[index] = input }}/>}
    </Repeat>
                   {/*<ButtonInput name={'test'} onClick={this.handletest}/>*/}
               </div>



        );}


}

class PluginsMain extends React.Component {
    constructor(props) {
        super(props);
        this.handleCostChange = this.handleCostChange.bind(this);
        this.state={'varsum':{}};
    }

    handleCostChange(name,e) {
        // console.log("name"+name);
        this.state.varsum[name]=e;
        this.props.TotalCost(sum(this.state.varsum));

    }
    render() {

        return(
            <div className="card">
                <Repeat numTimes={this.props.data.length}>
                    {(index) => <ManagePlugins data={this.props.data[index]} key={index}
                                                         n={index} handleCostChange={this.handleCostChange}/>}
                </Repeat>
            </div>
        );
    }

}

// MAIN
// ---------------------
// ---------------------
class Main extends React.Component {
    constructor(props) {
        super(props);
        this.handleCostChange = this.handleCostChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state={'total':0,'prevtotal':0};
        this.input = React.createRef();
    }

    handleCostChange(total) {
        // console.log("there total : "+total )
        if (this.state.prevtotal !== total){
            // console.log("updated :"+total);
            // console.log("prev :"+this.state.prevtotal);
            this.setState({'total':total});
            this.setState({'prevtotal':total});
        }

    }
    handleSubmit(event) {
        // alert('A name was submitted: ');
        event.preventDefault();
        console.log(this.input.current);

        //console.log(this.input)
        var json = toJSONString(this.input.current);
        console.log(json);
    }
    render() {
        return(
            <form id="mainform"  method="post" onSubmit={this.handleSubmit} ref={this.input}>
                <div className={"container"}>
                    <div className={"accordion"} id={"accordion"}>
                        <div className="card ">
                            <div className="card-header ">
                                <h2> <img src="./icons/sliders.png" width="40"/> HOWTO</h2>
                            </div>
                            <div className="card-body">
                                <dl className="row">
                                    <dt className="col-sm-3">Categories</dt>
                                    <dd className="col-sm-9">
                                        This tool is divided by category (for example Activate storage) by clicking
                                        on the category name, and it will expand.
                                    </dd>
                                </dl>
                                <dl className="row">
                                    <dt className="col-sm-3">Providers</dt>
                                    <dd className="col-sm-9">
                                        <p>
                                            Providers can be chosen from the <mark>Select a provider box</mark> You can then tune your setting for this provider to fit your needs.
                                        </p>

                                        <p>
                                            If the provider you want is not registered, you can add it manually with <mark>Provide your own provider</mark> and then enter your provider/service and cost.
                                        </p>
                                    </dd>
                                </dl>
                                <dl className="row">
                                    <dt className="col-sm-3">Add or Remove Line</dt>
                                    <dd className="col-sm-9">
                                        <p>If you want to add a new provider use the <ButtonInput class="btn-success btn-sm" id="plugins-add-btn" name={<img className="img-fluid" src="icons\plus.png" width="20"/>}
                                                                                                  tips={"Add a new category"}/> button.
                                        </p>
                                        <p>
                                            You can also remove a provider with <ButtonInput class="btn-danger btn-sm" id="plugins-add-btn"
                                                                                             name={<img className="img-fluid" src="icons\minus.png" width="20"/>}
                                                                                             tips={"Remove this line"}/> button.
                                        </p>
                                    </dd>
                                </dl>
                                <dl className="row">
                                    <dt className="col-sm-3">To know more about</dt>
                                    <dd className="col-sm-9">
                                        Some extra information about the category or the provider can be obtained with the <ButtonInput class="btn-primary btn-sm" id="plugins-add-btn"
                                                                                                                                        name={<img className="img-fluid" src="icons\info.png" width="20"/>}
                                                                                                                                        tips={"Know more"}/> button.
                                    </dd>
                                </dl>
                                <dl className="row">
                                    <dt className="col-sm-3">Comments your input</dt>
                                    <dd className="col-sm-9">
                                        Comments are for your personnal usage, you can use for remembering what each section is and for a nice export.
                                    </dd>
                                </dl>
                            </div>
                            <div className="card-footer text-white bg-dark">
                                <div className="row">
                                    <div className="col-2 text-center">
                                        Line controls
                                    </div>

                                    <div className="col-3 text-center">
                                        Category
                                    </div>
                                    <div className="col-4 text-center">
                                        Provider information
                                    </div>
                                    <div className="col-2 text-center">
                                        Cost
                                    </div>
                                </div>
                            </div>
                        </div>


                        <PluginsMain TotalCost={this.handleCostChange} data={MainData.Data} />
                    </div>
                    <div className="card" id="finalcost">
                        <div className="card-header ">
                            <div className="container row">
                                <div className="col-1">
                                </div>
                                <div className="col-1">
                                     <img className="img-fluid" src="./icons/totalcost.png" width="100"/>
                                </div>
                                <div className="col-5 align-self-start" id="plugin-name">
                                    <h3>Total Cost</h3>
                                </div>
                                <div id="plugin-cost" className="col-5  text-right ">
                                    <CostOutput name={"Total Cost per year"} id={"ctotal"} value={tomoney(this.state.total)} tips="Total cost per year"/>
                                </div>
                            </div>

                        </div>
                        <div className="card-body">
                            {/*<input type="submit" value="Send" className="btn btn-primary btn-block"/>*/}
                            <pre id="output"></pre>

                        </div>
                        <div className="card-footer">
                            <div className="alert alert-danger" role="alert" id="infotxt">
                                The values published on this service are only informative and cannot be used for exact calculation. If you see some mistake or would like to
                                have another services please contact us.
                            </div>
                            <div id="service">
                                <p>This service has been developed by the <a href="https://researchdata.epfl.ch">Resarch Data Management Team</a> of the <a href="https://library.epfl.ch">EPFL Library</a>  <br/>
                                    This software is publish under CC0 and your are using <strong> Version beta 1.7</strong><br/>
                                    Source code can be download <a href="https://c4science.ch/source/costcalc/">here</a></p>
                                <p><small>Icons are from the Noun Project (Book by Randi NI, Storage by I Pitu, Database by Novalyi, data cloud by Vectors Market)</small></p>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}


//Main Declaration
// ---------------------
// ---------------------
ReactDOM.render(<Main />,document.getElementById('root'));


$(function () {
    $('[data-toggle="tooltip"]').tooltip()
});


