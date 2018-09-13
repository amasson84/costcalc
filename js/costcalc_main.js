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

    return numeric.toFixed(0).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' CHF';
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
        // if(this.props.rate==null){
        //     return i;
        // }else{
        //     return this.props.rate[i];
        // }
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
    }
    render() {
        const data = this.props.data;
        const n = this.props.n;
        if (((data.url != '') || (data.url == null)) && (n == 0)) {
            if (data.url.length==1){
                return(
                    <ButtonHrefInput name={<img src="./icons/info.png" height="20" width="20"/>} url={data.url[0].url}
                id="btn-plugin-knowmore"
            class="btn-primary" tips={"Know more about " + data.name}/>
                );
            }else {
            return (<MenuInput name={<img src="./icons/info.png" height="20" width="20"/>} options={data.url}
                               id="btn-plugin-knowmore"
                               class="btn-primary" tips={"Know more about " + data.name}/>);}
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
            <button id={this.props.id} onClick={this.handleChange} type="button" className="btn btn-primary" data-toggle="tooltip" data-placement="top" title={this.props.tips}>{this.props.name}</button>
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
            listoptions.push(<a className="dropdown-item" href={data[i].url} key={data[i].name} target="_blank">{data[i].name}</a>);
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
        const value = this.props.value;
        return (
            <div className="col">
                <label htmlFor={this.props.id}> {this.props.name} </label>
                <input type="text" className="form-control" id="formGroupExampleInput" placeholder={this.props.placeholder} onChange={this.handleChange} value={value}
                       data-toggle="tooltip" data-placement="top" title={this.props.tips}/>
            </div>
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
                <AmountInput id={this.props.name} min={this.props.data.AmountMin} max={this.props.data.AmountMax}
                             step={this.props.data.AmountStep} value={Amount} name={this.props.data.AmountName}
                             unit={this.props.data.AmountUnit} onChange={this.handleAmountChange} tips="Select the desired amount"/>
                </div>
                <div className="col-3">
                    <SelectorInput id={this.props.name+'-Rates'} name={this.props.data.RateName} options={Object.keys(this.props.data.Rates)}
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
                     <SelectorInput id={this.props.name+'-category'} name={this.props.data.CatName} options={Object.keys(this.props.data.Cat)} rate={Cat}
                                    class="btn-secondary" selected={this.state.SelectCat} unit={this.props.data.CatUnit} onChange={this.handleCatChange} />
                </div>

                <div className="col-4">
                <AmountInput id={this.props.name} min={this.props.data.AmountMin} max={this.props.data.AmountMax} step={this.props.data.AmountStep}
                             value={Amount} name={this.props.data.AmountName} unit={this.props.data.AmountUnit} onChange={this.handleAmountChange} />
                </div>
                <div className="col-4">
                    <SelectorInput id={this.props.name+'-Rates'} name={this.props.data.RateName} options={Object.keys(this.props.data.Rates)} rate={Rate}
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
                    <SelectorInput id={this.props.name+'-category'} name={this.props.data.CatName} options={Object.keys(this.props.data.Cat)} rate={Cat}
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

        this.state={
            selected:0,
            keys:this.ProvidersName(props.data),
            enabled :true,
            n:1,
            cost:0,
            prevcost:0,
            comments:"",
        };
    }

    handleCostChange(n,e) {
        // console.log("here n : "+n+" e = "+ e);
        if(! this.state.enabled){
            e=0;
        }
        if (this.state.prevcost != e ) {
            this.setState({cost: e});
            this.setState({prevcost: e});

        this.props.handleCostChange(n,e);}
    }
    handleProviderChange(select){

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




    render() {
        // console.log("n= "+this.props.n)
        const Cmp=this.cmp2string(this.cmpdata(this.state.selected).style);
        const Cdata=this.cmpdata(this.state.selected);
        const id=this.props.data.name.replace(/\s/g,'')+this.props.n;
        const selected=this.state.selected;


        return(
           <div id={"plugin"}>

                <div className="card-header" id={id}>
                    <ModuleHeader id={id} data={this.props.data} selected={selected} Cdata={Cdata} n={this.props.n} Cost={this.state.cost}
                    comments={this.state.comments} handleAddPlugin={this.handleAddPlugin} keys={this.state.keys}/>
                </div>


                <div id={"collapse"+id} className="collapse" aria-labelledby={id} data-parent="#accordion">
                    <div className="card-body">

                            <div className="container">
                            <div className="row align-items-end">
                            <div id="provider-selector" className="col-auto">

                                <SelectorInput id="providerselect" name="Select a provider" selected={selected} options={this.state.keys}
                                               class="btn-primary lg-btn" onChange={this.handleProviderChange} tips="Select a provider"/>
                            </div>
                                <div className="col-1">
                                    <MakeknowmoreInput key={selected} data={Cdata} truc={Cmp}  name="" n="0" />
                                </div>
                                <div className="col-4">
                                    <TxtInput id="module-comments" name="My Comments" placeholder="I can put a comment here..." onChange={this.handleCommentChange}/>
                                </div>
                            </div>
                            </div>

                            <div id="component" className="container bg-light">
                                <Cmp data={Cdata} key={selected} name="" onCostChange={this.handleCostChange} n={this.props.n} />
                            </div>
                    </div>
                </div>
            </div>
        );
    }


    cmpdata(select){return this.props.data.data[select];}

    cmp2string(str){
        switch (str) {
            case "AmountRatesCost" : return AmountRatesCost;
            case "CategoryCost" : return CategoryCost;
            case "CategoryAmountRatesCost" : return CategoryAmountRatesCost;
            case "NoneSelect":return NoneSelect;

        }
    }
    ProvidersName(main){
        const data = main.data;
        // console.log(data);

        var providers=[];
        for (var i = 0; i < data.length; i++) {
            providers.push(data[i].provider);
        }
        return providers;
    }

}

function makeinfo(keys,selected,Cdata){
    if (selected>0){
        return  (<span><span id="module-provider">{keys[selected]} : </span>  <span id="module-name">{Cdata.name}</span></span>);
    }
    else {
        return  (<span id="module-name">{Cdata.name}</span>);
    }
}

class ModuleHeader  extends React.Component{
    constructor(props) {
        super(props);
        this.handleAddPlugin = this.handleAddPlugin.bind(this);
    }
    handleAddPlugin(n){
        this.props.handleAddPlugin(n);
    }

    render() {
 return(
     <div className="container">
         <div className="row align-items-center">
             <div  className=" col-1 align-self-start">
                 <img className="img-fluid" src={"icons/"+this.props.data.icon}/>
             </div>
             <div className="col-4 ">
                 <div className="row align-items-end">
                     <div className="col-auto">
                                    <span data-toggle="tooltip" data-placement="top" title="Expand this..." >
                                        <button className="btn btn-outline-primary  dropdown-toggle" type="button" data-toggle="collapse" data-target={"#collapse"+this.props.id}
                                                aria-expanded="false" aria-controls={"collapse"+this.props.id} id="btn-plugins" >
                                            <span id={"plugin-number"}> {this.props.n+1}. </span> <span id={"plugin-name"}>{this.props.data.name}</span>
                                        </button>
                                    </span>
                     </div>
                     <div id="plugin-knowmore"className="col-1">
                         <MakeknowmoreInput data={this.props.data} n={this.props.n}/>
                     </div>
                 </div>
             </div>
             <div id="plugin-info" className="col-4">
                 <div className="row">
                     {makeinfo(this.props.keys,this.props.selected,this.props.Cdata,this.props.n)}
                 </div>
                 <div className="row">
                     {this.props.comments}
                 </div>
             </div>

             <div id="plugin-cost" className="col-2 align-self-end">
                 <CostOutput id="ccost" name={"Cost"} value={this.props.Cost} tips="Total cost for this provider"/>
             </div>
             <div className="col-1 align-self-end">
                 <ButtonInput id={"add-btn"} name={"+"} onClick={this.handleAddPlugin} n={this.props.n} tips={"Add a new "+this.props.data.name}/>
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
        this.handleRemovePlugin = this.handleRemovePlugin.bind(this);
        this.state={
            n:1,
            'varsum':{}
        };
    }
    handleRemovePlugin(key){
        const n=this.state.n+1;
        this.setState({n:n});
    }
    handleAddPlugin(key){
        const n=this.state.n+1;
        this.setState({n:n});
    }
    handleCostChange(name,e) {
        this.state.varsum[name]=e;
        this.props.handleCostChange(this.props.n,sum(this.state.varsum));
    }
    render() {
        return(
    <Repeat numTimes={this.state.n}>
        {(index) => <ProviderPluginsSelector data={this.props.data} key={index}
                                 n={index} handleCostChange={this.handleCostChange} handleAddPlugin={this.handleAddPlugin}/>}
    </Repeat>
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

// ---------------------
// ---------------------
class Main extends React.Component {
    constructor(props) {
        super(props);
        this.handleCostChange = this.handleCostChange.bind(this);
        this.state={'total':0,'prevtotal':0};
    }

    handleCostChange(total) {
        // console.log("there total : "+total )
        if (this.state.prevtotal != total){
            // console.log("updated :"+total);
            // console.log("prev :"+this.state.prevtotal);
            this.setState({'total':total});
            this.setState({'prevtotal':total});
        }

    }
    render() {
        return(
            <form>
                <div className={"container"}>
                    <div className={"accordion"} id={"accordion"}>
                        <PluginsMain TotalCost={this.handleCostChange} data={maincat.data}/>
                    </div>
                    <div className="card" id="finalcost">
                        <div className="card-header">
                            <div className="container row">
                                <div className="col-7 align-self-start" id="plugin-name">
                                    Total Cost
                                </div>
                                <div id="plugin-cost" className="col-5  text-right">
                                    <CostOutput name={"Total Cost per year"} id={"ctotal"} value={tomoney(this.state.total)} tips="Total cost per year"/>
                                </div>
                            </div>

                        </div>
                        <div className="card-body">
                        </div>
                        <div className="card-footer">
                            <div className="alert alert-danger" role="alert" id="infotxt">
                                The information published on this service are only informative.
                            </div>
                            <div id="service">
                                <p>This service has been developed by ... 2018 </p>
                                <p>Icons are from the Noun Project (Book by Randi NI, Storage by I Pitu, Database by Novalyi, data cloud by Vectors Market)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

// ---------------------
// ---------------------
ReactDOM.render(<Main />,document.getElementById('root'));

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})