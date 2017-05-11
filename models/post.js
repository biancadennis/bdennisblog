module.exports = function(sequelize, Sequelize) {
    return(sequelize.define('post', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: Sequelize.STRING,
        body: Sequelize.TEXT,
        slug: Sequelize.STRING
    }, {
         defaultScope: {
            order: [['createdAt', 'DESC']]
        }, 
            getterMethods: {
                url: function() {
                    return(`/blog/${this.slug}`);
                }
            }
    }));
};