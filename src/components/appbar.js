import React from 'react';
import RAppBar from '@material-ui/core/AppBar';
import RToolbar from '@material-ui/core/Toolbar';
import RIconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {withStyles} from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {socket} from './socket';

const styles = {
    debugWindow: {
        marginLeft: 'auto',
    },
    connectButton: {
        marginLeft: '100px',
    },
    connectLabel: {
        color: 'white',
    },
}

class AppBar extends React.Component {
    state = {
        connected: false,
    };

    componentDidMount() {
        socket.on('micom-connect', data => {
            this.setState({connected: data});
        });
        this.checkConnectionStatus();
    }

    checkConnectionStatus = () => {
        console.log('send micom-connect message');
        socket.emit('micom-status', true);
    }

    handleConnection = event => {
        this.setState({connected: event.target.checked});
    }

    render() {
        const {classes} = this.props;
        return (
            <RAppBar className={this.props.appBarStyle}>
                <RToolbar>
                    <RIconButton onClick={this.props.menuClick}>
                        <MenuIcon/>
                    </RIconButton>
                    <FormControlLabel className={classes.connectButton} 
                        classes={{
                            label: classes.connectLabel,
                        }} 
                        control={
                        <Switch checked={this.state.connected}
                                onChange={this.handleConnection}
                                value='connect'
                                color='secondary'/>
                        }
                        label={this.state.connected?'Connected':'Not Connected'}
                    />
                    <RIconButton onClick={this.props.debugClick} className={classes.debugWindow}>
                        <MenuIcon/>
                    </RIconButton>
                </RToolbar>
            </RAppBar>
        );
    }
}

export default withStyles(styles)(AppBar);