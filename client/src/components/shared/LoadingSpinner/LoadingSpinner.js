import React from 'react';
import Spinner from 'react-spinkit';
import teal from '@material-ui/core/colors/teal';
import {Typography} from '@material-ui/core';

function LoadingSpinner() {
	return (
        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            <Typography component='h1' variant='h3'>Loading...</Typography>
            <Spinner name="pacman" color={teal[100]} />
        </div>
    );
}
export default LoadingSpinner;
