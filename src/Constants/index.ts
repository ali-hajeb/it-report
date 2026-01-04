export const MAX_ROWS = 25;
export const COORDINATE_REGEX = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;
export const BASE_PATH = process.env.NODE_ENV === 'production' ? `/${process.env.NEXT_PUBLIC_PATH}` : '';
