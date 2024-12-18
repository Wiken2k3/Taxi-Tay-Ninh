export const Status = Object.freeze({
    PENDING: 'Chờ Duyệt',
    APPROVED: 'Đã Duyệt',
    REJECTED: 'Đã Huỷ',
})

export const getStatusStyle = (status) => {
    switch (status) {
        case Status.APPROVED:
            return { backgroundColor: '#28a745', borderColor: '#28a745',color: "black" }; // Xanh lá cây
        case Status.PENDING:
            return { backgroundColor: 'pink', borderColor: 'pink', color: "black" }; // Vàng
        case Status.REJECTED:
            return { backgroundColor: '#dc3545', borderColor: '#dc3545', color: "black" }; // Đỏ
        default:
            return { backgroundColor: '#6c757d', borderColor: '#6c757d', color: "black" }; // Xám
    }
};