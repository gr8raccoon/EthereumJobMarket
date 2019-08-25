# EthereumJobMarket
Assembling smart contracts with Ethereum Solidity and user interface with React.js.
The platform allows employers to register, post jobs, employ candidates; 
for candidates, the application is used to find job opportunities and apply for the positions. 

The application uses Ethereum Rinkeby test network to facilitate storage and retrieval of data.

Packages required: next, next-routes, react, react-dom, semantic-ui-css, semantic-ui-react, solc@0.5.8, truffle, truffle-hdwallet-provider, web3

* Folder Map *
.
├── build
│   └── contracts
│       ├── JobMarket.json
│       └── Migrations.json
├── components
│   ├── Header.js
│   └── Layout.js
├── contracts
│   ├── JobMarket.sol
│   └── Migrations.sol
├── jobMarket.js
├── migrations
│   ├── 1_initial_migration.js
│   └── 2_deploy_contracts.js
├── package.json
├── pages
│   ├── index.js
│   ├── jobs
│   │   ├── apply.js
│   │   ├── markascomplete.js
│   │   ├── newjob.js
│   │   └── showjob.js
│   └── users
│       ├── registercompany.js
│       ├── registeruser.js
│       ├── showcompanyinfo.js
│       ├── showcompanylist.js
│       ├── showjobseekerlist.js
│       └── showuserinfo.js
├── routes.js
├── server.js
├── truffle-config.js
└── web3.js


