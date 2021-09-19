
const {
    Model
} = require( "sequelize" );

module.exports = ( sequelize, DataTypes ) => {
    class Clazzes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate( models ) {
            // define association here
        }
    }
    Clazzes.init( {
        "name": {
            "type": DataTypes.STRING,
            "allowNull": false,
            "unique": true
        }
    }, {
        sequelize,
        "modelName": "Clazzes",
        "TableName": "Clazzes",
        "indexes": [
            {
                "unique": true,
                "fields": [ "name" ]
            }
        ]
    } );
    Clazzes.associate = function( models ) {
        // associations can be defined here

        Clazzes.hasMany( models.Teachers, {
            "as": "teachers",
            "foreignKey": "clazzId",
            "onDelete": "cascade",
            "onUpdate": "cascade"
        } );
        Clazzes.hasMany( models.Students, {
            "as": "students",
            "foreignKey": "clazzId",
            "onDelete": "cascade",
            "onUpdate": "cascade"
        } );
    };
    return Clazzes;
};
