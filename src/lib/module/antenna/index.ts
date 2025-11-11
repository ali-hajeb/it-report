import type IAntenna from './antenna.types';
import type { INewAntenna, IAntennaLink, INewAntennaLink } from './antenna.types';
import * as antennaActions from './actions';
import Antenna, { AntennaLink } from './model';

export default Antenna;
export {
    AntennaLink,
    antennaActions,
    IAntenna,
    IAntennaLink,
    INewAntenna,
    INewAntennaLink,
}
