export const StatusContact = Object.freeze({
    PENDING: 'Chưa giải quyết',
    APPROVED: 'Đã giải quyết',
    REJECTED:'Không giải quyết',
})

export const getStatusContactStyle = (status) => {
    switch (status) {
        case StatusContact.APPROVED:
            return { backgroundColor: '#28a745', borderColor: '#28a745', color: "black" }; // Xanh lá cây
        case StatusContact.PENDING:
            return { backgroundColor: 'pink', borderColor: 'pink', color: "black" }; // Vàng
        case StatusContact.REJECTED:
            return { backgroundColor: '#dc3545', borderColor: '#dc3545', color: "black" }; // Đỏ
        default:
            return { backgroundColor: '#6c757d', borderColor: '#6c757d', color: "black" }; // Xám
    }
};