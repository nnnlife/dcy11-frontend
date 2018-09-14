import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Micom from '../micom';

export default class SetupPage extends React.Component {
    state = {
        setupData: [],
    };

    componentDidMount() {
        this.setState({setupData:Micom.instance.getAskRules()})
    }
    
    render() {
        const setupData = this.state.setupData;
        return (
            <Table>
            <TableHead>
                <TableRow>
                    <TableCell></TableCell>
                    <TableCell colSpan={2}>AP to VP</TableCell>
                    <TableCell colSpan={2}>VP to AP</TableCell>
                </TableRow>
                <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Command</TableCell>
                <TableCell>Payload</TableCell>
                <TableCell>Command</TableCell>
                <TableCell>Payload</TableCell>
                <TableCell>Action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {setupData.map((item, index) => {
                    return (
                    <TableRow key={index}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>0x{('0000' + Number(item.tx.command).toString(16)).slice(-4)}</TableCell>
                    <TableCell>{ (item.tx.payload.map(item => { return(('00' + Number(item).toString(16))).slice(-2) })).join(' ')}
                    </TableCell>
                    <TableCell>0x{('0000' + Number(item.rx.command).toString(16)).slice(-4)}</TableCell>
                    <TableCell>{ (item.rx.payload.map(item => { return(('00' + Number(item).toString(16))).slice(-2) })).join(' ')}</TableCell>
                    <TableCell></TableCell>
                    </TableRow>
                    );
                })}
            </TableBody>
        </Table>
        );
    }
}

