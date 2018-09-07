import React from 'react';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'; 
import {withStyles} from '@material-ui/core/styles';
import {menuItem} from './menuitem';


const styles = {
    list: {
        width: 250,
    },
};

class MenuBar extends React.Component {

    render() {
        const {classes} = this.props;
        return (
            <SwipeableDrawer open={this.props.drawerState} onOpen={this.props.openDrawer} onClose={this.props.closeDrawer}>
                <div className={classes.list}>
                <div
            tabIndex={0}
            role="button"
            onClick={this.props.closeDrawer}
            onKeyDown={this.props.closeDrawer}
          >
                {menuItem(this.props.menuClicked)}
                </div>
                </div>

            </SwipeableDrawer>
        );
    }
}

export default withStyles(styles)(MenuBar);