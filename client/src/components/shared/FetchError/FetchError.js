import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import {Typography} from '@material-ui/core';

const styles =theme=>({
    errorWrapper:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        border:`1px solid ${red[700]}`,
        backgroundColor:theme.palette.common.white,
        color:red[700],
        padding:theme.spacing.unit*2,
        borderRadius:'4px',
        width:'max-content',
        position:'relative',
        top:'50%',
        left:'50%',
        transform: 'translate(-50%,50%)',
    }
})

function FetchError({classes}){
    return (
        <div className={classes.errorWrapper}>
            <Typography component='h1' variant='h1'>ERROR</Typography>
            <Typography variant='h5'>Something went wrong ...</Typography>
        </div>
    )
}
export default withStyles(styles)(FetchError);