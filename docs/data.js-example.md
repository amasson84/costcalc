Cost Calculator Documentation : data.js EXAMPLES
============

#Providers
## AmountRatesCost
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
        AmountMax : 100,
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
    
## AmountRatesCost with adaptive amount
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
    
   ## CategoryCost
       const Figshare = {
           Style : 'CategoryCost',
           Provider : "FigShare",
           Name:'Figshare',
           ByYear:false,
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
       
## CategoryAmountRatesCost
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
    
 ## UserCost
     const UserCostSelect={
         Style : 'UserCost',
         Provider:'Provide your own provider',
         Name:'',
         Url:'',
         ByYear:false,
     };
     
 # Category
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
             UserCostSelect,
          ]
          
# Maindata
    const MainData={
        Updated:'29/11/2018',
        HelpUrl:'mailto:researchdata@epfl.ch',
        Currency:'CHF',
        Version : 'v1.4',
        DefaultDuration:1,
        Data:[storage,ELN,Database,datarepository,coderepository]
    };