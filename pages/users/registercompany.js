import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import jobMarket from '../../jobMarket';
import web3 from '../../web3';
import { Router, Link } from '../../routes';

class CreateNewCompany extends Component {
    state = {
        companyProfile: '',
        email: '',
        errorMessage: '',
        loading: false
    };
    onSubmit = async event => {
        event.preventDefault();
        try {
            const accounts = await web3.eth.getAccounts();
            await jobMarket.methods
                .registerCompany(this.state.email, this.state.companyProfile)
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
                <h3>Register as a Company</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Email</label>
                        <Input 
                            value={this.state.email}
                            onChange={event => 
                                this.setState({ email: event.target.value })}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Company Profile</label>
                        <Input 
                            value={this.state.companyProfile}
                            onChange={event => 
                                this.setState({ companyProfile: event.target.value })}
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

export default CreateNewCompany;
