

module.exports = {
    "up": async( queryInterface, Sequelize ) => {
        return queryInterface.bulkInsert( "Subjects", [
            {
                "name": "Math",
                "teacherId": 1
            },
            {
                "name": "Physics",
                "teacherId": 1
            },
            {
                "name": "History",
                "teacherId": 2
            }
        ] );
    },

    "down": async( queryInterface, Sequelize ) => {

        await queryInterface.bulkDelete( "Subjects", null, {} );

    }
};
