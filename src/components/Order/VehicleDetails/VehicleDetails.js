import React, { Component } from 'react';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';
import * as actions from '../../../store/actions/index';
import styles from './VehicleDetails.module.css';


class VehicleDetails extends Component {

    componentDidMount() {
        this.props.authCheck();
    }

    state = {
        formContent: {
            make: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Make',
                    label: 'Make',
                    width: '100%',
                    disabled: false,
                    msgValue: '',
                    msgType: ''
                },
                required: true,
                value: ''
            },
            model: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Model',
                    label: 'Model',
                    disabled: false,
                    msgValue: '',
                    msgType: ''
                },
                value: ''
            },
            year: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Year',
                    label: 'Year',
                    width: '100%',
                    disabled: false,
                    msgValue: '',
                    msgType: ''
                },
                value: ''
            },
            color: {
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'color',
                    label: 'color',
                    width: '100%',
                    disabled: false,
                    msgValue: '',
                    msgType: ''
                },
                required: true,
                value: ''
            },
            vin: {
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'VIN',
                    label: 'VIN',
                    width: '100%',
                    disabled: false,
                    msgValue: '',
                    msgType: ''
                },
                required: true,
                value: ''
            },
            license: {
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'License #',
                    label: 'License #',
                    width: '100%',
                    disabled: false,
                    msgValue: '',
                    msgType: ''
                },
                required: true,
                value: ''
            },
            keyCodes: {
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'Key Codes',
                    label: 'Key Codes',
                    width: '100%',
                    disabled: false,
                    msgValue: '',
                    msgType: ''
                },
                value: ''
            },
            accountNumber: {
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'Account #',
                    label: 'Account #',
                    width: '100%',
                    disabled: false,
                    msgValue: '',
                    msgType: ''
                },
                value: ''
            },
            loanBalance: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Loan Balance',
                    label: 'Loan Balance',
                    width: '100%',
                    disabled: false,
                    msgValue: '',
                    msgType: ''
                },
                required: true,
                value: ''
            },
            monthlyPayment: {
                elementType: 'input',
                elementConfig: {
                    type: 'tel',
                    placeholder: 'Monthly Payment',
                    label: 'Monthly Payment',
                    width: '100%',
                    disabled: false,
                    msgValue: '',
                    msgType: ''
                },
                required: true,
                value: ''
            },
            datesDelinquent: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Dates Delinquent',
                    label: 'Dates Delinquent',
                    width: '100%',
                    disabled: false,
                    msgValue: '',
                    msgType: ''
                },
                required: true,
                value: ''
            },
            remarks: {
                elementType: 'text-area',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Remarks',
                    rows: 5,
                    label: 'Remarks',
                    width: '100%',
                    disabled: false
                },
                value: ''
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
        updatedFormElement.value = val;
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
                <div className={styles.FormContainer} >{formElementsArray.map(formElement => (
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
                    <div><Button type="submit" btnType="success">Next</Button></div>
                </div>
            </form>
            
        );

        return (
            <div style={{width: '100%'}}>
                <div style={{color: "white"}}><h1>Reposession Order - Vehicle Details</h1></div>
                {form}
            </div>
            
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmit: (data, history) => dispatch(actions.vehicleDetails(data, history)),
        authCheck: () => dispatch(actions.authCheckState())
    }
};


export default withCookies(withRouter(connect(null, mapDispatchToProps)(VehicleDetails)));