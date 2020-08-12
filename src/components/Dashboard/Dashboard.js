import React, { Component } from 'react';
import * as actions from '../../store/actions/index';
import styles from './Dashboard.module.css';
import Griddle, { selectors, utils } from 'griddle-react'; 
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';
import LinkButton from '../UI/LinkButton/LinkButton';
import FilterInput from '../UI/FilterInput/FilterInput';
import FiltDropdown from '../UI/FiltDropdown/FiltDropdown';
import axios from 'axios';
import _ from 'lodash';

const getOrdersForGrid = (currentPage, pagesize, searchString, filterType, callback) => {
    const uri = `https://api.superiorrecoveryllc.com/dashboard/orders?filter=${searchString}&by=${filterType}&page=${currentPage}&pagesize=${pagesize}`;
    axios.get(uri, { withCredentials: true })
      .then((response) => {
        callback(response.data.orders, response.data.currentPage, response.data.pagesize, response.data.totalItems)
      }, (error) => {
        return error
      }
    );
};

class Dashboard extends Component {

    state= {
        data: [],
        pageSize: 0,
        currentPage: 0,
        recordCount: 0,
        loading: true,
        filterVal: '',
        filterBy: ''
    }

    componentDidMount() {
        this.props.authCheck();
        //Initial grid API Call
        axios.get('https://api.superiorrecoveryllc.com/dashboard/orders?page=1&pagesize=4', { withCredentials: true } )
        .then(res => {
            this.setState(state => ({
                data: res.data.orders,
                pageSize: res.data.pagesize,
                currentPage: res.data.currentPage,
                recordCount: res.data.totalItems,
                loading: false
            }));
        })
        .catch(err => {
            console.log(err);
        });
        
    }

    updateTableState = (data, currentPage, pagesize, totalItems) => {
        this.setState({
            data: data, 
            currentPage: currentPage,
            pageSize: pagesize,
            recordCount: totalItems
        });
      }

    //Pagination
    _onNext = () => {
        const { currentPage, pageSize } = this.state;
        getOrdersForGrid(currentPage + 1, pageSize, '', '', this.updateTableState);
    }

    _onPrevious = () => {
    const { currentPage, pageSize } = this.state;
    getOrdersForGrid(currentPage - 1, pageSize, '', '', this.updateTableState);
    }

    _onGetPage = (pageNumber) => {
        const { pageSize } = this.state;
        getOrdersForGrid(pageNumber, pageSize, '', '', this.updateTableState);
    }

    onFilter = (event) => {
        event.persist();
        this.setState({filterVal: event.target.value});
        if (!this.debouncedFn) {
            this.debouncedFn = _.debounce(() => {
                let searchString = event.target.value;
                let filter = this.state.filterBy.value;
                getOrdersForGrid(1, this.state.pageSize, searchString, filter, this.updateTableState);
            }, 300);
        }
        this.debouncedFn();
    }

    onClickHandler = (rowData) => {
        this.props.getOrder(rowData._id, this.props.history);
    }

    filterByHandler = (val) => {
        this.setState({
            filterBy: val
        })
    }

