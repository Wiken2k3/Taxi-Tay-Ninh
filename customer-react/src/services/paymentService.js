import instance from "../api/api";
const createUrlPayment = async (paymentData) => {
    return await instance.post('/api/payment', paymentData);

}

const returnPayment = async ({
    vnp_Amount,
    vnp_BankCode,
    vnp_BankTranNo,
    vnp_CardType,
    vnp_OrderInfo,
    vnp_PayDate,
    vnp_ResponseCode,
    vnp_TmnCode,
    vnp_TransactionNo,
    vnp_TransactionStatus,
    vnp_TxnRef,
    vnp_SecureHash
}) => {
    const paymentData = {
        vnp_Amount,
        vnp_BankCode,
        vnp_CardType,
        vnp_OrderInfo,
        vnp_PayDate,
        vnp_ResponseCode,
        vnp_TmnCode,
        vnp_TransactionNo,
        vnp_TransactionStatus,
        vnp_TxnRef,
        vnp_SecureHash
    };

    // Kiểm tra và thêm vnp_BankTranNo nếu có giá trị
    if (vnp_BankTranNo) {
        paymentData.vnp_BankTranNo = vnp_BankTranNo;
    }

    return await instance.post('/api/payment/vnpay_return', paymentData);
};

export default {
    createUrlPayment,
    returnPayment
};