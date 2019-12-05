import React from 'react';
import styles from './Home.module.css';
import image from '../../assets/tow.jpeg';
import logo from '../../assets/Superior-Grey-Cropped.png';


const home = (props) => {
    return (
        <div>
            <div className={styles.Banner}>
                <img src={image}/>
            </div>
            <div className={styles.Heading}>
                <h2>Superior Service</h2>
                <h1>Superior Recovery</h1>
                <h3>503-253-0571</h3>
            </div>
            <div className={styles.Content}>
                <div className={styles.Creds}>
                    <h4>CARS Certified</h4>
                    <h4>Licensed</h4>
                    <h4>Bonded & Insured</h4>
                </div>
                <div className={styles.Logo}>
                    <img src={logo}/>  
                </div> 
                <div className={styles.Footer}>
                    <h4>Servicing the Portland and surrounding area since 1999.</h4><br />
                    <p><a href="">Sign in</a> to dispatch an order, view status updates, or view past orders.</p><br />
                    <a href="">Click here to sign up!</a>
                </div>
            </div>
        </div>
        
        
    );
}

export default home;