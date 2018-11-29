// Providers
// ----------------------------------------------------
// ----------------------------------------------------
// Storage
const NasEpfl =  {
    Style: "AmountRatesCost",
    Provider : "EPFL-VPSI",
    Name:'NAS',
    Url : [
        {Name:'VPSI-Website',Url:'https://support.epfl.ch/help/epfl?id=epfl_service_status&service=49a363acdb34c700ef64731b8c96191f'},
        {Name:'SV-IT Storage Website',Url:'https://sv-it.epfl.ch/stockage'}
    ],
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
    RateUnit : "CHF / TB"
};


const SwitchEpfl = {
    Style : 'CategoryCost',
    Provider : "Switch-EPFL",
    Name:'Online Storage',
    Url : [
        {Name:'Switch Website',Url:'https://drive.switch.ch/'}
    ],
    CatName:'Options',
    Cat:{
        'Cloud Based max 50GB':0,
    },
    CatUnit:'CHF',
};

const GoogleDriveEdu = {
    Style : 'CategoryCost',
    Provider : "Google Drive Educ",
    Name:'Online Storage',
    Url : [
        {Name :'Google Education Page',Url:'https://edu.google.com/?modal_active=none'}
    ],
    CatName:'Options',
    Cat:{
        'Cloud Based illimited':0,
    },
    CatUnit:'CHF',
};


// ELN
const SLIMSEpfl =  {
    Style:'CategoryAmountRatesCost',
    Provider : "EPFL-SV-IT",
    Name:'SLIMS',
    Url : [
        {Name:'SLIMS on SV-IT Website',Url:'https://sv-it.epfl.ch/lims'},
        {Name: 'Genohm (SLIMS Company)',Url:'https://www.genohm.com/'}
    ],
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
        'Stored on EPFL Server': 165,
    },
    RateUnit : "CHF / TB"
};

// Database
const MysqlEpfl = {
    Style : 'CategoryCost',
    Provider : "EPFL-VPSI",
    Name:'MySql',
    Url : [
        {Name:'EPFL VPSI ',Url:'https://support.epfl.ch/epfl?id=epfl_service_status&service=eb026fa0db34c700ef64731b8c96198e'}
    ],
    CatName:'Options',
    Cat:{
        'MySQL max 2GB':0,
    },
    CatUnit:'CHF',
};

// Repository
const Zenodo = {
    Style : 'CategoryCost',
    Provider : "Zenodo-CERN",
    Name:'Zenodo',
    Url : [
        {Name:'Zenodo Website',Url:'https://www.zenodo.org/'},
        {Name:'About Zenodo',Url:'http://about.zenodo.org/'},
    ],
    CatName:'Options',
    Cat:{
        'Max 50GB per Dataset':0,
    },
    CatUnit:'CHF',
};

const C4science = {
    Style : 'CategoryCost',
    Provider : "EPFL-SCITAS",
    Name:'C4Science',
    Url : [
        {Name:'C4Science Website',Url:'https://www.c4science.ch/'}
    ],
    CatName:'Options',
    Cat:{
        'Free for text file':0,
    },
    CatUnit:'CHF',
};

const Github = {
    Style: "AmountRatesCost",
    Provider : "GitHub",
    Name:'GitHub',
    Url : [
        {Name:'Github Website Pricing',Url:'https://github.com/pricing'}
    ],
    AmountName: "Number of user",
    AmountUnit: "User(s)",
    AmountMin : 1,
    AmountMax : 100,
    AmountStep : 1,
    AmountFree:0,
    AmountFreeCumulative:false,
    RateVar : true,
    RateName:'Plan',
    Rates:{
        'OpenSource project':0,
        'Developer (for one user)':81.6,
        'Team (min 5 users)':104.9,
        'Business Cloud':244.7
    },
    RateUnit:'CHF / Users',
};

