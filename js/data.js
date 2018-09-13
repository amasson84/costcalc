// Providers
// ----------------------------------------------------
// ----------------------------------------------------
// Storage
const NasEpfl =  {
    style: "AmountRatesCost",
    provider : "EPFL-VPSI",
    name:'NAS',
    url : [
        {name:'VPSI-Website',url:'https://support.epfl.ch/help/epfl?id=epfl_service_status&service=49a363acdb34c700ef64731b8c96191f'}
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
    style : 'CategoryCost',
    provider : "Switch-EPFL",
    name:'Online Storage',
    url : [
        {name:'Switch Website',url:'https://drive.switch.ch/'}
    ],
    CatName:'Options',
    Cat:{
        'Cloud Based max 50GB':0,
    },
    CatUnit:'CHF',
};

const GoogleDriveEdu = {
    style : 'CategoryCost',
    provider : "Google Drive Educ",
    name:'Online Storage',
    url : [
        {name :'Google Education Page',url:'https://edu.google.com/?modal_active=none'}
    ],
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
    name:'SLIMS',
    url : [
        {name:'SLIMS on LSIS Website',url:'https://lsis.epfl.ch/page-140284-en.html'},
        {name:'SLIMS Cost on LSIS Website',url:'https://lsis.epfl.ch/cms/site/lsis/lang/en/lims'},
        {name: 'Genohm (SLIMS Company)',url:'https://www.genohm.com/'}
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
        'Stored on EPFL Server': 300,
    },
    RateUnit : "CHF / TB"
};

// Database
const MysqlEpfl = {
    style : 'CategoryCost',
    provider : "EPFL-VPSI",
    name:'MySql',
    url : [
        {name:'EPFL VPSI ',url:'https://support.epfl.ch/epfl?id=epfl_service_status&service=eb026fa0db34c700ef64731b8c96198e'}
    ],
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
    name:'Zenodo',
    url : [
        {name:'Zenodo Website',url:'https://www.zenodo.org/'},
        {name:'About Zenodo',url:'http://about.zenodo.org/'},
    ],
    CatName:'Options',
    Cat:{
        'Max 50GB per dataset':0,
    },
    CatUnit:'CHF',
};

const C4science = {
    style : 'CategoryCost',
    provider : "EPFL-SCITAS",
    name:'C4Science',
    url : [
        {name:'C4Science Website',url:'https://www.c4science.ch/'}
    ],
    CatName:'Options',
    Cat:{
        'Free for text file':0,
    },
    CatUnit:'CHF',
};

const Github = {
    style: "AmountRatesCost",
    provider : "GitHub",
    name:'GitHub',
    url : [
        {name:'Github Website Pricing',url:'https://github.com/pricing'}
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
    style: "AmountRatesCost",
    provider : "Bitbucket",
    name:'BitBucket',
    url : [
        {name:'Bitbucket Website Pricing',url:'https://bitbucket.org/product/pricing'}
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
    style: "AmountRatesCost",
    provider : "Gitlab",
    name:'Gitlab',
    url : [
        {name:'Gitlab Website Pricing',url:'https://about.gitlab.com/pricing/'}
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
    style : 'CategoryCost',
    provider : "FigShare",
    name:'Figshare',
    url : [
        {name:'Figshare website',url:'https://figshare.com/'},
        {name:'Figshare Pricing',url:'https://www.g2crowd.com/products/figshare/pricing'}
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
    style : 'CategoryAmountRatesCost',
    provider : "Dyrad",
    name:'Dyrad',
    url : [
    {name:'Dyrad Website Pricing',url:'https://datadryad.org/pages/payment'}
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


// Categories definition
// ----------------------------------------------------
// ----------------------------------------------------
const NoneSelected={
    style: 'NoneSelect',
    provider:'None',
    name:'Select a Provider',
    url:'',

};

const storage={
    name : 'Active Storage',
    icon : 'storage.png',
    url : [
        {name:'EPFL RDM',url:'https://researchdata.epfl.ch/work-with-data/storage/'}
    ],
    intro :'',
    data :[NoneSelected,
        NasEpfl,
        SwitchEpfl,
        GoogleDriveEdu


    ]

};
const ELN={
    name : 'Electronic LabBook',
    icon : 'eln.png',
    url : [
        {name: 'EPFL RDM',url:'https://researchdata.epfl.ch/work-with-data/active-data-management/'}
    ],
    intro :'',
    data :[NoneSelected,
        SLIMSEpfl,

    ]

};
const database={
    name : 'Database',
    icon : 'database.png',
    url : '',
    intro :'',
    data :[NoneSelected,
        MysqlEpfl,

    ]
};
const repository={
        name : 'Repository',
        icon : 'repos.png',
        url : [
            {name:'EPFL RDM WebPage',url:'https://researchdata.epfl.ch/publish-preserve/'}
        ],
        intro :'',
        data :[
            NoneSelected,
            Zenodo,
            C4science,
            Github,
            Bitbucket,
            Gitlab,
            Figshare,
            Dryad,
        ]
};


// Combine Categories
// ----------------------------------------------------
// ----------------------------------------------------

const maincat={
    data:[storage,ELN,database,repository]
};
