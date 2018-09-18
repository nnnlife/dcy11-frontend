import React from 'react';

import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import SendIcon from '@material-ui/icons/Send';
import ReplyIcon from '@material-ui/icons/Reply';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';



const styles = {

};

  

class DebugWindow extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({value});
    }

    handleChangeIndex = index => {
        this.setState({value: index});
    }

    convertMicomMessageToString = data => {
        function buf2hexForPayload(buffer) { // buffer is an ArrayBuffer
            return Array.prototype.map.call(new Uint8Array(buffer), x => ('0' + x.toString(16)).slice(-2)).join(' ');
        }

        let command = '0x' + ('0000' + data.command.toString(16)).slice(-4);
        let payload = buf2hexForPayload(data.payload);
        return [command,payload];
    }

    componentDidMount() {
        console.log('component did mount');
        this.scrollToBottom();
    }

    scrollToBottom = () => {
        if (this.table) {
            let rows = this.table.getElementsByTagName('tr');
            let lastTr = rows.item(rows.length - 1).scrollIntoView();
        }
    }

    componentDidUpdate() {
        console.log('component did update');
        this.scrollToBottom();
    }

    render() {
        const {classes, theme} = this.props;
        const micomMessages = this.props.micomMessage.map((data, index) => 
                <TableRow key={index}>
                <TableCell>{data.direction === 1?<SendIcon/>:<ReplyIcon/>}</TableCell>
                <TableCell>{this.convertMicomMessageToString(data)[0]}</TableCell>
                <TableCell>{this.convertMicomMessageToString(data)[1]}</TableCell>
            </TableRow>
        );
        return (
            <Drawer
                variant="permanent"
                position="fixed"
                anchor={'right'}
                open={true}
            >
                <div className={this.props.width} ref={el => this.table = el}>
          <Table>
              <TableHead>
                  <TableRow>
                  <TableCell>Dir</TableCell>
                  <TableCell>Command</TableCell>
                  <TableCell>Payload</TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                  {micomMessages}
              </TableBody>
          </Table>
                </div>
            </Drawer>
        );
    }
}


export default withStyles(styles, { withTheme: true })(DebugWindow);