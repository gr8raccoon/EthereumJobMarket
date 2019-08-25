import React, { Component } from 'react';
import { Button, List, Divider } from 'semantic-ui-react';
import jobMarket from '../jobMarket';
import Layout from '../components/Layout';
import { Link } from '../routes';

class Jobs extends Component {
    static async getInitialProps() {
        const jobs = await jobMarket.methods.getAllJobs().call();
        return { jobs };
    }
    
    renderJobs() {
        const items = this.props.jobs.map(address => {
          return {
            header: address,
            description: (
              <Link route={`/jobs/${address}`}>
                <a>Job Details</a>
              </Link>
            ),
          };
        });
        return <List items={items}/>;
    }

    render() {
        return (
            <Layout>
              <div>
                    <h3>Available Jobs</h3>
                    <Link route="/jobs/newjob">
                        <a>
                            <Button
                            floated = "right"
                            content = "Post Job (for companies)"
                            icon = "add circle"
                            primary = {true}
                            />
                        </a>  
                    </Link>
                </div>
                <ul>{this.renderJobs()}</ul>
            </Layout>
        );
    }
}

export default Jobs;
