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
    ExtraInfo:"The first TB is free",
    ByYear:true,
    Adaptive:false,
    AmountName: "Amount",
    AmountUnit: "TB",
    AmountMin : 1,
    AmountMax : 500,
    AmountStep : 1,
    AmountFree:1,
    AmountFreeCumulative:false,
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
    ByYear:true,
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
    ByYear:true,
    Adaptive:false,
    ExtraInfo : "Google Storage is not recommended as the data are stored outside of Switzerland",
    ExtraInfoUrl :"https://support.epfl.ch/kb_view_customer.do?sysparm_article=KB0012829",
    Url : [
        {Name :'Google Education Page',Url:'https://edu.google.com/?modal_active=none'}
    ],
    CatName:'Options',
    Cat:{
        'Cloud Based illimited':0,
    },
    CatUnit:'CHF',
};
const Dropbox_perso = {
    Style : 'CategoryCost',
    Provider : "Dropbox Personal",
    Name:'Online Storage',
    ByYear:true,
    ExtraInfo : "Dropbox is not recommended as the data are stored outside of Switzerland",
    ExtraInfoUrl :"https://support.epfl.ch/kb_view_customer.do?sysparm_article=KB0012882",
    Url : [
        {Name :'Dropbox',Url:'https://www.dropbox.com/plans?trigger=nr'}
    ],
    CatName:'Plan',
    Cat:{
        'Personal Free 2Go':0,
        'Personal Plus 1TB':112,
        'Personal Pro 2TB':226,
    },
    CatUnit:'CHF',
};
const Dropbox_team = {
    Style : 'AmountRatesCost',
    Provider : "Dropbox for Team",
    Name:'Online Storage',
    ByYear:true,
    ExtraInfo : "Dropbox is not recommended as the data are stored outside of Switzerland",
    ExtraInfoUrl :"https://support.epfl.ch/kb_view_customer.do?sysparm_article=KB0012882",
    Url : [
        {Name :'Dropbox',Url:'https://www.dropbox.com/plans?trigger=nr'}
    ],
    Adaptive:false,
    AmountName: "Number of Users",
    AmountUnit: "Users",
    AmountMin : 1,
    AmountMax : 500,
    AmountStep : 1,
    AmountFree:0,
    AmountFreeCumulative:false,
    RateName : 'Plan',
    Rates : {
        'Standard': 136,
        'Advanced': 204,
    },
    RateUnit : "CHF / User"
};

// ELN
const SLIMSEpfl =  {
    Style:'CategoryAmountRatesCost',
    Provider : "EPFL-SV-IT",
    Name:'SLIMS',
    ByYear:true,
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
    Adaptive:false,
    AmountName: "Storage",
    AmountUnit: "TB",
    AmountMin : 1,
    AmountMax : 100,
    AmountStep : 1,
    AmountFree:0,
    AmountFreeCumulative:false,
    RateName: 'ELN Storage',
    Rates : {
        'Stored on EPFL Server': 165,
    },
    RateUnit : "CHF / TB"
};

const ELNEpfl = {
    Style : 'CategoryCost',
    Provider : "ELN-EPFL",
    Name:'ELN',
    ByYear:true,
    Url : [
        {Name:'ELN Website',Url:'https://eln.epfl.ch/'}
    ],
    CatName:'Options',
    Cat:{
        'Free for EPFL community':0,
    },
    CatUnit:'CHF',
};

const Rspace = {
    Style : 'CategoryCost',
    Provider : "Rspace community",
    Name:'Rspace',
    ByYear:true,
    Url : [
        {Name:'Rspace Website',Url:'https://www.researchspace.com/'}
    ],
    CatName:'Options',
    Cat:{
        'Cloud Based unlimited storage and user':0,
    },
    CatUnit:'CHF',
};

const Benchling = {
    Style : 'CategoryCost',
    Provider : "Benchling",
    Name:'ELN',
    ByYear:true,
    ExtraInfo : "The first 10GB are free",
    ExtraInfoUrl :"",
    Url : [
        {Name :'Benchling website',Url:'https://benchling.com/academic'}
    ],
    CatName:'Options',
    Cat:{
        'Cloud Based 10GB':0,
    },
    CatUnit:'CHF',
};


