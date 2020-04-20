module.exports = () => {
    var reg = {},
        items = {};

    reg.get = (key) => {
        if (!items[key]) {
            throw new Error(`cannot find "${key}"`);
        }
        return items[key];
    }

    reg.set = (key, value) => {
        if (items[key]) {
            throw new Error(`key "${key}" is already set`);
        }
        items[key] = value;
    }

    return reg;
}
