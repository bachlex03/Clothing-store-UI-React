import * as request from '~/utils/request';

export const vnPayIpn = async (data) => {
    const result = await request.get(`vnpay/vnpay_ipn?${data}`);

    return result;
};
