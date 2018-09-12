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
        this.props.onAmountChange(e.target.value);
    }

    render() {
        const value = this.props.value;
        return (
            <div className="col">
                <label htmlFor={this.props.id}> {this.props.name} </label>
                <input type="range" className="form-control-range" id={this.props.id} min={this.props.min} max={this.props.max}
                       step={this.props.step} value={value}  onChange={this.handleChange} />
                <small id="nas-amount-cost" className="form-text text-muted">Amount : {value} {this.props.unit} </small>
            </div>
        );
    }
}

class RatesInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.listoptions = props.options.map((opt) =>
            <option key={opt.toString()}>{opt}</option>);

    }

    handleChange(e) {
        this.props.onRateChange(e.target.value);
    }

    render() {
        const value = this.props.value;
        return (
            <div className="col">
                <label htmlFor={this.props.id}> {this.props.name} </label>
                <select id={this.props.id} className="form-control" value={value}  onChange={this.handleChange}>
                    {this.listoptions}
                </select>
               <small id="nas-amount-cost" className="form-text text-muted">Rate : {this.props.rate}  {this.props.unit} </small>
            </div>
        );
    }
}

class SelectorInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.listoptions = props.options.map((opt) =>
            <option key={opt.toString()}>{opt}</option>);

    }

    handleChange(select) {
        this.props.onChange(select);
    }

    render() {
        const value = this.props.value;
        return (
            <div className="selector">
                <label htmlFor={this.props.id}> {this.props.name} </label>
                <select id={this.props.id} className="form-control" value={value}  onChange={this.handleChange}>
                    {this.listoptions}
                </select>
                <small id="nas-amount-cost" className="form-text text-muted">{this.props.legend}</small>
            </div>
        );
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
            <button id={this.props.id} onClick={this.handleChange} type="button" className="btn btn-primary">{this.props.name}</button>
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
                <a className="btn btn-secondary btn-sm dropdown-toggle" href="#" role="button" id={this.props.id} data-toggle="dropdown"
                   aria-haspopup="true" aria-expanded="false">
                    {this.props.name}
                </a>
                <div className="dropdown-menu" aria-labelledby={this.props.id}>
                    {this.state.listoptions}
               </div>
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
                <div className="col">
                    <input type={"text"} className={"form-control"} id={this.props.id} className={"form-control"}
                       value={this.props.value} onChange={this.handleChange} readOnly/>
                </div>
            </div>
        );
    }
}

