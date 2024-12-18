export const toVietnamCurrency = (amount) => {

    // Chuyển đổi amount thành số nếu nó là một chuỗi
    const numericAmount = Number(amount);

    // Định dạng số thành tiền tệ Việt Nam
    return numericAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};
