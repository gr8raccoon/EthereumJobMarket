import React, { Component } from 'react';
import { Button, List, Divider } from 'semantic-ui-react';
import jobMarket from '../../jobMarket';
import Layout from '../../components/Layout';
import { Link } from '../../routes';

class JobSeekerShow extends Component {
    static async getInitialProps() {
        const candidates = await jobMarket.methods.getAllJobSeekers().call();
        return { candidates };
    }
    
    renderCandidates() {
        const items = this.props.candidates.map(address => {
          return {
            header: address,
            description: (
              <Link route={`/users/showuserinfo/${address}`}>
                <a>Candidate Details</a>
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
                    <h3>Registered Job Seekers</h3>
                    <Link route="/users/registeruser">
                        <a>
                            <Button
                            floated = "right"
                            content = "Create Account"
                            icon = "add circle"
                            primary = {true}
                            />
                        </a>  
                    </Link>
                </div>
                <ul>{this.renderCandidates()}</ul>
            </Layout>
        );
    }
}

export default JobSeekerShow;