import React from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const layout = (props) => (
    <div>
        <Toolbar />
        <main>
            {props.children}
        </main>   
    </div>

);

export default layout;