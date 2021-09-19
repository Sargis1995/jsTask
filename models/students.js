
const {
    Model
} = require( "sequelize" );

module.exports = ( sequelize, DataTypes ) => {
    class Students extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate( models ) {
            // define association here
        }
    }
    Students.init( {
        "name": {
            "type": DataTypes.STRING,
            "allowNull": false
        },
        "surname": {
            "type": DataTypes.STRING,
            "allowNull": false
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
        "modelName": "Students",
        "tableName": "Students"
    } );
    Students.associate = function( models ) {
        // associations can be defined here

        Students.belongsTo( models.Clazzes, {
            "as": "clazz",
            "foreignKey": "clazzId",
            "onDelete": "cascade",
            "onUpdate": "cascade"
        } );
        Students.hasMany( models.Grades, {
            "as": "grades",
            "foreignKey": "studentId",
            "onDelete": "cascade",
            "onUpdate": "cascade"
        } );
    };
    return Students;
};
