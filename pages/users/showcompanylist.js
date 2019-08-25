import React, { Component } from 'react';
import { Button, List, Divider } from 'semantic-ui-react';
import jobMarket from '../../jobMarket';
import Layout from '../../components/Layout';
import { Link } from '../../routes';

class CompanyShow extends Component {
    static async getInitialProps() {
        const companies = await jobMarket.methods.getAllCompanies().call();
        return { companies };
    }
    
    renderCompanies() {
        const items = this.props.companies.map(address => {
          return {
            header: address,
            description: (
              <Link route={`/users/showcompanyinfo/${address}`}>
                <a>Company Details</a>
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
                    <h3>Registered Companies</h3>
                    <Link route="/users/registercompany">
                        <a>
                            <Button
                            floated = "right"
                            content = "Register new company"
                            icon = "add circle"
                            primary = {true}
                            />
                        </a>  
                    </Link>
                </div>
                <ul>{this.renderCompanies()}</ul>
            </Layout>
        );
    }
}

export default CompanyShow;