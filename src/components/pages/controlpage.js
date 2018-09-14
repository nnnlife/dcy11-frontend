import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {withStyles} from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Paper from '@material-ui/core/Paper';
import Micom from '../micom';


const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
      },
});


class ControlPage extends React.Component {
    state = {
        value: 'abandon',
    }

    handleDriveChange = event => {
        this.setState({value: event.target.value});
        Micom.instance.changeDriveMode(event.target.value);
    }

    componentDidMount() {
        this.setState({value: Micom.instance.getDriveMode()});
    }

    render() {
        const {classes} = this.props;
        return (
            <Paper className={classes.root}>
            <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Drive Mode</FormLabel>
            <RadioGroup
              aria-label="Drive Mode"
              name="drivemode"
              className={classes.group}
              value={this.state.value}
              onChange={this.handleDriveChange}
            >
              <FormControlLabel value="abandon" control={<Radio />} label="Abandon" />
              <FormControlLabel value="inactive" control={<Radio />} label="Inactive" />
              <FormControlLabel value="convenience" control={<Radio />} label="Convenience" />
              <FormControlLabel value="active" control={<Radio />} label="Active" />
              <FormControlLabel value="drive" control={<Radio />} label="Drive" />
            </RadioGroup>
          </FormControl>
          </Paper>
        );
    }
}

export default withStyles(styles)(ControlPage);

