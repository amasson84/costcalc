"use strict";
// Money is the http://openexchangerates.github.io/money.js/#playground Lib
var Money = fx.noConflict();
//  Become true if money conv is configured and connected correctly
var Money_Enable=false;

class CurrencySelect extends React.Component {
    constructor(props) {
        super(props);
        this.handleCurChange = this.handleCurChange.bind(this);
        let selectable=MainData.Conv;
        selectable.unshift(MainData.Currency);
        this.state={
            Enable:false,
            SelectCur : 0,
            Cur : selectable[0],
            Selectable: selectable,
            prevselec:-1,
        };
        //this.make_export();
        this.moneyset(0);
    }

    moneyset(select){
        Money.settings =
            {
                from: MainData.Currency,
                to: this.state.Selectable[select],
            };
    }
    handleCurChange(select) {
        if(select==='0'){
            this.setState({Enable: false});
        }
        else{
            this.setState({Enable: true});
        }
        this.setState({SelectCur: select});
        this.setState({Cur: this.state.Selectable[select]});
        this.moneyset(select);
    }
    // make_export(){
    //     this.export=[
    //         {Name:this.props.data.CurName,Value:Object.keys(this.props.data.Cur)[this.state.SelectCurt]},
    //     ];
    //     this.props.export(this.export);
    // }
    componentDidUpdate(){
     //   this.makecost(this.state.Cat);
     //   this.make_export();
        if(this.state.prevselec!==this.state.SelectCur) {
            this.props.money({Enable: this.state.Enable, Cur: this.state.Cur});
            this.state.prevselec = this.state.SelectCur;
        }

    }
    render() {
        if (Money_Enable) {
            if(this.state.Enable){
                let r = Money.convert(1).toFixed(2);;
                let rate = '1' + MainData.Currency + '=' + r + this.state.Cur;
                return (
                    <SelectorInput id={this.props.id + '-currency'} name="Change currency" options={this.state.Selectable}
                                   rate={rate} class="btn-secondary" selected={this.state.SelectCur} unit=""
                                   onChange={this.handleCurChange}/>
                );
            }else{
                return(
                <SelectorInput id={this.props.id + '-currency'} name="Change currency" options={this.state.Selectable}
                               class="btn-secondary" selected={this.state.SelectCur} onChange={this.handleCurChange}/>
            );
            }
        } else {
            return (null);
        }
    }
    makecost(cat) {
        var total=cat;
        total=tomoney(total);
        this.props.onCostChange(this.props.n,total);
        return total;
    }
}

/**
 * @return {boolean}
 */
function Money_GetRates(){
    // Load exchange rates data via AJAX:
    if(MainData.OEXRApi!=='') {
        let com = $.ajax({
            // NB: using Open Exchange Rates here, but you can use any source!
            url:'https://openexchangerates.org/api/latest.json?app_id=' +MainData.OEXRApi,
            dataType: 'json',
            async: false,
            success: function(data) {
                    Money.rates = data.rates;
                    Money.base = data.base;
            },

        })
         .done(function(){
                console.log("Money data loaded");
               Money_Enable = true;
            })
            .fail(function(){
                console.log("Error loading data money");
                Money_Enable = false;
            });
    }
    return Money_Enable;
}