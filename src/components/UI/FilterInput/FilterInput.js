import React, { Component } from 'react';
import styles from './FilterInput.module.css';
import StatusText from '../StatusText/StatusText';

class FilterInput extends Component {

    state = {
        focused: false
    }

    focusHandler = () => {
        this.setState({focused: !this.state.focused});
    }

    render() {

        const {id, type, width, height, placeholder, label, disabled, value, msgValue, msgType, changed} = {...this.props};

        const ContainerClassName = [
            styles.Container, 
            `${(disabled ? this.state.focused : this.state.focused || value) && `${styles.Focus}`}`, 
            `${(msgType === 'Error' ? `${styles.Error}` : '')}`,
            `${(value && !this.state.focused  ? `${styles.Filled}` : '')}`,
            `${(disabled ? `${styles.Disabled}` : '')}`];

        return (
            <div style={{width: width, height: height}}>
                <div className={ContainerClassName.join(' ')}>
                    <input 
                        type={type}
                        id={id}
                        value={value}
                        placeholder={placeholder}
                        disabled={disabled}
                        onChange={changed}
                        onFocus={this.focusHandler}
                        onBlur={this.focusHandler}
                    />
                    <label htmlFor={id}>{label}</label>
                </div>
                <StatusText msgValue={msgValue} msgType={msgType} />
            </div>
        );
    }
}

export default FilterInput;