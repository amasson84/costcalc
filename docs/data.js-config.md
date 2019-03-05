Cost Calculator Documentation : data.js
============

# Introduction
* **js/data.js** is the file telling the engine what to do, without it the cost calculator will be empty.
* It's composed of javascript object and array
* If you use a Github repository link with pages, to update your cost calculator you only need to push a new version of your **data.js** and your cost calculator database will be automatically updated
* There is not syntax checking so be sure it works before you send a new version to your github
* [EXAMPLES](data.js-example.md)
# File structure 

The file contains 
* Provider : each provider contains a model, and the information in order to perform the calculation
* Category : A category is a array of provider (for example Active Storage), you can also define an icon, and some external URL 
* MainData : Maindata is a javascript object, it defines some tunable settings (like update date, or currency) and combines all the categories in one array. **Maindata** is the only variable that must be here.

# Provider Definition 
Depending of the style you need to describe a provider you don't have to specify the same variable inside a provider variable.
Nevertheless some keys must be here for every cases 
Note : the order the keys are written in the file is not important.
## Invariant

### Style (str) 
The **style** keys defines what component to use to describe the provider, the possible keys are :
* __AmountRatesCost__ : Will display an amount input, and a rate selector (multiplication)
* __CategoryCost__ : Will display only category selector
* __CategoryAmountRatesCost__ Will display a category plus an amount input, and a rate selector (multiplication)
* __UserCost__ : Will display input boxes in which the user will specify the provider and the cost manually 

### Provider (str)
The name of the provider

### Name (str)
The name of the service

### Url (array)
_Can be empty_
Array of objects for adding external url displayed when the provider is selected
    {Name:'', Url:''}
 * Name(str) : the name of he link
 * Url(str) : the external URL
 
 ### ExtraInfo(str)
 _Can be empty_
 Text that will be displayed when the provider is selected
 ### ExtraInfoUrl(str)
 _Can be empty_
 If an extra info is provided, one URL can be provided it will be added at the end as __to know more__

 ### ByYear (bool)
 If true the total will be multiply by the duration of the project (for example annual subscription)

## Style dependant 
Here are the keys you have to specify for a given style

### AmountRatesCost
The formula is _Cost = Amount * Rate_ 

* AmountName (str) : The name of the amount 
* AmountUnit (str) : The unit of the amount
* Adaptive (bool) : if __true__ the amount settings can be adapted from the selected rate, __min max step free__ are then arrays, the number of elements must be the same than the number of rates
* AmountMin (number) : Minimum amount
* AmountMax (number) : Maximum amount
* AmountStep (number) : the step when the slider is incremented
* AmountFree (number) : Amount free before charging

* AmountFreeCumulative (bool) : if true the free is not used when using the provider more than one times

* RateName (str) : the rate name
* Rates (obj) {keys : (rate)} keys: (str) the name of the rate, rate (number) : multiplication/rate of the amount
* RateUnit (str) : Unit of the rate

### CategoryCost
The formula is _Cost = Category_ 

* CatName (str) : The name of the category 
* Cat (obj) {keys : (cost)} keys: (str) the name of the rate, cost (number) : the amount
* CatUnit: (str)

### CategoryAmountRatesCost
It combines **AmountRatesCost** and **CategoryCost**
The formula is _Cost = Category + Amount * Rate_ 


### UserCost
No option is needed 

# Category Definition
A category combines different providers in one place (if needed the same providers can be in multiple categories)
A category can contains a Name, an icon , a selection of external URL

###  Name (str) 
the category name
### Icon (str) 
_Can be empty_
 the icon filename (should be in the **icons** folder)
### Url : (array)
_Can be empty_
Array of objects for adding external url displayed when the provider is selected
    {Name:'', Url:''}
 * Name(str) : the name of he link
 * Url(str) : the external URL
### Data (array)
The array contains the provider variable

# MainData Definition
**MainData** is the only variable that must be named like this (provider and category variable names can be what you like)
It contains few keys that can configure the cost calculator engine :
## Keys :
* Updated (str) : the last update date
* HelpUrl (str) : Url used in the help button can be a page a mailto:, if empty the help button is not displayed
* InstName (str) : name of the institution display on the top 
* InstLogo (str) : filename of the logo, the file should be in the **icons** folder, if empty no logo is displayed
* InstLogoWidth (int) : width in pixels of the logo need to be specified if logo filename is specified
* Currency (str) : currency display in the cost box, if using the currency conversion the name should be in the [List of Currencies](https://oxr.readme.io/docs/supported-currencies) 
* OEXRApi (str) : your API key of [https://openexchangerates.org/](openexchangerates.org) if empty or wrong the currency conversion is disabled
* Conv Array(str) : Array of money displayed for currency conversion [List of Currencies](https://oxr.readme.io/docs/supported-currencies) 
* Version  (str) : version displayed
* DefaultDuration (int) : Default Duration for project 
* Data: (array) : contains the categories variable
