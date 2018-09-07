import React from 'react';

import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import SwipeableViews from 'react-swipeable-views';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import SendIcon from '@material-ui/icons/Send';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';



const styles = {

};

function TabContainer({ children, dir }) {
    return (
      <Paper>
          <Table>
              <TableHead>
                  <TableRow>
                  <TableCell>Dir</TableCell>
                  <TableCell>Command</TableCell>
                  <TableCell>Payload</TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                  {children}
              </TableBody>
          </Table>
      </Paper>
    );
  }
  

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
        function buf2hex(buffer) { // buffer is an ArrayBuffer
            return Array.prototype.map.call(new Uint8Array(buffer), x => ('0' + x.toString(16)).slice(-2)).join(' ');
          }
        let command = data.command.toString(16);
        let payload = buf2hex(data.payload);
        return [command,payload];
    }

    render() {
        const {classes, theme} = this.props;
        const micomMessages = this.props.micomMessage.map(data => 
                <TableRow key={data.id}>
                <TableCell><SendIcon/></TableCell>
                <TableCell>{'0x' + this.convertMicomMessageToString(data)[0]}</TableCell>
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
                <div className={this.props.width}>
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        fullWidth
                    >
                        <Tab label="DEBUG" />
                        <Tab label="Android Logs" />
                    </Tabs>
                    <SwipeableViews position='absolute'
                        index={this.state.value}
                        onChangeIndex={this.handleChangeIndex}
                    >
                        <TabContainer dir={theme.direction}>
                            {micomMessages}
                        </TabContainer>
                        <TabContainer dir={theme.direction}>Item Two</TabContainer>
                    </SwipeableViews>
                </div>
            </Drawer>
        );
    }
}


export default withStyles(styles, { withTheme: true })(DebugWindow);