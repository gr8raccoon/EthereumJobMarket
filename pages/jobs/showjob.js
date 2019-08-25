import React, { Component } from 'react';
import { Card, Grid, Button, Divider } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import JobMarket from '../../jobMarket';
import { Link } from '../../routes';

class ShowJobDetails extends Component {
  static async getInitialProps(props) {

    const jobDetails = await JobMarket.methods.getJobDetails(props.query.address).call();
    const isJobFilled = await JobMarket.methods.checkFilledJobs(props.query.address).call();
    const successfulApplicant = await JobMarket.methods.getEmployedJobSeeker(props.query.address).call();

    return {
      address: props.query.address,
      postDate: jobDetails[0],
      jobOwner: jobDetails[1],
      jobDescription: jobDetails[2],
      salaryPounds: jobDetails[3],
      applicantsCount: jobDetails[4],
      applicants: jobDetails[5],
      isFilled: String(isJobFilled),
      successfulCandidate: successfulApplicant
     };
  }

  renderApplicants() {
    const {
    applicants
  } = this.props;

  const items = [
      {
        header: applicants,
        meta: 'Addresses of All Applicants',
        style: { overflowWrap: 'break-word' },
      }
    ];
    return <Card.Group items={items} />;
  }

  renderJob() {
    const {
      address,
      postDate,
      jobOwner,
      jobDescription,
      salaryPounds,
      applicantsCount,
      applicants,
      isFilled,
      successfulCandidate
    } = this.props;

    const items = [
      {
        header: isFilled,
        meta: 'Is the position filled?',
      },
      {
        header: address,
        meta: 'Job Number',
        style: { overflowWrap: 'break-word' },

      },
      {
        header: postDate,
        meta: 'Job Posting Date',
      },
      {
        header: jobOwner,
        meta: <Link route={`/users/showcompanyinfo/${jobOwner}`}>Company Information</ Link>,
        style: { overflowWrap: 'break-word' },
      },
      {
        header: jobDescription,
        meta: 'Job Description',
      },
      {
        header: salaryPounds,
        meta: 'Salary (GBP/annum)',
      },
      {
        header: applicantsCount,
        meta: 'Number of Applicants',
      },
      {
        header: applicants,
        meta: 'Addresses of All Applicants',
        style: { overflowWrap: 'break-word' },
      },
      {
        header: successfulCandidate,
        meta: 'Person who got the job',
        style: { overflowWrap: 'break-word' },
      }
    ];
    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <Button.Group vertical floated="right" column={2}>
        <Link route={`/jobs/apply/${this.props.address}`}>
            <Button primary floated="right">
                Apply for this job!
            </Button>
        </Link>
        <Divider hidden />
        <Link route={`/jobs/markascomplete/${this.props.address}`}>
            <Button primary floated="right">
                Fill the position (for companies)
            </Button>
        </Link>
        <Divider hidden />
        <Link route="/">
            <Button secondary floated="right">
                Return to homepage
            </Button>
        </Link> 
        </Button.Group>
        <h3>Job Information:</h3>
        <Grid divided='vertically'>
          <Grid.Row columns={2}>
              <Grid.Column width={16}>{this.renderJob()}</Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}
export default ShowJobDetails;