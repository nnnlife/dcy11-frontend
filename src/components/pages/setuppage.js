import React from 'react';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export default class SetupPage extends React.Component {
    render() {
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

            </TableBody>
        </Table>
        );
    }
}

