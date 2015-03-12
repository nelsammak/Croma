module.exports.default = {
    sqlite : function(api) {
        return {
            storage: __dirname + '/../store/app.sqlite',
            dialect: 'sqlite'  
        };
    }
};