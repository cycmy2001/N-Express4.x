var pub_tokens = {};
// Public
module.exports = {
    tokens:{},
    consume: function(token,callback) {
        var user = tokens[token];
        // invalidate the single-use token
        delete tokens[token];
        return callback(null, user);
    },
    save: function(token,user,callback) {
        tokens[token] = user;
        return callback();
    },
    getTokens: function() {
        return this.tokens;
    }
};