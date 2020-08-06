import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import styles from './OrderSummary.module.css';
import Button from '../../UI/Button/Button';
import LinkButton from '../../UI/LinkButton/LinkButton';
import Modal from '../../UI/Modal/Modal';

class OrderSummary extends Component {

    componentDidMount() {
        this.props.authCheck();
    }

    state = {
        show: false,
        showModal: false
    }

    updateButtonClickHandler = (event) => {
        event.preventDefault();
        this.props.editSubmit(this.props.orderSummary, this.props.history);
    }

    addButtonClickHandler = (event) => {
        this.setState({
            show: true,
            showModal: true
        });
    }

    submitButtonClickHandler = (event) => {
        event.preventDefault();
        this.props.addSubmit(this.props.orderSummary, this.props.history);
    }

    cancelButtonClickHandler = (event) => {
        event.preventDefault();
        this.props.cancelSubmit(this.props.history);
    }

    clickHandler = (event) => {
        this.setState({
            show: !this.state.show,
            showModal: !this.state.showModal
        })
    }

    render () {
        return (
            <div className={styles.SummaryContainer}>
                {this.props.isEditing ?
                 <div className={styles.ButtonContainer}>
                    <Button clicked={this.updateButtonClickHandler} btnType="success">Update</Button>
                    <LinkButton to="/edit-order/debtor-details" btnType="success">Edit</LinkButton>
                    <Button clicked={this.cancelButtonClickHandler} btnType="success">Cancel</Button>
                </div> : null
                }
                <h1>Order Summary</h1>
                <div className={styles.Heading}><h3>Debtor Details</h3></div>
                {
                    Object.keys(this.props.orderSummary.debtorDetails).map((key, i) => (
                        <div className={styles.Item} key={i}><p style={{color: 'orange', display: 'inline', marginRight: '.5em'}}><strong>{key}:</strong></p><p style={{display: 'inline'}}> {this.props.orderSummary.debtorDetails[key]}</p></div>
                    ))
                }
                <div className={styles.Heading}><h3>Vehicle Details</h3></div>
                {
                    Object.keys(this.props.orderSummary.vehicleDetails).map((key, i) => (
                        <div className={styles.Item} key={i}><p style={{color: 'orange', display: 'inline', marginRight: '.5em'}} ><strong>{key}:</strong></p><p style={{display: 'inline'}}>  {this.props.orderSummary.vehicleDetails[key]}</p></div>
                    ))
                }
                <div className={styles.Heading}><h3>Order Details</h3></div>
                {
                    Object.keys(this.props.orderSummary.orderDetails).map((key, i) => (
                        <div className={styles.Item} key={i}><p style={{color: 'orange', display: 'inline', marginRight: '.5em'}}><strong>{key}:</strong></p><p style={{display: 'inline'}}>{this.props.orderSummary.orderDetails[key]}</p></div>
                    ))
                }
                { !this.props.isEditing ?
                <div className={styles.SubmitContainer}>
                    <Button clicked={this.addButtonClickHandler} btnType="success">Submit</Button>
                    <Button clicked={this.cancelButtonClickHandler} btnType="success">Cancel</Button>
                </div>: null }
                <Modal show={this.state.show} showModal={this.clickHandler}>
                    <p>By submitting this order, you are hereby ordering Superior Recovery to seize the following described property (until otherwise notified) on sight, and all collateral assigned either written or verbally.</p><br />
                    <p>Additionally, you agree to idemnify and save Superior Recovery harmless from and against any and all claims, damages, losses, or action resulting from or arising out of our efforts to collects the claims, except, however, such as may be caused by or arise out of the negligence or unauthorized acts of Superior Recovery, it's officers, employees or agents, or the officers of employees of such agents.</p><br />
                    <p>This authorization does constitute authority to place the said accounts in the hands of attorneys for legal action if necessary.</p><br />
                    <div className={styles.SubmitContainer}>
                        <Button clicked={this.submitButtonClickHandler} btnType="success">Submit</Button>
                        <Button clicked={this.cancelButtonClickHandler} btnType="success">Cancel</Button>
                    </div>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orderSummary: state.auth.orderEditData,
        isEditing: state.auth.editing
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addSubmit: (data, history) => dispatch(actions.addOrder(data, history)),
        editSubmit: (data, history) => dispatch(actions.updateOrder(data, history)),
        cancelSubmit: (history) => dispatch(actions.cancelSubmit(history)),
        authCheck: () => dispatch(actions.authCheckState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderSummary);