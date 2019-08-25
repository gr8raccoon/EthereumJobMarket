import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import jobMarket from '../../jobMarket';
import web3 from '../../web3';
import { Router, Link } from '../../routes';

class MarkJobAsComplete extends Component {
    static async getInitialProps(props) {
        return { address: props.query.address };
    }

    state = {
        jobSeekerAddress: '',
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
                .fillPosition(address, this.state.jobSeekerAddress)
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
                <h3>Accept User to Job</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Job Seeker Address</label>
                        <Input 
                            value={this.state.jobSeekerAddress}
                            onChange={event => 
                                this.setState({ jobSeekerAddress: event.target.value })}
                        />
                    </Form.Field>
                    <Message error header="Error: Something Does Not Seem Right" content={this.state.errorMessage} />
                    <Button primary>Create!</Button>
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

export default MarkJobAsComplete;