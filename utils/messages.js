const moment = require('moment');

// This is a helper function to format messages in chat.js
function formatMessage (username, text) {
    return {
        username,
        text,
        time: moment().format('h:mm a')
    }
};

module.exports = formatMessage;