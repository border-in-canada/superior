import React, { Component } from 'react';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';
import * as actions from '../../../store/actions/index';
import styles from './DebtorDetails.module.css';
import { stateArray } from '../../../config/stateArray';


class DebtorDetails extends Component {

    componentDidMount() {
        this.props.authCheck();
    }

    state = {
        formContent: {
            debtorName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Debtor Name',
                    label: 'Debtor Name',
                    width: '100%',
                    disabled: false,
                    msgValue: '',
                    msgType: ''
                },
                required: true,
                value: this.props.debtorData.debtorName
            },
            debtorEmail: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email',
                    label: 'Email',
                    disabled: false,
                    msgValue: '',
                    msgType: ''
                },
                value: this.props.debtorData.debtorEmail
            },
            debtorPhone: {
                elementType: 'input',
                elementConfig: {
                    type: 'tel',
                    placeholder: 'Phone',
                    label: 'Phone',
                    width: '100%',
                    disabled: false,
                    msgValue: '',
                    msgType: ''
                },
                value: this.props.debtorData.debtorPhone
            },
            debtorAddress: {
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'Address',
                    label: 'Address',
                    width: '100%',
                    disabled: false,
                    msgValue: '',
                    msgType: ''
                },
                required: true,
                value: this.props.debtorData.debtorAddress
            },
            debtorCity: {
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
                value: this.props.debtorData.debtorCity
            },
            debtorStateProvince: {
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
                value: this.props.debtorData.debtorStateProvince
            },
            debtorPostalCode: {
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
                value: this.props.debtorData.debtorPostalCode
            },
            debtorSSN: {
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'SSN',
                    label: 'SSN',
                    width: '100%',
                    disabled: false,
                    msgValue: '',
                    msgType: ''
                },
                value: this.props.debtorData.debtorSSN
            },
            debtorDOB: {
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'Birthdate',
                    label: 'Birthdate',
                    width: '100%',
                    disabled: false,
                    msgValue: '',
                    msgType: ''
                },
                value: this.props.debtorData.debtorDOB
            },
            employer: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Employer',
                    label: 'Employer',
                    width: '100%',
                    disabled: false,
                    msgValue: '',
                    msgType: ''
                },
                required: true,
                value: this.props.debtorData.employer
            },
            employerAddress: {
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'Address',
                    label: 'Address',
                    width: '100%',
                    disabled: false,
                    msgValue: '',
                    msgType: ''
                },
                required: true,
                value: this.props.debtorData.employerAddress
            },
            employerCity: {
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
                value: this.props.debtorData.employerCity
            },
            employerStateProvince: {
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
                value: ''
            },
            employerPostalCode: {
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
                value: this.props.debtorData.employer
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
            <form  onSubmit={this.submitHandler}>
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
                <div style={{color: "white"}}><h1>Reposession Order - Debtor Details</h1></div>
                {form}
            </div>
            
        );
    }
}

const mapStateToProps = state => {
    return {
        debtorData: state.auth.orderEditData.debtorDetails,
        debtorDataBool: state.auth.orderEditData.debtorDetails.debtorStateProvince !== '',
        employerDataBool: state.auth.orderEditData.debtorDetails.employerStateProvince !== ''
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmit: (data, history) => dispatch(actions.debtorDetails(data, history)),
        authCheck: () => dispatch(actions.authCheckState())
    }
};


export default withCookies(withRouter(connect(mapStateToProps, mapDispatchToProps)(DebtorDetails)));