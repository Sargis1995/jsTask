

module.exports = {
    "up": async( queryInterface, Sequelize ) => {
        return queryInterface.bulkInsert( "Teachers", [
            {
                "name": "Justin",
                "surname": "Anderson",
                "role": "primary",
                "clazzId": 1
            },
            {
                "name": "Ed",
                "surname": "Charles",
                "role": "primary",
                "clazzId": 2
            },
            {
                "name": "Fredi",
                "surname": "Devas",
                "role": "subject",
                "clazzId": 1
            }
        ] );
    },

    "down": async( queryInterface, Sequelize ) => {
    
        await queryInterface.bulkDelete( "Teachers", null, {} );
     
    }
};
