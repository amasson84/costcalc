const NasEpfl =  {
    style: "AmountRatesCost",
    provider : "EPFL-VPSI",
    AmountName: "Amount",
    AmountUnit: "TB",
    AmountMin : 1,
    AmountMax : 100,
    AmountStep : 1,
    AmountFree:1,
    AmountFreeCumulative:false,
    RateVar : true,
    RateName : 'Performance',
    Rates : {
        'Collaborative': 165,
        'On-line archive': 110,
        'Raw': 55
    },
    RateUnit : "TB / CHF"
};

const SLIMSEpfl =  {
    style:'CategoryAmountRatesCost',
    provider : "EPFL-LSIS",
    CatName:'PI Status',
    Cat:{
        'Full Professor':3000,
        'Associate Professor':2000,
        'Tenure Track Assistant Professor or Core Facility':1000
    },
    CatUnit:'CHF',
    AmountName: "Storage",
    AmountUnit: "TB",
    AmountMin : 1,
    AmountMax : 100,
    AmountStep : 1,
    AmountFree:0,
    AmountFreeCumulative:false,
    RateVar : true,
    RateName: 'ELN Storage',
    Rates : {
        'Stored on EPFL Server': 300,
    },
    RateUnit : "TB / CHF"
};

const MysqlEpfl = {
    style : 'CategoryCost',
    provider : "EPFL-VPSI",
    CatName:'Options',
    Cat:{
        'MySQL max 2GB':0,
    },
    CatUnit:'CHF',
};

const Zenodo = {
    style : 'CategoryCost',
    provider : "Zenodo-CERN",
    CatName:'Options',
    Cat:{
        'Max 50GB per dataset':0,
    },
    CatUnit:'CHF',
};

const C4science = {
    style : 'CategoryCost',
    provider : "EPFL-SCITAS",
    CatName:'Options',
    Cat:{
        'Free for text file':0,
    },
    CatUnit:'CHF',
};

const Github = {
    style : 'CategoryCost',
    provider : "GitHub",
    CatName:'Options',
    Cat:{
        'Free for text file':0,
    },
    CatUnit:'CHF',
};