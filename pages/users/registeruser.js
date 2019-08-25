import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import jobMarket from '../../jobMarket';
import web3 from '../../web3';
import { Router, Link } from '../../routes';

class CreateNewUser extends Component {
    state = {
        skills: '',
        CV: '',
        email: '',
        errorMessage: '',
        loading: false
    };

    onSubmit = async event => {
        event.preventDefault();
        try {
            const accounts = await web3.eth.getAccounts();
            await jobMarket.methods
                .registerUser(this.state.skills, this.state.CV, this.state.email)
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
                <h3>Register as a Job Seeker</h3>
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
                        <label>Skills</label>
                        <Input 
                            value={this.state.skills}
                            onChange={event => 
                                this.setState({ skills: event.target.value })}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Link to CV</label>
                        <Input 
                            value={this.state.CV}
                            onChange={event => 
                                this.setState({ CV: event.target.value })}
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

export default CreateNewUser;