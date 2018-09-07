import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';
import LaptopIcon from '@material-ui/icons/Laptop';
import FormatListIcon from '@material-ui/icons/FormatListBulleted';
import PollIcon from '@material-ui/icons/Poll';
import ControlIcon from '@material-ui/icons/ControlPoint';



import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

export function menuItem(handler) {
    return (
        <div>
        <List>
            <ListItem button onClick={() => handler(1)}>
                <ListItemIcon>
                    <LaptopIcon/>
                </ListItemIcon>
                <ListItemText primary='Control'/>
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <ControlIcon/>
                </ListItemIcon>
                <ListItemText primary='Setup'/>
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <FormatListIcon />
                </ListItemIcon>
                <ListItemText primary='Test Cases'/>
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <PollIcon />
                </ListItemIcon>
                <ListItemText primary='Performance'/>
            </ListItem>
        </List>
        </div>
    );
}

    