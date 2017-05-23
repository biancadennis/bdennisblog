module.exports = function(sequelize, Sequelize) {
    return(sequelize.define('projects',{
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        imageFilename: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: '',
            validate: {
                notEmpty: {
                    msg: 'Image is required'
                }
            }
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
                    return(`/portfolio/${this.slug}`);
                },
            imageUrl: function() {
                return(`/images/portfolio-images/${this.imageFilename}`)
                },
            imageThumbnailUrl: function() {
                return(`${this.imageUrl}-thumbnail`);
                }
            }
    }));
};