// Database
const MysqlEpfl = {
    Style : 'CategoryCost',
    Provider : "EPFL-VPSI",
    Name:'MySql',
    ByYear:true,
    Adaptive:false,
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
    ByYear:false,
    Adaptive:false,
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
    ByYear:true,
    Adaptive:false,
    ExtraInfo:'C4Science is the repository recommended by EPFL for code repository',
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
    Adaptive:true,
    ByYear:true,
    AmountMin : [1,1,5,10],
    AmountMax : [100,1,100,100],
    AmountStep : [1,1,1,1],
    AmountFree:[0,0,0,0],
    AmountFreeCumulative:false,
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
    Adaptive:true,
    ByYear:true,
    AmountMin : [1,5,5],
    AmountMax : [5,100,100],
    AmountStep : [1,1,1],
    AmountFree:[0,0,0],
    AmountFreeCumulative:false,
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
    Adaptive:false,
    AmountFreeCumulative:false,
    ByYear:true,
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
    ByYear:false,
    Adaptive:false,
    Url : [
        {Name:'Figshare website',Url:'https://figshare.com/'},
        {Name:'Figshare Pricing',Url:'https://www.g2crowd.com/products/figshare/pricing'}
    ],
    ExtraInfo:'The costs of enabling access to research data under an SNSF grant are eligible. The  data archives (data repositories) have to meet the FAIR principles.',
    ExtraInfoUrl:'http://www.snf.ch/SiteCollectionDocuments/snsf-general-implementation-regulations-for-the-funding-regulations-e.pdf#page=14',
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
    ByYear:false,
    ExtraInfo:'The costs of enabling access to research data under an SNSF grant are eligible. The  data archives (data repositories) have to meet the FAIR principles.',
    ExtraInfoUrl:'http://www.snf.ch/SiteCollectionDocuments/snsf-general-implementation-regulations-for-the-funding-regulations-e.pdf#page=14',

    CatName:'Options',
    Cat:{
        'up to 20GB if DPC covered':0,
        'up to 20GB if no  DPC covered':120
    },
    CatUnit:'CHF',
    AmountName: "Storage",
    AmountUnit: "GB",
    Adaptive:false,
    AmountMin : 20,
    AmountMax : 100,
    AmountStep : 10,
    AmountFree:20,
    AmountFreeCumulative:false,
    RateName: 'Storage',
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
    ByYear:false,
};

const UserCostSelect={
    Style : 'UserCost',
    Provider:'Manual Provider',
    Name:'',
    Url:'',
    ByYear:false,

};

// Categories definition
// ----------------------------------------------------
// ----------------------------------------------------
const storage={
    Name : 'Active Storage',
    Icon : 'storage.png',
    Url : [
        {Name:'EPFL RDM',Url:'https://researchData.epfl.ch/work-with-Data/storage/'},
        {Name:'Comparison of file synchronization software',Url:'https://en.wikipedia.org/wiki/Comparison_of_file_synchronization_software'}
    ],
    Data :[NoneSelected,
        NasEpfl,
        SwitchEpfl,
        GoogleDriveEdu,
        Dropbox_perso,
        Dropbox_team,
        UserCostSelect,
    ]

};
const ELN={
    Name : 'Electronic LabBook',
    Icon : 'eln.png',
    Url : [
        {Name: 'EPFL RDM',Url:'https://researchData.epfl.ch/work-with-Data/active-Data-management/'}
    ],
    Data :[NoneSelected,
        SLIMSEpfl,
        ELNEpfl,
        Rspace,
        Benchling,
        UserCostSelect,
    ]

};
const Database={
    Name : 'Database',
    Icon : 'database.png',
    Url : '',
    Data :[NoneSelected,
        MysqlEpfl,
        UserCostSelect,
    ]
};
const datarepository={
        Name : 'Data Repository',
        Icon : 'drepos.png',
        Url : [
            {Name:'EPFL RDM WebPage',Url:'https://researchData.epfl.ch/publish-preserve/'}
        ],
        Data :[
            NoneSelected,
            Zenodo,
            Figshare,
            Dryad,
            UserCostSelect,
        ]
};
const coderepository={
    Name : 'Collaborative Repository',
    Icon : 'crepos.png',
    Url : '',
    Data :[
        NoneSelected,
        C4science,
        Github,
        Bitbucket,
        Gitlab,
        UserCostSelect,
    ]
};


// Combine Categories
// ----------------------------------------------------
// ----------------------------------------------------

const MainData={
    InstName:'EPFL Library',
    InstLogo:'logo.png',
    InstLogoWidth:200,
    Updated:'05/03/2019',
    HelpUrl:'mailto:researchdata@epfl.ch',
    Currency:'CHF',
    OEXRApi:'cd8d785bdb6646b0a7e4c0eba5a74199',
    Conv:['EUR','USD','GBP'],
    Version : 'v2.0',
    DefaultDuration:1,
    Data:[storage,ELN,Database,datarepository,coderepository],
};
