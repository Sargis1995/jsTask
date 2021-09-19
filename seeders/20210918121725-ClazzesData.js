

module.exports = {
    "up": async( queryInterface, Sequelize ) => {
        return queryInterface.bulkInsert( "Clazzes", [
            {
                "name": "A"
            },
            {
                "name": "B"
            }
        ] );
    },

    "down": async( queryInterface, Sequelize ) => {
    
        await queryInterface.bulkDelete( "Clazzes", null, {} );
     
    }
};
