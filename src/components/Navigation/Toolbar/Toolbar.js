import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import styles from './Toolbar.module.css';
import { withCookies } from 'react-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import logo from '../../../assets/Superior-Grey-Cropped.png';
import appConfig from '../../../config/appConfig.json';

class Toolbar extends Component {

    logoutHandler = () => {
        const { cookies } = this.props;
        cookies.remove('session', { path: '/' });
        this.props.logout(this.props.history);
    }

    render() {
    
        return(
        <nav className={styles.Toolbar}>
            {window.screen.width >= 768 ?
            <div className={styles.Logo}><img src={logo} alt='company logo'/></div> :
            null}
            <div className={styles.NavItems}>
                <ul>
                    <li><a href="mailto:billing@superiorrecoveryllc.com"><FontAwesomeIcon icon={faEnvelope} size='lg'/></a></li>
                    <li><a href="tel:503-253-0571"><FontAwesomeIcon icon={faPhone} size="lg"/></a></li>
                    {this.props.isAuthenticated ? <li><a href="/"><span onClick={this.logoutHandler}><FontAwesomeIcon icon={faSignOutAlt} size="lg" /></span></a></li> : <li><a href={appConfig.loginUri}><FontAwesomeIcon icon={faSignInAlt} size="lg" /></a></li>}
                    
                </ul>
            </div>
        </nav>
        );
    }
};

const mapStateToProps = state => {
    return {
      isAuthenticated: state.auth.isAuthenticated !== false
    };
};
  
const mapDispatchToProps = dispatch => {
    return {
        authCheck: () => dispatch(actions.authCheckState()),
        logout: (history) => dispatch(actions.clearCookie(history))
    }
}

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(Toolbar));