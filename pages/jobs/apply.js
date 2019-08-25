import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import jobMarket from '../../jobMarket';
import web3 from '../../web3';
import { Router, Link } from '../../routes';

class ApplyForJob extends Component {
    static async getInitialProps(props) {
        return { address: props.query.address };
    }

    state = {
        errorMessage: '',
        loading: false
    };

    onSubmit = async event => {
        event.preventDefault();

        this.setState({ errorMessage: '' });
        const { address } = this.props;

        try {
            const accounts = await web3.eth.getAccounts();
            await jobMarket.methods
                .applyForJob(address)
                .send({
                    from: accounts[0]
            });
            
            Router.pushRoute('/');
        
        } catch (err) {
            this.setState({ errorMessage: err.message });
        }
    };

    render() {
        return (
            <Layout>
                <h3>Apply for job</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Message error header="Error: Something Does Not Seem Right" content={this.state.errorMessage} />
                    <Button primary>Apply for this job!</Button>
                    <Link route='/'>
                        <Button secondary>
                            Cancel
                        </Button>
                    </Link>
                </Form>
            </Layout>
        );
    }
}

export default ApplyForJob;
