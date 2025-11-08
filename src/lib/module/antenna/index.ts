import type IAntenna from './antenna.types.js';
import type { INewAntenna, IAntennaLink, INewAntennaLink } from './antenna.types.js';
import * as antennaActions from './actions.js';
import Antenna, { AntennaLink } from './model.js';

export default Antenna;
export {
    AntennaLink,
    antennaActions,
    IAntenna,
    IAntennaLink,
    INewAntenna,
    INewAntennaLink,
}
