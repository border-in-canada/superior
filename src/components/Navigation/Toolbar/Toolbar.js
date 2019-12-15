import React from 'react';
import styles from './Toolbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import logo from '../../../assets/Superior-Grey-Cropped.png';

const toolbar = (props) => {
    
    return(
    <nav className={styles.Toolbar}>
        {window.screen.width >= 768 ?
        <div className={styles.Logo}><img src={logo}/></div> :
        null}
        <div className={styles.NavItems}>
            <ul>
                <li><a href="mailto:mike@superiorrecoveryllc.com"><FontAwesomeIcon icon={faEnvelope} size='lg'/></a></li>
                <li><a href="tel:503-253-0571"><FontAwesomeIcon icon={faPhone} size="lg"/></a></li>
                <li><a href=""><FontAwesomeIcon icon={faSignInAlt} size="lg" /></a></li>
            </ul>
        </div>
    </nav>
    );
};


export default toolbar;