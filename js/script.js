'use strict';


const NasEpfl =  {
    provider : "EPFL",
    AmountName: "Amount",
    AmountUnit: "TB",
    AmountMin : 1,
    AmountMax : 100,
    AmountStep : 1,
    AmountFree:1,
    AmountFreeCumulative:false,
    RateVar : true,
    Rates : {
        'Collaborative': 165,
        'On-line archive': 110,
        'Raw': 55
    },
    RateUnit : "TB / CHF"
};


function tomoney(numeric) {
    if (typeof numeric == 'string') {
        numeric = parseFloat(numeric);
    }

    return numeric.toFixed(0).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' CHF';
}


function tonumeric (value) {
    return parseFloat(
        value.toString().replace(/[^0-9\.]+/g, '')
    );
}



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




class NasCalculator extends React.Component {
    constructor(props) {
        super(props);
        this.state={amount : 1, SelectRate : 0 , Rate : NasEpfl.Rates[Object.keys(NasEpfl.Rates)[0]]};
        this.handleAmountChange = this.handleAmountChange.bind(this);
         this.handleRateChange = this.handleRateChange.bind(this);
    }
    handleAmountChange(amount) {
        this.setState({amount: amount});
    }
    handleRateChange(select) {
        this.setState({SelectRate: select});
        this.setState({Rate: NasEpfl.Rates[select]});
    }
    render() {
        const Amount = this.state.amount;
        const SelectRate=this.state.SelectRate;
        const Rate=this.state.Rate;
        const Cost=this.makecost(Amount,Rate);
        return (
            <div className="row">
                <AmountInput id={"NAS"} min={NasEpfl.AmountMin} max={NasEpfl.AmountMax} step={NasEpfl.AmountStep} value={Amount} unit={NasEpfl.AmountUnit} onAmountChange={this.handleAmountChange} />

                <RatesInput id={"NASRates"} options={Object.keys(NasEpfl.Rates)} rate={Rate} unit={NasEpfl.RateUnit} onRateChange={this.handleRateChange} />

                <CostOutput id={"NasCost"} name={"Cost"} display={Cost}/>
            </div>
        );
    }
    makecost(amount,rate) {
        const total=amount*rate;
        return tomoney(total);
    }
    }

function CostOutput(props){
    return (
    <div className="col">
        <label htmlFor="nas-cost">{props.name}</label>
        <input type="text" className="form-control" id={props.id} className="form-control" value={props.display}/>
    </div>
);
}


function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
        return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}

function BoilingVerdict(props) {
    if (props.celsius >= 100) {
        return(<p>The water would boil.</p>);
    }
    return( <p>The water would not boil.</p>);
}

class TemperatureInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onTemperatureChange(e.target.value);
    }

    render() {
        const temperature = this.props.temperature;
        const scale = this.props.scale;
        return (
            <fieldset>
            <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
        onChange={this.handleChange} />
        </fieldset>
    );
    }
}

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
        this.state = {temperature: '', scale: 'c'};
    }

    handleCelsiusChange(temperature) {
        this.setState({scale: 'c', temperature});
    }

    handleFahrenheitChange(temperature) {
        this.setState({scale: 'f', temperature});
    }

    render() {
        const scale = this.state.scale;
        const temperature = this.state.temperature;
        const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
        const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

        return (
            <div>
            <TemperatureInput
        scale="c"
        temperature={celsius}
        onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureInput
        scale="f"
        temperature={fahrenheit}
        onTemperatureChange={this.handleFahrenheitChange} />
        <BoilingVerdict
        celsius={parseFloat(celsius)} />
        </div>
    );
    }
}

ReactDOM.render(
<NasCalculator />,
    document.getElementById('root')
);