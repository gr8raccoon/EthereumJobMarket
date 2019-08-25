# EthereumJobMarket
Assembling smart contracts with Ethereum Solidity and user interface with React.js.
The platform allows employers to register, post jobs, employ candidates; 
for candidates, the application is used to find job opportunities and apply for the positions. 

The application uses Ethereum Rinkeby test network to facilitate storage and retrieval of data.

Packages required: next, next-routes, react, react-dom, semantic-ui-css, semantic-ui-react, solc@0.5.8, truffle, truffle-hdwallet-provider, web3

# DApp Screenshots

***Job List Page**
This page provides UI to observe available jobs, post new jobs (for companies) and contains links for job details

![joblist](/screenshots/joblist.png)

***Job Information Page**
Job Information page retrieves data from the blockchain and provides information about date, company who created the posting, description, salary, and information about the applicants

![jobinfo](/screenshots/jobinfo.png)

***Create a Job Page**
Create new job page allows companies to create new job listings. Companies are required to provide description of the job and salary (in GBP).

![newjob](/screenshots/newjob.png)

***Register as a Job Seeker Page**
This page allows people to register to apply for jobs. Information required: email address, skills, and link to CV.

![registerjobcandidate](/screenshots/registerjobcandidate.png)

***User Information Page**
User information page contains user information that is retrieved from the blockchain.

![userinfo](/screenshots/userinfo.png)
