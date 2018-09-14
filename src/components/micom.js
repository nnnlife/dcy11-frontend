import axios from 'axios';
import EventEmitter from 'eventemitter3';

class Micom {
    driveMode = {
        abandon: 0x00,
        inactive: 0x01,
        convenience: 0x02,
        active: 0x0b,
        drive: 0x0d,
    };

    constructor() {
        this.eventEmitter = new EventEmitter();
        this.ask_rules = [];
        this.currentDriveMode = 'abandon';
        this.fetchAskRules();
    }

    fetchAskRules() {
        axios.get('http://localhost:1337/api/setup').then(res => {
            this.ask_rules = res.data.ask_rules;
        });
    }

    changeDriveMode(value) {
        console.log('changeDriveMode: ', value);
        axios.get('http://localhost:1337/api/drivemode', {params: {mode: this.driveMode[value]}});
    }

    getAskRules = () => this.ask_rules;
    getDriveMode = () => this.currentDriveMode;
}

var instance = new Micom();

export default {instance};