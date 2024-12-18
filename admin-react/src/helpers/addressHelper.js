export const extractAddress = (address1, address2) => {
    const separator =","
    return `${address1.split(separator)[0].trim()} -> ${address2.split(separator)[0].trim()}`
};
