import React, { Component } from 'react';
import { Card, Grid, Button, Divider } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import JobMarket from '../../jobMarket';
import { Link } from '../../routes';

class ShowJobSeeker extends Component {
  static async getInitialProps(props) {

    const userDetails = await JobMarket.methods.getJobSeekerDetails(props.query.address).call();

    return {
      address: props.query.address,
      registrationDate: userDetails[0],
      skills: userDetails[1],
      appliedJobs: userDetails[2],
      emailAddress: userDetails[3]
     };
  }

  renderJobSeeker() {
    const {
      address,
      registrationDate,
      skills,
      appliedJobs,
      emailAddress
    } = this.props;

    const items = [
      {
        header: address,
        meta: 'Job Number',
        style: { overflowWrap: 'break-word' },

      },
      {
        header: registrationDate,
        meta: 'User Registration Date',
      },
      {
        header: skills,
        meta: 'Job Seeker Skills',
        style: { overflowWrap: 'break-word' },

      },
      {
        header: appliedJobs,
        meta: 'Job Positions User Applied To',
        style: { overflowWrap: 'break-word' }

      },
      {
        header: emailAddress,
        meta: 'Job Seeker email',
      }
    ];
    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <Button.Group vertical floated="right" column={2}>
        <Link route="/">
            <Button secondary floated="right">
                Return to homepage
            </Button>
        </Link> 
        </Button.Group>
        <h3>User Information:</h3>
        <Grid divided='vertically'>
          <Grid.Row columns={2}>
              <Grid.Column width={16}>{this.renderJobSeeker()}</Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}
export default ShowJobSeeker;
