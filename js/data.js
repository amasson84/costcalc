// Providers
// ----------------------------------------------------
// ----------------------------------------------------
// Storage
const NasEpfl =  {
    style: "AmountRatesCost",
    provider : "EPFL-VPSI",
    url : '',
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

const SwitchEpfl = {
    style : 'CategoryCost',
    provider : "Switch-EPFL",
    url : '',
    CatName:'Options',
    Cat:{
        'Cloud Based max 50GB':0,
    },
    CatUnit:'CHF',
};

const GoogleDriveEdu = {
    style : 'CategoryCost',
    provider : "Google Drive Educ",
    url : '',
    CatName:'Options',
    Cat:{
        'Cloud Based illimited':0,
    },
    CatUnit:'CHF',
};


// ELN
const SLIMSEpfl =  {
    style:'CategoryAmountRatesCost',
    provider : "EPFL-LSIS",
    url : '',
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

// Database
const MysqlEpfl = {
    style : 'CategoryCost',
    provider : "EPFL-VPSI",
    url : '',
    CatName:'Options',
    Cat:{
        'MySQL max 2GB':0,
    },
    CatUnit:'CHF',
};

// Repository
const Zenodo = {
    style : 'CategoryCost',
    provider : "Zenodo-CERN",
    url : '',
    CatName:'Options',
    Cat:{
        'Max 50GB per dataset':0,
    },
    CatUnit:'CHF',
};

const C4science = {
    style : 'CategoryCost',
    provider : "EPFL-SCITAS",
    url : '',
    CatName:'Options',
    Cat:{
        'Free for text file':0,
    },
    CatUnit:'CHF',
};

const Github = {
    style: "AmountRatesCost",
    provider : "GitHub",
    url : '',
    AmountName: "Number of user",
    AmountUnit: "User(s)",
    AmountMin : 1,
    AmountMax : 100,
    AmountStep : 1,
    AmountFree:0,
    AmountFreeCumulative:false,
    RateVar : true,
    CatName:'Plan',
    Cat:{
        'OpenSource project':0,
        'Developer (for one user)':81.6,
        'Team (min 5 users)':104.9,
        'Business Cloud':244.7
    },
    CatUnit:'CHF / Users',
};

const Bitbucket= {
    style: "AmountRatesCost",
    provider : "Bitbucket",
    url : '',
    AmountName: "Number of user",
    AmountUnit: "User(s)",
    AmountMin : 1,
    AmountMax : 100,
    AmountStep : 1,
    AmountFree:0,
    AmountFreeCumulative:false,
    RateVar : true,
    CatName:'Plan',
    Cat:{
        'Free (up to 5 users)':0,
        'Standard for growing teams (min 5 users)':24,
        'Premium for large teams (min 5 users)':60,
    },
    CatUnit:'CHF / Users',
};
const Gitlab= {
    style: "AmountRatesCost",
    provider : "Gitlab",
    url : '',
    AmountName: "Number of user",
    AmountUnit: "User(s)",
    AmountMin : 1,
    AmountMax : 100,
    AmountStep : 1,
    AmountFree:0,
    AmountFreeCumulative:false,
    RateVar : true,
    CatName:'Plan',
    Cat:{
        'Core Self Hosted':0,
        'Free Cloud Based' : 0,
        'Starter Self Hosted':48,
        'Bronze Cloud based':48,
        'Premium Self Hosted':228,
        'Silver Cloud Based':228
    },
    CatUnit:'CHF / Users',
};
const Figshare = {
    style : 'CategoryCost',
    provider : "FigShare",
    url : '',
    CatName:'Options',
    Cat:{
        'Free 1GB':0,
        '10GB':96,
        '15GB':132,
        '20GB':180
    },
    CatUnit:'CHF',
};
const Dryad = {
    style : 'CategoryAmountRatesCost',
    provider : "FigShare",
    url : '',
    CatName:'Options',
    Cat:{
        'up to 20GB if DPC covered':0,
        'up to 20GB if no  DPC covered':120
    },
    CatUnit:'CHF',
    AmountName: "Extra - Storage",
    AmountUnit: "GB",
    AmountMin : 0,
    AmountMax : 100,
    AmountStep : 10,
    AmountFree:0,
    AmountFreeCumulative:false,
    RateVar : true,
    RateName: 'ELN Storage',
    Rates : {
    'Extra Storage': 300,
},
RateUnit : "GB / CHF"
};


// Categories definition
// ----------------------------------------------------
// ----------------------------------------------------
const storage={
    name : 'Active Storage',
    icon : '',
    url : '',
    intro :'',
    data :[NasEpfl,
        SLIMSEpfl,
        GoogleDriveEdu

    ]

};
const ELN={
    name : 'Electronic LabBook',
    icon : '',
    url : '',
    intro :'',
    data :[SLIMSEpfl,

    ]

};
const database={
    name : 'Database',
    icon : '',
    url : '',
    intro :'',
    data :[MysqlEpfl,

    ]

};

