import moment from 'moment-timezone';

export const toVietnamTime = (isoDateString, format = 'DD-MM-YYYY HH:mm:ss') => {
    if (!isoDateString) return
    return moment(isoDateString).tz('Asia/Ho_Chi_Minh').format(format);
};