    render() {
        //Grid Configurations
        const layout = ({ Table, Pagination, Filter, SettingsWrapper }) => (
            <div>
                <div className={styles.Layout}>
                </div>
                <div className={styles.Table}><Table /></div>
                <div className={styles.Pagination}>
                    <Pagination />
                </div>
            </div>
            
        );

        const styleConfig = {
            styles: {
                Table: {borderCollapse: 'collapse', width: '100%'},
                TableHeading: {color: '#394F3C'},
                TableHeadingCell: {padding: '2em', borderBottom: '1px solid rgb(199, 198, 198)'},
                NextButton: {marginLeft: '1em', width: '5em', height: '2em'},
                PreviousButton: {marginRight: '1em', width: '5em', height: '2em'},
                PageDropdown: {marginLeft: '0em', borderRadius: '3px'}
            },
            classNames: {
                SettingsToggle: styles.SettingsButton,
                Filter: styles.Filter,
                Row: styles.Row,
                Cell: styles.Cell
            }
        }

        const CustomRowComponent = utils.connect((state, props) => ({
            rowData: selectors.rowDataSelector(state, props)
          }))(({ rowData }) => (
            <div onClick={() => this.onClickHandler(rowData)} className={styles.Card}>
              <div className={styles.cardHeading}><h1>{rowData.debtorDetails.debtorName}</h1></div>
              <div className={styles.cardColumnContainer}>
                <div className={styles.cardColumn}>
                    <ul>
                    <li><strong>Address</strong>: {rowData.debtorDetails.debtorAddress}</li>
                    <li><strong>State</strong>: {rowData.debtorDetails.debtorStateProvince}</li>
                    <li><strong>Zip</strong>: {rowData.debtorDetails.debtorPostalCode}</li>
                    </ul>
                </div>
                <div className={styles.cardColumn}>
                    <ul>
                    <li><strong>City</strong>: {rowData.debtorDetails.debtorCity}</li>
                    <li><strong>Email</strong>: {rowData.debtorDetails.debtorEmail}</li>
                    <li><strong>Phone</strong>: {rowData.debtorDetails.debtorPhone}</li>
                    </ul>
                </div> 
                <div className={styles.cardColumn}>
                    <ul>
                    <li><strong>Vehicle Make</strong>: {rowData.vehicleDetails.make}</li>
                    <li><strong>Vehicle Model</strong>: {rowData.vehicleDetails.model}</li>
                    <li><strong>Vehicle Year</strong>: {rowData.vehicleDetails.year}</li>
                    </ul>
                </div>                 
              </div>
            </div>
        ));

        const CustomTableComponent = OriginalComponent => class CustomTableComponent extends Component {
            static contextTypes = {
              components: PropTypes.object.isRequired
            }
            render() {
              return <this.context.components.TableBody />
            }
        };
        
          const CustomTableBody = ({ rowIds, Row, style, className }) => (
            <div style={style} className={className}>
              { rowIds && rowIds.map(r => <Row key={r} griddleKey={r} />) }
            </div>
        );
        
        const { data, pageSize, currentPage, recordCount }  = this.state;
        const { cookies } = this.props;
        const userData = cookies.get('session');
        const user = userData.email;

        const selectOptions = [
            {value: 'debtorName', label: 'Debtor Name'},
            {value: 'debtorCity', label: 'Debtor City'},
            {value: 'make', label: 'Make'},
            {value: 'model', label: 'Model'},
            {value: 'transportAddress', label: 'Transport To'},
            {value: 'loanBalance', label: 'Loan Balance'},
            {value: '_id', label: 'Order Id'}
            ]

        return (
            <div className={styles.Container}>
                <h1>Welcome {user}!</h1>
                <LinkButton to="/create-order/debtor-details">New Order</LinkButton>
                <div className={styles.filterContainer}>
                    <div><FilterInput value={this.state.filterVal} label='Filter' placeholder='Filter' height='3em' width='10em' changed={(event) => this.onFilter(event)} /></div>
                    <div style={{paddingLeft: '1em'}}><FiltDropdown width='6em' height='3em' options={selectOptions} value={this.state.filterBy} changed={(val) => this.filterByHandler(val)} placeholder='Filter By' label="Filter By" /></div>
                </div>
                <div className={styles.GridContainer}>
                    <Griddle 
                        data={data}
                        styleConfig={styleConfig}
                        pageProperties={{
                            currentPage,
                            pageSize,
                            recordCount
                        }}
                        events={{
                        onNext: this._onNext,
                        onPrevious: this._onPrevious,
                        onGetPage: this._onGetPage
                        }}  
                        components={{
                            Layout: layout, 
                            Row: CustomRowComponent,
                            TableContainer: CustomTableComponent,
                            TableBody: CustomTableBody,
                            SettingsComponents: null
                        }}
                        >
                    </Griddle>
                 </div>
            </div>
        ) 
    };
}

const mapStateToProps = state => {
    return {
        userDetails: state.auth.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authCheck: () => dispatch(actions.authCheckState()),
        getOrder: (orderId, history) => dispatch(actions.getOrder(orderId, history))
    }
}

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(Dashboard));