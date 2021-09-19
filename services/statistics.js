import _ from "lodash";
import model from "../models";
const Sequelize = require( "sequelize" ),
    { Grades, Students, Subjects, Clazzes } = model;

class StatisticsService {

    static async sortByAvg( sort ) {
        try {
            const studentsList = await Students.findAll( {
                "attributes": [ "id", "name", "surname",
                    [ Sequelize.fn( "AVG", Sequelize.col( "grades.grade" ) ), "averageGrade" ] ],
                "include": [
                    {
                        "model": Grades,
                        "as": "grades",
                        "attributes": [],
                        "required": true
                    }
                ],
                "group": [ "grades.studentId" ],
                "order": [ [ Sequelize.literal( "averageGrade" ), sort ? sort.toLowerCase() : "desc" ] ]
            } );

            return {
                "payload": studentsList,
                "error": null
            };
        } catch ( error ) {
            console.log( "error in avg get service --  ", error );
            return { "payload": null, "error": { "code": 400, "message": "Something went wrong" } } ;
        }
    }

    static async sortBySubjectAvg( sort ) {
        try {
            const subjectsList = await Subjects.findAll( {
                "attributes": [ "id", "name",
                    [ Sequelize.fn( "AVG", Sequelize.col( "grades.grade" ) ), "subjectAverageGrade" ] ],
                "include": [
                    {
                        "model": Grades,
                        "as": "grades",
                        "attributes": [],
                        "required": true
                    }
                ],
                "group": [ "grades.subjectId" ],
                "order": [ [ Sequelize.literal( "subjectAverageGrade" ), sort ? sort.toLowerCase() : "desc" ] ]
            } );

            return {
                "payload": subjectsList,
                "error": null
            };
        } catch ( error ) {
            console.log( "error in subject avg get service --  ", error );
            return { "payload": null, "error": { "code": 400, "message": "Something went wrong" } } ;
        }
    }

    static async clazzSort( sort ) {
        try {
            const clazzList = await Clazzes.findAll( {
                "attributes": [ "id", "name"
                ],
                "include": [
                    {
                        "model": Students,
                        "as": "students",
                        "attributes": [
                            "id",
                            [ Sequelize.fn( "AVG", Sequelize.col( "students.grades.grade" ) ), "studentAvg" ]
                        ],
                        "include": [
                            {
                                "model": Grades,
                                "as": "grades",
                                "attributes": []
                            }
                        ]
                    }
                ],
                "group": [ "students.grades.studentId" ]
            } );

            let resultingData = [];

            for ( let [ iterator, clazz ] of Object.entries( clazzList ) ) {
                let averageFromAverages = [];

                resultingData[ iterator ] = { "id": clazz.id, "name": clazz.name };
                for ( let [ innerIterator, student ] of Object.entries( clazz.students ) ) {
                    innerIterator = parseInt( innerIterator );
                    averageFromAverages.push( parseFloat( student.dataValues.studentAvg ) );
                }
                resultingData[ iterator ].clazzAvg = _.mean( averageFromAverages ).toFixed( 2 );
            }

            resultingData = _.orderBy( resultingData, [ "clazzAvg" ], [ sort ? sort.toLowerCase() : "desc" ] );

            return {
                "payload": resultingData,
                "error": null
            };
        } catch ( error ) {
            console.log( "error in clazz avg get service --  ", error );
            return { "payload": null, "error": { "code": 400, "message": "Something went wrong" } } ;
        }
    }

}
export default StatisticsService;
