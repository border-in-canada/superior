import React, { Component } from 'react';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';
import * as actions from '../../../store/actions/index';
import styles from './OrderDetails.module.css';
import { stateArray } from '../../../config/stateArray';


class OrderDetails extends Component {

    componentDidMount() {
        this.props.authCheck();
    }

    state = {
        formContent: {
            agency: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Agency',
                    label: 'Agency',
                    width: '100%',
                    disabled: false,
                    msgValue: '',
                    msgType: ''
                },
                required: true,
                value: this.props.orderData.agency
            },
            officer: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Officer',
                    label: 'Officer',
                    disabled: false,
                    msgValue: '',
                    msgType: ''
                },
                value: this.props.orderData.officer
            },
            agencyPhone: {
                elementType: 'input',
                elementConfig: {
                    type: 'tel',
                    placeholder: 'Agency Phone',
                    label: 'Agency Phone',
                    width: '100%',
                    disabled: false,
                    msgValue: '',
                    msgType: ''
                },
                value: this.props.orderData.agencyPhone
            },
            transportAddress: {
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'Transport To Address',
                    label: 'Transport To Address',
                    width: '100%',
                    disabled: false,
                    msgValue: '',
                    msgType: ''
                },
                required: true,
                value: this.props.orderData.transportAddress
            },
            transportCity: {
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'City',
                    label: 'City',
                    width: '100%',
                    disabled: false,
                    msgValue: '',
                    msgType: ''
                },
                required: true,
                value: this.props.orderData.transportCity
            },
            transportStateProvince: {
                elementType: 'select',
                elementConfig: {
                    type: 'select',
                    placeholder: 'State',
                    label: 'State',
                    options: stateArray,
                    width: '100%',
                    disabled: false,
                    msgValue: '',
                    msgType: ''
                },
                required: true,
                value: this.props.orderData.transportStateProvince
            },
            transportPostalCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'Zip Code',
                    label: 'Zip Code',
                    width: '100%',
                    disabled: false,
                    msgValue: '',
                    msgType: ''
                },
                required: true,
                value: this.props.orderData.transportPostalCode
            }
        }
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedFormContent = {...this.state.formContent};
        const updatedFormElement = {...updatedFormContent[inputIdentifier]};
        updatedFormElement.value = event.target.value;
        updatedFormContent[inputIdentifier] = updatedFormElement;
        this.setState({formContent: updatedFormContent});
    }

    dropdownChangedHandler = (val, inputId) => {
        const updatedFormContent = {...this.state.formContent};
        const updatedFormElement = {...updatedFormContent[inputId]};
        updatedFormElement.value = val.value;
        updatedFormContent[inputId] = updatedFormElement;
        this.setState({formContent: updatedFormContent});
    }
    
    submitHandler = (event) => {
        event.preventDefault();
        const data = {};
        
        for (let formElementIdentifier in this.state.formContent) {
            data[formElementIdentifier] = this.state.formContent[formElementIdentifier].value;
        };
        this.props.onSubmit(data, this.props.history);
    }

    render () {

        const formElementsArray = [];
        for (let key in this.state.formContent) {
            formElementsArray.push({
                id: key,
                config: this.state.formContent[key]
            });
        }

        let form = (
            <form onSubmit={this.submitHandler}>
                <div className={styles.FormContainer}>{formElementsArray.map(formElement => (
                    <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType} 
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    dropdownChanged={(val) => this.dropdownChangedHandler(val, formElement.id)}
                    />
                ))}</div>
                <div className={styles.ButtonContainer}>
                    <Button type="submit" btnType="success">Next</Button>
                </div>
            </form>
            
        );

        return (
            <div style={{width: '100%'}}>
                <div style={{color: "white"}}><h1>Reposession Order - Order Details</h1></div>
                {form}
            </div>
            
        );
    }
}

const mapStateToProps = state => {
    return {
        orderData: state.auth.orderEditData.orderDetails
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmit: (data, history) => dispatch(actions.orderDetails(data, history)),
        authCheck: () => dispatch(actions.authCheckState())
    }
};


export default withCookies(withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderDetails)));