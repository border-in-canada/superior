import React, { Component } from 'react';
import styles from './AuthLoader.module.css';
import axios from 'axios';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';
import { Redirect, withRouter } from 'react-router-dom';
import { initSessionFromCallbackURI } from '../../store/actions/auth';
import appConfig from '../../config/appConfig.json';

class AuthLoader extends Component {

    componentDidMount() {
        console.log('auth loader');
        if (this.props.location.hash || this.props.location.search) {
            this.props.initSessionFromCallbackURI(window.location.href)
                .then(session => {
                    const URI = appConfig.apiUri + 'me';
                    axios.post(URI, session, { withCredentials: true })
                        .then(res => {
                            const { cookies } = this.props;
                            cookies.set('session', {id: res.data.userId, email: res.data.userEmail}, { path: '/', maxAge: '3500'});
                            this.props.authSucceed();
                        })
                        .catch(err => {
                            console.log(err);
                        })
                })
                .catch(err => {
                    console.log(err);
                })

        }
    }

    render() {

        // if ((!this.props.location.hash && !this.props.location.search)) {
        //     return <Redirect to="/" />
        // }

        return (
            <div className={styles.Container}>
                <div className={styles.Ring}><div></div><div></div><div></div><div></div></div>
            </div>
        );
        
    }
}


function mapDispatchToProps (dispatch) {
return {
    initSessionFromCallbackURI: (href, history) => dispatch(initSessionFromCallbackURI(href, history)),
    authSucceed: () => dispatch(actions.authSuccess()),
    }
}

export default withRouter(withCookies(connect(null, mapDispatchToProps)(AuthLoader)));