function Textoutput(props){
    return(
        <div className="alert alert-primary" role="alert">
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
        this.setState({Rate: this.props.data.Rates[select]});
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
                             unit={this.props.data.AmountUnit} onAmountChange={this.handleAmountChange} />
                </div>
                <div className="col-3">
                    <RatesInput id={this.props.name+'-Rates'} name={this.props.data.RateName} options={Object.keys(this.props.data.Rates)}
                                rate={Rate} unit={this.props.data.RateUnit} onRateChange={this.handleRateChange} />
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
        this.setState({Rate: this.props.data.Rates[select]});
    }

    handleCatChange(select) {
        this.setState({SelectCat: select});
        this.setState({Cat: this.props.data.Cat[select]});
    }

    render() {
        const Cat=this.state.Cat;
        const Amount = this.state.amount;
        const Rate=this.state.Rate;
        const Cost=this.makecost(Cat,Amount,Rate);

        return (
            <div className="row align-items-center">
                <div className="col-3">
                     <RatesInput id={this.props.name+'-category'} name={this.props.data.CatName} options={Object.keys(this.props.data.Cat)} rate={Cat}
                            unit={this.props.data.CatUnit} onRateChange={this.handleCatChange} />
                </div>

                <div className="col-4">
                <AmountInput id={this.props.name} min={this.props.data.AmountMin} max={this.props.data.AmountMax} step={this.props.data.AmountStep}
                             value={Amount} name={this.props.data.AmountName} unit={this.props.data.AmountUnit} onAmountChange={this.handleAmountChange} />
                </div>
                <div className="col-4">
                    <RatesInput id={this.props.name+'-Rates'} name={this.props.data.RateName} options={Object.keys(this.props.data.Rates)} rate={Rate}
                            unit={this.props.data.RateUnit} onRateChange={this.handleRateChange} />
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
        this.setState({Cat: this.props.data.Cat[select]});
    }

    render() {
        const Cat=this.state.Cat;

        const Cost=this.makecost(Cat);

        return (
            <div className="row align-items-center">
                <div className="col-4">
                    <RatesInput id={this.props.name+'-category'} name={this.props.data.CatName} options={Object.keys(this.props.data.Cat)} rate={Cat}
                            unit={this.props.data.CatUnit} onRateChange={this.handleCatChange} />

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
        this.handleEnableChange = this.handleEnableChange.bind(this);
        this.handleAddPlugin = this.handleAddPlugin.bind(this);
        this.state={
            selected:0,
            keys:this.ProvidersName(props.data),
            enabled :true,
            n:1,
            cost:0,
            prevcost:0,
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
    handleProviderChange(e){
        const select=this.state.keys.indexOf(e.target.value);
        this.setState({selected:select});

    }
    handleEnableChange(e){
        this.setState({enabled:e});

    }
    handleAddPlugin(n){
        this.props.handleAddPlugin(n);
    }

    makemenu(data,n){
        if (((data.url != '')||(data.url==null))&&(n==0)) {
            return (<MenuInput name={"More about " + data.name} options={data.url} id="plugin-knowmore"/>);
        }
    }

    makeinfo(selected,Cdata){
        if (selected>0){
        return  (<span><span id="module-provider">{this.state.keys[selected]} : </span>  <span id="module-name">{Cdata.name}</span></span>);
        }
    }
    render() {
        // console.log("n= "+this.props.n)
        const Cmp=this.cmp2string(this.cmpdata(this.state.selected).style);
        const Cdata=this.cmpdata(this.state.selected);
        const id=this.props.data.name.replace(/\s/g,'')+this.props.n;
        const Cost=this.state.cost;
        const selected=this.state.selected;


        return(



            <div id={"plugin"}>

                <div className="card-header" id={id}>
                    <div className="container">
                        <div className="row align-items-center">
                        <div  className=" col-1">
                            <img className="img-fluid" src={"icons/"+this.props.data.icon}/>
                        </div>

                            {/*<div className="col-1 align-self-start ">
                            <CheckboxInput id={"enable"} name={"Enable feature"} onChange={this.handleEnableChange} defaults={this.state.enabled}/>
                        </div>*/}
                            <div className="col-3 ">
                                <div className="row">
                                    <div className="col">
                                        <button className="btn btn-link" type="button" data-toggle="collapse" data-target={"#collapse"+id}
                                                aria-expanded="false" aria-controls={"collapse"+id}>
                                            <span id={"plugin-number"}> {this.props.n+1}. </span> <span id={"plugin-name"}>{this.props.data.name}</span>
                                        </button>
                                    </div>

                                </div>
                            </div>
                            <div id="plugin-info" className="col-4">
                                {this.makeinfo(selected,Cdata)}
                            </div>
                            <div className="col-1 ">
                                <ButtonInput id={"add-btn"} name={"+"} onClick={this.handleAddPlugin} n={this.props.n}/>
                            </div>
                            <div id="plugin-cost" className="col-2 ">
                                <CostOutput id="ccost" name={"Cost"} value={Cost} />
                            </div>

                        </div>

                    <div className="row align-items-center">
                        <div id='plugin-menu'className="col-12">
                            {this.makemenu(this.props.data,this.props.n)}
                        </div>
                    </div>
                </div>
            </div>


                <div id={"collapse"+id} className="collapse" aria-labelledby={id}
                     data-parent="#accordion">
                    <div className="card-body">

                        <fieldset disabled={!this.state.enabled} >
                            <div className="row align-items-end">
                            <div id="provider-selector" className="col-3">

                                <SelectorInput id="providerselect" name="Provider" options={this.state.keys}
                                               onChange={this.handleProviderChange}/>
                            </div>
                                <div className="col-3">
                                    {this.makemenu(Cdata,0)}
                                </div>
                            </div>

                            <div id="component" className="container">
                                <Cmp data={Cdata} key={selected} name="" onCostChange={this.handleCostChange} n={this.props.n} />
                            </div>
                        </fieldset>
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
        var data=main.data;
        // console.log(data);

        var providers=[];
        for (var i = 0; i < data.length; i++) {
            providers.push(data[i].provider);
        }
        return providers;
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
                                    <CostOutput name={"Total Cost per year"} id={"ctotal"} value={tomoney(this.state.total)}/>
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

