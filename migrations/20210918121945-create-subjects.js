
module.exports = {
    "up": async( queryInterface, Sequelize ) => {
        await queryInterface.createTable( "Subjects", {
            "id": {
                "allowNull": false,
                "autoIncrement": true,
                "primaryKey": true,
                "type": Sequelize.INTEGER
            },
            "name": {
                "type": Sequelize.STRING,
                "allowNull": false,
                "unique": true
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
        await queryInterface.dropTable( "Subjects" );
    }
};
