const getDateString = (date) => {
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    return new Date(date).toLocaleString('en-US', options);
};
exports.getDateString = getDateString;