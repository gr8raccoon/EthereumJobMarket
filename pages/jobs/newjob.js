import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import jobMarket from '../../jobMarket';
import web3 from '../../web3';
import { Router, Link } from '../../routes';

class CreateNewJob extends Component {
    state = {
        jobDescription: '',
        salary: '',
        errorMessage: '',
        loading: false
    };

    onSubmit = async event => {
        event.preventDefault();

        this.setState({ errorMessage: '' });

        try {
            const accounts = await web3.eth.getAccounts();
            await jobMarket.methods
                .addJob(this.state.jobDescription, this.state.salary)
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
                <h3>Post a Job</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Job Description</label>
                        <Input 
                            value={this.state.jobDescription}
                            onChange={event => 
                                this.setState({ jobDescription: event.target.value })}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Salary</label>
                        <Input 
                            value={this.state.salary}
                            onChange={event => 
                                this.setState({ salary: event.target.value })}
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

export default CreateNewJob;