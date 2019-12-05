import React from 'react';
import styles from './Toolbar.module.css';

const toolbar = (props) => (
    <nav className={styles.Toolbar}>
        <h3 style={{paddingLeft: "1em"}} >Call or Email for pricing!</h3>
        <p>mike@superiorrecoveryllc.com  |  503-253-0571</p>
        <div className={styles.NavItems}>
            <ul>
                <li><button href="">Login</button></li>
            </ul>
        </div>
    </nav>
);


export default toolbar;