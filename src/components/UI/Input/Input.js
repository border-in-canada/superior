import React from 'react';
import styles from './Input.module.css';
import TextInput from '../TextInput/TextInput';
import Dropdown from '../Dropdown/Dropdown';

const input = (props) => {
    let inputElement = null;
    const inputClasses = [styles.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(styles.Invalid);
    }
    
    if (props.elementType === 'text-area') {
        inputClasses.push(styles.TextArea);
    }
    
    if (props.elementType === 'select') {
        inputClasses.push(styles.Select);
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <TextInput 
            className={inputClasses.join(' ')}
            id={props.id}
            {...props.elementConfig} 
            value={props.value}
            changed={props.changed}
            />;
            break;
        case ('select'):
            inputElement = <Dropdown 
            className={inputClasses.join(' ')}
            id={props.id}
            {...props.elementConfig}
            value={props.value}
            changed={props.dropdownChanged} />
            break;
        case ('text-area'):
            inputElement = <textarea
            className={inputClasses.join(' ')}
            id={props.id}
            value={props.value}
            {...props.elementConfig} 
            onChange={props.changed}
            ></textarea>;
            break;
        default: 
            inputElement = <TextInput 
            className={inputClasses.join(' ')}
            id={props.id}
            {...props.elementConfig} 
            value={props.value}
            changed={props.changed}
            />;
    }

    return (
        <div>
            {inputElement}
        </div>
    
    );
};

export default input;

            