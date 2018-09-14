import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import AppBar from './components/appbar';
import MenuBar from './components/menubar';
import DebugWindow from './components/debugwindow';

import ControlPage from './components/pages/controlpage';
import SetupPage from './components/pages/setuppage';
import {socket} from './components/socket';

const debugWidth = 500;

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        width: `calc(100% - ${debugWidth}px)`,
        marginRight: `${debugWidth}px`,
    },
    debug: {
        width: `${debugWidth}px`
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
    },
    contentWithDebug: {
        flexGrow: 1,
        width: `calc(100% - ${debugWidth}px)`,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
    },
    toolbar: theme.mixins.toolbar,
});

class App extends React.Component {

    state = {
        drawerOpened: false,
        debugOpened: false,
        messages: [],
        currentPage: 1,
    }

    handleDrawer = (isOpen) => {
        this.setState({drawerOpened: isOpen});
    }

    handleDebug = () => {
        this.setState({debugOpened: !this.state.debugOpened});
    }

    handleMenu = (index) => {
        this.setState({currentPage: index});
    }

    getCurrentPage = (index) => {
        switch(this.state.currentPage) {
        case 1:
            return (<ControlPage/>);
        case 2:
            return (<SetupPage/>);
        }
    }

    componentDidMount() {
        socket.on('micom-message', data => {
            let messages = this.state.messages;
            messages.push(data);
            this.setState({messages: messages});
        });
    }

    render() {
        const { classes } = this.props;
        let contentStyles = null;
        let appBarStyles = null;
        let content = this.getCurrentPage(this.state.currentPage);

        if (this.state.debugOpened) {
            contentStyles = classes.contentWithDebug;
            appBarStyles = classes.appBar;
        }
        else
            contentStyles = classes.content;

        

        return (
            <div className={classes.root}>
                <AppBar menuClick={() => this.handleDrawer(true)} debugClick={this.handleDebug} appBarStyle={appBarStyles}/>
                <MenuBar drawerState={this.state.drawerOpened} 
                         closeDrawer={() => this.handleDrawer(false)}
                         openDrawer={() => this.handleDrawer(true)} menuClicked={this.handleMenu}/>
                {this.state.debugOpened && <DebugWindow micomMessage={this.state.messages} width={classes.debug}/>}
                <main className={contentStyles}>
                    <div className={classes.toolbar} />
                    {content}
                </main>
            </div>
        );
    }
}

export default withStyles(styles)(App);