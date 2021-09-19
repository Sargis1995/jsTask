

module.exports = {
    "up": async( queryInterface, Sequelize ) => {
        return queryInterface.bulkInsert( "Students", [
            {
                "name": "Alice",
                "surname": "Costrel",
                "clazzId": 1
            },
            {
                "name": "Bob",
                "surname": "Uchida",
                "clazzId": 1
            },
            {
                "name": "Mark",
                "surname": "Sjoblad",
                "clazzId": 1
            },
            {
                "name": "Alice2",
                "surname": "Costrel2",
                "clazzId": 2
            },
            {
                "name": "Bob2",
                "surname": "Uchida2",
                "clazzId": 2
            },
            {
                "name": "Mark2",
                "surname": "Sjoblad2",
                "clazzId": 2
            }
        ] );
    },

    "down": async( queryInterface, Sequelize ) => {

        await queryInterface.bulkDelete( "Students", null, {} );
 
    }
};
