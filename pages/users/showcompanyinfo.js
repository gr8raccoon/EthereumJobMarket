import React, { Component } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import JobMarket from '../../jobMarket';
import { Link } from '../../routes';

class ShowCompany extends Component {
  static async getInitialProps(props) {

    const userDetails = await JobMarket.methods.getCompanyDetails(props.query.address).call();

    return {
      address: props.query.address,
      registrationDate: userDetails[0],
      emailAddress: userDetails[2],
      companyProfile: userDetails[1]
     };
  }

  renderCompany() {
    const {
      registrationDate,
      emailAddress,
      companyProfile
    } = this.props;

    const items = [
      {
        header: registrationDate,
        meta: 'User Registration Date',
      },
      {
        header: emailAddress,
        meta: 'Job Seeker email',
      },
      {
        header: companyProfile,
        meta: 'Company Profile'
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
        <h3>Company Information:</h3>
        <Grid divided='vertically'>
          <Grid.Row columns={2}>
              <Grid.Column width={16}>{this.renderCompany()}</Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}
export default ShowCompany;