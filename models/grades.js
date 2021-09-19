/* eslint-disable new-cap */

const {
    Model
} = require( "sequelize" );

module.exports = ( sequelize, DataTypes ) => {
    class Grades extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate( models ) {
            // define association here
        }
    }
    Grades.init( {
        "clazzId": {
            "type": DataTypes.INTEGER,
            "allowNull": false,
            "references": {
                "model": "Clazzes",
                "key": "id"
            },
            "onDelete": "CASCADE",
            "onUpdate": "CASCADE"
        },
        "subjectId": {
            "type": DataTypes.INTEGER,
            "allowNull": false,
            "references": {
                "model": "Subjects",
                "key": "id"
            },
            "onDelete": "CASCADE",
            "onUpdate": "CASCADE"
        },
        "teacherId": {
            "type": DataTypes.INTEGER,
            "allowNull": false,
            "references": {
                "model": "Teachers",
                "key": "id"
            },
            "onDelete": "CASCADE",
            "onUpdate": "CASCADE"
        },
        "studentId": {
            "type": DataTypes.INTEGER,
            "allowNull": false,
            "references": {
                "model": "Students",
                "key": "id"
            },
            "onDelete": "CASCADE",
            "onUpdate": "CASCADE"
        },
        "grade": {
            "type": DataTypes.INTEGER,
            "allowNull": false,
            "validate": {
                "min": 1,
                "max": 5
            }
        }
    }, {
        sequelize,
        "modelName": "Grades",
        "tabelName": "Grades"
    } );
    Grades.associate = function( models ) {
        // associations can be defined here

        Grades.belongsTo( models.Clazzes, {
            "as": "clazz",
            "foreignKey": "clazzId",
            "onDelete": "cascade",
            "onUpdate": "cascade"
        } );
        Grades.belongsTo( models.Teachers, {
            "as": "teacher",
            "foreignKey": "teacherId",
            "onDelete": "cascade",
            "onUpdate": "cascade"
        } );
        Grades.belongsTo( models.Students, {
            "as": "student",
            "foreignKey": "studentId",
            "onDelete": "cascade",
            "onUpdate": "cascade"
        } );
        Grades.belongsTo( models.Subjects, {
            "as": "subject",
            "foreignKey": "subjectId",
            "onDelete": "cascade",
            "onUpdate": "cascade"
        } );
    };
    return Grades;
};
