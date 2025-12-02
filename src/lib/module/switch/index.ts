import Switch, { SwitchBackup, SwitchPort } from "./model";
import * as switchActions from './actions';
import type ISwitch from "./switch.types";
import type { INewSwitch, INewSwitchBackup, INewSwitchPort, ISwitchBackup, ISwitchPort } from './switch.types';

export default Switch;

export {
    SwitchPort,
    SwitchBackup,
    switchActions,
    ISwitch,
    INewSwitch,
    INewSwitchBackup, 
    INewSwitchPort, 
    ISwitchBackup, 
    ISwitchPort 
};
