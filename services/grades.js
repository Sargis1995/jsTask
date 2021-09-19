import model from "../models";
const Sequelize = require( "sequelize" ),
    // Op = Sequelize.Op,
    { Grades, Students, Subjects, Clazzes, Teachers } = model;

class GradesService {

    static async create( data ) {
        try {
            const grade = await Grades.create( {
                "clazzId": data.clazzId,
                "subjectId": data.subjectId,
                "teacherId": data.teacherId,
                "studentId": data.studentId,
                "grade": data.grade
            } );
            
            if ( grade ) {
                return { "payload": grade, "error": null } ;
            }

            return { "payload": null, "error": { "code": 400, "message": "something Wrong3" } } ;

        } catch ( error ) {
            
            console.log( "erorr in grade creation -- ", error );
            return { "payload": null, "error": { "code": 400, "message": "something Wrong" } } ;

        }
    }

    static async edit( editData, id ) {
        try {
            
            const gradeData = await Grades.update( editData, {
                "where": { "id": id }
            } );

            if ( gradeData && gradeData[ 0 ] === 1 ) {
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
            await Grades.destroy( { "where": { "id": id } } );

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
            const grade = await Grades.findOne( {
                "attributes": [
                    "id",
                    "grade",
                    [
                        Sequelize.col( "clazz.name" ),
                        "calzzName"
                    ],
                    [
                        Sequelize.col( "teacher.name" ),
                        "teacherName"
                    ],
                    [
                        Sequelize.col( "teacher.surname" ),
                        "teacherSurname"
                    ],
                    [
                        Sequelize.col( "subject.name" ),
                        "subjectName"
                    ],
                    [
                        Sequelize.col( "student.name" ),
                        "studentName"
                    ],
                    [
                        Sequelize.col( "student.surname" ),
                        "studentSurname"
                    ]
                ],
                "where": { "id": id },
                "include": [
                    {
                        "model": Clazzes,
                        "as": "clazz",
                        "attributes": []
                    },
                    {
                        "model": Teachers,
                        "as": "teacher",
                        "attributes": []
                    },
                    {
                        "model": Students,
                        "as": "student",
                        "attributes": []
                    },
                    {
                        "model": Subjects,
                        "as": "subject",
                        "attributes": []
                    }
                ]
            } );

            if ( grade ) {
                return {
                    "payload": grade,
                    "error": null
                };
            }

            return { "payload": null, "error": { "code": 400, "message": "Something went wrong" } } ;
            
        } catch ( error ) {
            console.log( "error in grade get by id service --  ", error );
            return { "payload": null, "error": { "code": 400, "message": "Something went wrong" } } ;

        }
    }

    static async getAll( query ) {

        try {
            let sort = [ "createdAt", query.sort ? query.sort.toLowerCase() : "desc" ],
                start = parseInt( query._start ),
                limitation = parseInt( query._end ) - parseInt( query._start );

            const gradesList = await Grades.findAndCountAll( {
                "attributes": [
                    "id",
                    "grade",
                    [
                        Sequelize.col( "clazz.name" ),
                        "calzzName"
                    ],
                    [
                        Sequelize.col( "teacher.name" ),
                        "teacherName"
                    ],
                    [
                        Sequelize.col( "teacher.surname" ),
                        "teacherSurname"
                    ],
                    [
                        Sequelize.col( "subject.name" ),
                        "subjectName"
                    ],
                    [
                        Sequelize.col( "student.name" ),
                        "studentName"
                    ],
                    [
                        Sequelize.col( "student.surname" ),
                        "studentSurname"
                    ]
                ],
                "include": [
                    {
                        "model": Clazzes,
                        "as": "clazz",
                        "attributes": []
                    },
                    {
                        "model": Teachers,
                        "as": "teacher",
                        "attributes": []
                    },
                    {
                        "model": Students,
                        "as": "student",
                        "attributes": []
                    },
                    {
                        "model": Subjects,
                        "as": "subject",
                        "attributes": []
                    }
                ],
                "distinct": true,
                "offset": start,
                "limit": limitation,
                "order": [ sort ]
            } );

            return {
                "payload": gradesList,
                "error": null
            };
        } catch ( error ) {
            console.log( "error in list get service --  ", error );
            return { "payload": null, "error": { "code": 400, "message": "Something went wrong" } } ;

        }
    }

}
export default GradesService;
