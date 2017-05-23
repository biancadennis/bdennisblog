module.exports = function(sequelize, DataTypes) {
    return(sequelize.define('post', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        imageFilename: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
            validate: {
                notEmpty: {
                    msg: 'image is required'
                }
            }
        },
        title: DataTypes.STRING,
        body: DataTypes.TEXT,
        slug: DataTypes.STRING
    }, {
         defaultScope: {
            order: [['createdAt', 'DESC']]
        }, 
            getterMethods: {
                url: function() {
                    return(`/blog/${this.slug}`);
                },
                imageUrl: function(){
                    return(`/images/blog-images/${this.imageFilename}`);
                },
                imageThumbnailUrl: function() {
                    return(`${this.imageUrl}-thumbnail`);
                }
            }
    }));
};