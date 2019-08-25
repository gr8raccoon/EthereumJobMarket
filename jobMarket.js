import web3 from './web3';

const address = '0xCDA7be24f67EF397DfC5fed2188485355c112211';

const abi =
[
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "allCompanies",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "name": "user",
    "outputs": [
      {
        "name": "registrationDate",
        "type": "uint256"
      },
      {
        "name": "emailAddress",
        "type": "string"
      },
      {
        "name": "skills",
        "type": "string"
      },
      {
        "name": "companyProfile",
        "type": "string"
      },
      {
        "name": "CV",
        "type": "string"
      },
      {
        "name": "isJobSeeker",
        "type": "bool"
      },
      {
        "name": "isCompany",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "allJobs",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "allJobSeekers",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "name": "jobPost",
    "outputs": [
      {
        "name": "postDate",
        "type": "uint256"
      },
      {
        "name": "jobOwner",
        "type": "address"
      },
      {
        "name": "jobDescription",
        "type": "string"
      },
      {
        "name": "salaryPounds",
        "type": "uint64"
      },
      {
        "name": "isComplete",
        "type": "bool"
      },
      {
        "name": "successfulCandidate",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "name": "userJobApplication",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "jobID",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "jobPoster",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "description",
        "type": "string"
      }
    ],
    "name": "JobAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "jobID",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "jobSeeker",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "applicationDate",
        "type": "uint256"
      }
    ],
    "name": "JobApplied",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "userID",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "registrationDate",
        "type": "uint256"
      }
    ],
    "name": "JobSeekerCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "companyID",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "registrationDate",
        "type": "uint256"
      }
    ],
    "name": "CompanyCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "jobID",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "jobSeekerAddress",
        "type": "address"
      }
    ],
    "name": "PositionFilled",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_jobDescription",
        "type": "string"
      },
      {
        "name": "_salary",
        "type": "uint64"
      }
    ],
    "name": "addJob",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_jobID",
        "type": "address"
      }
    ],
    "name": "applyForJob",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_jobID",
        "type": "address"
      }
    ],
    "name": "getJobDetails",
    "outputs": [
      {
        "name": "_postDate",
        "type": "uint256"
      },
      {
        "name": "_jobOwner",
        "type": "address"
      },
      {
        "name": "_jobDescription",
        "type": "string"
      },
      {
        "name": "_salary",
        "type": "uint64"
      },
      {
        "name": "_applicantsCount",
        "type": "uint256"
      },
      {
        "name": "_applicants",
        "type": "address[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_jobSeekerAddress",
        "type": "address"
      }
    ],
    "name": "getJobSeekerDetails",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      },
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "address[]"
      },
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_companyID",
        "type": "address"
      }
    ],
    "name": "getCompanyDetails",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      },
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_skills",
        "type": "string"
      },
      {
        "name": "_CV",
        "type": "string"
      },
      {
        "name": "_email",
        "type": "string"
      }
    ],
    "name": "registerUser",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_companyProfile",
        "type": "string"
      },
      {
        "name": "_email",
        "type": "string"
      }
    ],
    "name": "registerCompany",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_jobID",
        "type": "address"
      },
      {
        "name": "_jobSeekerAddress",
        "type": "address"
      }
    ],
    "name": "fillPosition",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getAllJobs",
    "outputs": [
      {
        "name": "",
        "type": "address[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_userID",
        "type": "address"
      }
    ],
    "name": "getJobsUserAppliedTo",
    "outputs": [
      {
        "name": "",
        "type": "address[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_companyID",
        "type": "address"
      }
    ],
    "name": "getJobsCompanyPosted",
    "outputs": [
      {
        "name": "",
        "type": "address[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_jobID",
        "type": "address"
      }
    ],
    "name": "checkFilledJobs",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_jobID",
        "type": "address"
      }
    ],
    "name": "getEmployedJobSeeker",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getAllCompanies",
    "outputs": [
      {
        "name": "",
        "type": "address[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getAllJobSeekers",
    "outputs": [
      {
        "name": "",
        "type": "address[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];

export default new web3.eth.Contract(abi, address);