const Bitbucket= {
    Style: "AmountRatesCost",
    Provider : "Bitbucket",
    Name:'BitBucket',
    Url : [
        {Name:'Bitbucket Website Pricing',Url:'https://bitbucket.org/product/pricing'}
    ],
    AmountName: "Number of user",
    AmountUnit: "User(s)",
    AmountMin : 1,
    AmountMax : 100,
    AmountStep : 1,
    AmountFree:0,
    AmountFreeCumulative:false,
    RateVar : true,
    RateName:'Plan',
    Rates:{
        'Free (up to 5 users)':0,
        'Standard for growing teams (min 5 users)':24,
        'Premium for large teams (min 5 users)':60,
    },
    RateUnit:'CHF / Users',
};
const Gitlab= {
    Style: "AmountRatesCost",
    Provider : "Gitlab",
    Name:'Gitlab',
    Url : [
        {Name:'Gitlab Website Pricing',Url:'https://about.gitlab.com/pricing/'}
    ],
    AmountName: "Number of user",
    AmountUnit: "User(s)",
    AmountMin : 1,
    AmountMax : 100,
    AmountStep : 1,
    AmountFree:0,
    AmountFreeCumulative:false,
    RateVar : true,
    RateName:'Plan',
    Rates:{
        'Core Self Hosted':0,
        'Free Cloud Based' : 0,
        'Starter Self Hosted':48,
        'Bronze Cloud based':48,
        'Premium Self Hosted':228,
        'Silver Cloud Based':228
    },
    RateUnit:'CHF / Users',
};
const Figshare = {
    Style : 'CategoryCost',
    Provider : "FigShare",
    Name:'Figshare',
    Url : [
        {Name:'Figshare website',Url:'https://figshare.com/'},
        {Name:'Figshare Pricing',Url:'https://www.g2crowd.com/products/figshare/pricing'}
    ],
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
    Style : 'CategoryAmountRatesCost',
    Provider : "Dryad",
    Name:'Dyrad',
    Url : [
    {Name:'Dryad Website Pricing',Url:'https://Datadryad.org/pages/payment'}
],
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
    'Extra Storage': 50,
    },
    RateUnit : "CHF / GB"
};




// System variable definition
// ----------------------------------------------------
// ----------------------------------------------------
const NoneSelected={
    Style: 'NoneSelect',
    Provider:'None',
    Name:'Select a Provider',
    Url:'',

};

const UserCostSelect={
    Style : 'UserCost',
    Provider:'Provide your own provider',
    Name:'',
    Url:'',
};

// Categories definition
// ----------------------------------------------------
// ----------------------------------------------------
const storage={
    Name : 'Active Storage',
    Icon : 'storage.png',
    Url : [
        {Name:'EPFL RDM',Url:'https://researchData.epfl.ch/work-with-Data/storage/'}
    ],
    Intro :'',
    Data :[NoneSelected,
        NasEpfl,
        SwitchEpfl,
        GoogleDriveEdu,
        UserCostSelect,


    ]

};
const ELN={
    Name : 'Electronic LabBook',
    Icon : 'eln.png',
    Url : [
        {Name: 'EPFL RDM',Url:'https://researchData.epfl.ch/work-with-Data/active-Data-management/'}
    ],
    Intro :'',
    Data :[NoneSelected,
        SLIMSEpfl,
        UserCostSelect,
    ]

};
const Database={
    Name : 'Database',
    Icon : 'database.png',
    Url : '',
    Intro :'',
    Data :[NoneSelected,
        MysqlEpfl,
        UserCostSelect,
    ]
};
const repository={
        Name : 'Repository',
        Icon : 'repos.png',
        Url : [
            {Name:'EPFL RDM WebPage',Url:'https://researchData.epfl.ch/publish-preserve/'}
        ],
        Intro :'',
        Data :[
            NoneSelected,
            Zenodo,
            C4science,
            Github,
            Bitbucket,
            Gitlab,
            Figshare,
            Dryad,
            UserCostSelect,
        ]
};


// Combine Categories
// ----------------------------------------------------
// ----------------------------------------------------

const MainData={
    Currency:'CHF',
    Updated:'29/11/2018',
    Data:[storage,ELN,Database,repository]
};
