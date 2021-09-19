import _ from "lodash";
import model from "../models";
const Sequelize = require( "sequelize" ),
    { Grades, Students, Subjects, Clazzes, Teachers } = model;

class StudentsService {

    static async create( data ) {
        try {
            const student = await Students.create( data );
            
            if ( student ) {
                return { "payload": student, "error": null } ;
            }

            return { "payload": null, "error": { "code": 400, "message": "something Wrong3" } } ;

        } catch ( error ) {
            
            console.log( "erorr in grade creation -- ", error );
            return { "payload": null, "error": { "code": 400, "message": "something Wrong" } } ;

        }
    }

    static async edit( editData, id ) {
        try {
            const studentData = await Students.update( editData, {
                "where": { "id": id }
            } );

            if ( studentData && studentData[ 0 ] === 1 ) {
                return {
                    "payload": {
                        "message": "updated successfully"
                    },
                    "error": null
                };
            }
            return { "payload": null, "error": { "code": 400, "message": "Something went wrong" } } ;

        } catch ( error ) {
            console.log( " error ", error );
            return { "payload": null, "error": { "code": 400, "message": "Something went wrong" } } ;

        }
    }

    static async delete( id ) {
        try {
            await Students.destroy( { "where": { "id": id } } );

            return {
                "payload": {
                    "message": "deleted success"
                },
                "error": null
            };

        } catch ( error ) {
            console.log( "error ", error );
            return { "payload": null, "error": { "code": 400, "message": "something Wrong" } } ;
        }
    }

    static async getById( id ) {
        try {
            const student = await Students.findOne( {
                "where": { "id": id },
                "include": [
                    {
                        "model": Clazzes,
                        "as": "clazz",
                        "attributes": [ "name" ],
                        "include": [
                            {
                                "model": Teachers,
                                "as": "teachers",
                                "attributes": [ "name", "surname" ]
                            }
                        ]
                    },
                    {
                        "model": Grades,
                        "as": "grades",
                        "attributes": [ "grade" ],
                        "include": [
                            {
                                "model": Subjects,
                                "as": "subject",
                                "attributes": [ "name" ],
                                "required": true
                            }
                        ]
                    }
                ]
            } );

            if ( student ) {
                return {
                    "payload": student,
                    "error": null
                };
            }

            return { "payload": null, "error": { "code": 400, "message": "Something went wrong" } } ;
            
        } catch ( error ) {
            console.log( "error in student get by id service --  ", error );
            return { "payload": null, "error": { "code": 400, "message": "Something went wrong" } } ;

        }
    }

    static async getAll( query ) {
        try {
            let sort = [ "createdAt", query.sort ? query.sort.toLowerCase() : "desc" ],
                start = parseInt( query._start ),
                limitation = parseInt( query._end ) - parseInt( query._start );

            const studentsList = await Students.findAndCountAll( {
                "include": [
                    {
                        "model": Clazzes,
                        "as": "clazz",
                        "attributes": [ "name" ],
                        "include": [
                            {
                                "model": Teachers,
                                "as": "teachers",
                                "attributes": [ "name", "surname" ]
                            }
                        ]
                    },
                    {
                        "model": Grades,
                        "as": "grades",
                        "attributes": [ "grade" ],
                        "include": [
                            {
                                "model": Subjects,
                                "as": "subject",
                                "attributes": [ "name" ],
                                "required": true
                            }
                        ]
                    }
                ],
                "distinct": true,
                "offset": start,
                "limit": limitation,
                "order": [ sort ]
            } );

            return {
                "payload": studentsList,
                "error": null
            };
        } catch ( error ) {
            console.log( "error in list get service --  ", error );
            return { "payload": null, "error": { "code": 400, "message": "Something went wrong" } } ;

        }
    }

}
export default StudentsService;
