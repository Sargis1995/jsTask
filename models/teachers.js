/* eslint-disable new-cap */

const {
    Model
} = require( "sequelize" );

module.exports = ( sequelize, DataTypes ) => {
    class Teachers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate( models ) {
            // define association here
        }
    }
    Teachers.init( {
        "name": {
            "type": DataTypes.STRING,
            "allowNull": false
        },
        "surname": {
            "type": DataTypes.STRING,
            "allowNull": false
        },
        "role": {
            "type": DataTypes.ENUM( "primary", "subject" ),
            "allowNull": false,
            "defaultValue": "subject"
        },
        "clazzId": {
            "type": DataTypes.INTEGER,
            "allowNull": false,
            "references": {
                "model": "Clazzes",
                "key": "id"
            },
            "onDelete": "CASCADE",
            "onUpdate": "CASCADE"
        }
    }, {
        sequelize,
        "modelName": "Teachers",
        "tableName": "Teachers"
    } );
    Teachers.associate = function( models ) {
        // associations can be defined here

        Teachers.hasMany( models.Subjects, {
            "as": "subjects",
            "foreignKey": "teacherId",
            "onDelete": "cascade",
            "onUpdate": "cascade"
        } );
    };
    return Teachers;
};
