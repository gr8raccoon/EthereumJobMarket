pragma solidity ^0.5.8;

contract JobMarket {

    modifier onlyRegisteredJobSeekers() {
        require(user[msg.sender].isJobSeeker == true, 'please, register as a job seeker to access this functionality');
        _;
    }

    modifier onlyRegisteredCompanies() {
        require(user[msg.sender].isCompany == true, 'please, get a business account to use this functionality');
        _;
    }

    modifier onlyRegisteredUsers() {
        require(user[msg.sender].isJobSeeker == true || user[msg.sender].isJobSeeker == true,
         'please, register first to access this functionality');
        _;
    }

    struct JobPost {
        uint postDate;
        address jobOwner;
        string jobDescription;
        uint64 salaryPounds;
        address[] applicants;
        bool isComplete;
        address successfulCandidate;
    }

    struct User {
        uint registrationDate;
        string emailAddress;
        string skills;
        string companyProfile;
        address[] appliedJobs;
        string CV;
        bool isJobSeeker;
        bool isCompany;
    }

    mapping(address => JobPost) public jobPost;
    mapping(address => User) public user;
    mapping(address => address) public userJobApplication;

    address[] public allJobs;
    address[] public allJobSeekers;
    address[] public allCompanies;

    event JobAdded(address indexed jobID, address indexed jobPoster, string indexed description);
    event JobApplied(address indexed jobID, address indexed jobSeeker, uint indexed applicationDate);
    event JobSeekerCreated(address indexed userID, uint indexed registrationDate);
    event CompanyCreated(address indexed companyID, uint indexed registrationDate);
    event PositionFilled(address indexed jobID, address indexed jobSeekerAddress);

    function addJob(string memory _jobDescription, uint64 _salary) public onlyRegisteredCompanies returns(bool) {
        uint tmp = uint(keccak256(abi.encodePacked(now, msg.sender)));
        address _jobID = address(tmp);
        JobPost storage jp = jobPost[_jobID];
        jp.postDate = now;
        jp.jobOwner = msg.sender;
        jp.jobDescription = _jobDescription;
        jp.salaryPounds = _salary;
        jp.isComplete = false;
        allJobs.push(_jobID);
        emit JobAdded(_jobID, msg.sender, _jobDescription);
        return true;
    }

    function applyForJob(address _jobID) public onlyRegisteredJobSeekers returns(bool){
        require(jobPost[_jobID].isComplete == false, 'this position has already been filled');
        require(userJobApplication[msg.sender] != _jobID, 'you have already applied to this job');
        JobPost storage jp = jobPost[_jobID];
        User storage u = user[msg.sender];
        jp.applicants.push(msg.sender);
        u.appliedJobs.push(_jobID);
        userJobApplication[msg.sender] = _jobID;
        emit JobApplied(_jobID, msg.sender, now);
        return true;
    }

    function getJobDetails(address _jobID) public view returns(uint _postDate,
        address _jobOwner, string memory _jobDescription, uint64 _salary, uint _applicantsCount, address[] memory _applicants){
        JobPost memory jp = jobPost[_jobID];
        uint applicantsCount = jp.applicants.length;
        return(jp.postDate, jp.jobOwner, jp.jobDescription, jp.salaryPounds, applicantsCount, jp.applicants);
    }

    function getJobSeekerDetails(address _jobSeekerAddress) public onlyRegisteredCompanies view returns(uint,
        string memory, address[] memory, string memory, string memory){
        User memory u = user[_jobSeekerAddress];
        return(u.registrationDate, u.skills, u.appliedJobs, u.CV, u.emailAddress);
    }

    function getCompanyDetails(address _companyID) public view returns(uint,
        string memory, string memory){
            User memory u = user[_companyID];
            return(u.registrationDate, u.emailAddress, u.companyProfile);
        }

    function registerUser(string memory _skills, string memory _CV, string memory _email) public returns(bool){
        require(user[msg.sender].isJobSeeker == false && user[msg.sender].isCompany == false,
         'this user has already been registered');
        User storage u = user[msg.sender];
        u.registrationDate = now;
        u.skills = _skills;
        u.CV = _CV;
        u.isJobSeeker = true;
        u.isCompany = false;
        u.emailAddress = _email;
        allJobSeekers.push(msg.sender);
        emit JobSeekerCreated(msg.sender, now);
        return true;
    }

    function registerCompany(string memory _companyProfile, string memory _email) public returns(bool){
        require(user[msg.sender].isJobSeeker == false && user[msg.sender].isCompany == false,
         'this user has already been registered');
        User storage u = user[msg.sender];
        u.registrationDate = now;
        u.companyProfile = _companyProfile;
        u.isJobSeeker = false;
        u.isCompany = true;
        u.emailAddress = _email;
        allCompanies.push(msg.sender);
        emit CompanyCreated(msg.sender, u.registrationDate);
        return true;
    }

    function fillPosition(address _jobID, address _jobSeekerAddress) public onlyRegisteredCompanies returns(bool){
        require(jobPost[_jobID].jobOwner == msg.sender, "only job poster can mark the position as complete");
        require(jobPost[_jobID].isComplete == false, "this position has already been filled");
        JobPost storage jp = jobPost[_jobID];
        jp.isComplete = true;
        jp.successfulCandidate = _jobSeekerAddress;
        emit PositionFilled(_jobID, _jobSeekerAddress);
        return true;
    }

    function getAllJobs() public view returns(address[] memory){
        return allJobs;
    }

    function getJobsUserAppliedTo(address _userID) public view returns(address[] memory){
        return user[_userID].appliedJobs;
    }

    function getJobsCompanyPosted(address _companyID) public view returns(address[] memory){
        return jobPost[_companyID].applicants;
    }

    function checkFilledJobs(address _jobID) public view returns(bool){
        if(jobPost[_jobID].isComplete == true){
            return true;
        } else {
            return false;
        }
    }

    function getEmployedJobSeeker(address _jobID) public view returns(address) {
        if(jobPost[_jobID].isComplete == true){
            return jobPost[_jobID].successfulCandidate;
        }
    }

    function getAllCompanies() public view returns(address[] memory){
        return allCompanies;
    }

    function getAllJobSeekers() public view returns(address[] memory){
        return allJobSeekers;
    }
}
