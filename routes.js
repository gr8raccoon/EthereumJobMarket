const routes = module.exports = require('next-routes')();
routes
     .add('/jobs/newjob', '/jobs/newjob')
     .add('/users/registeruser', '/users/registeruser')
     .add('/users/registercompany', '/users/registercompany')
     .add('/users/showcompanylist', '/users/showcompanylist')
     .add('/users/showjobseekerlist', '/users/showjobseekerlist')
     .add('/jobs/markascomplete/:address', '/jobs/markascomplete')
     .add('/users/showcompanyinfo/:address', '/users/showcompanyinfo')
     .add('/jobs/apply/:address', '/jobs/apply')
     .add('/jobs/:address', '/jobs/showjob')
     .add('/users/:address', '/user/showuserinfo');


module.exports = routes;
