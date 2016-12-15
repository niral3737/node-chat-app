/**
 * Created by niral on 15/12/16.
 */

var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt : new Date().getTime()
    };
};

module.exports = {generateMessage};