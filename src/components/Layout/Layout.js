import React from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Separator from '../Separator/Separator';

const layout = (props) => (
    <div>
        <Toolbar />
        <Separator />
        <main>
            {props.children}
        </main>   
    </div>

);

export default layout;