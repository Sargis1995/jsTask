/* eslint-disable new-cap */

module.exports = {
    "up": async( queryInterface, Sequelize ) => {
        await queryInterface.createTable( "Grades", {
            "id": {
                "allowNull": false,
                "autoIncrement": true,
                "primaryKey": true,
                "type": Sequelize.INTEGER
            },
            "clazzId": {
                "type": Sequelize.INTEGER,
                "allowNull": false,
                "references": {
                    "model": "Clazzes",
                    "key": "id"
                },
                "onDelete": "CASCADE",
                "onUpdate": "CASCADE"
            },
            "subjectId": {
                "type": Sequelize.INTEGER,
                "allowNull": false,
                "references": {
                    "model": "Subjects",
                    "key": "id"
                },
                "onDelete": "CASCADE",
                "onUpdate": "CASCADE"
            },
            "teacherId": {
                "type": Sequelize.INTEGER,
                "allowNull": false,
                "references": {
                    "model": "Teachers",
                    "key": "id"
                },
                "onDelete": "CASCADE",
                "onUpdate": "CASCADE"
            },
            "studentId": {
                "type": Sequelize.INTEGER,
                "allowNull": false,
                "references": {
                    "model": "Students",
                    "key": "id"
                },
                "onDelete": "CASCADE",
                "onUpdate": "CASCADE"
            },
            "grade": {
                "type": Sequelize.INTEGER,
                "allowNull": false,
                "validate": {
                    "min": 1,
                    "max": 5
                }
            },
            "createdAt": {
                "allowNull": false,
                "type": Sequelize.DATE,
                "defaultValue": Sequelize.fn( "now" )
            },
            "updatedAt": {
                "allowNull": false,
                "type": Sequelize.DATE,
                "defaultValue": Sequelize.fn( "now" )
            }
        } );
    },
    "down": async( queryInterface, Sequelize ) => {
        await queryInterface.dropTable( "Grades" );
    }
};
