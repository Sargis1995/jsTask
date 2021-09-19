import GradesService from "../../services/grades";
import StudentsService from "../../services/students";
import Tools from "../../helpers/tools";

class GradesController {

    async create( req, res ) {
        try {
            // const teacherId = req.body.teacherId, // or from JWT
            const checkData = [ "teacherId", "studentId", "subjectId", "grade", "clazzId" ];

            if ( !Tools.checkKeyExistAndNotEmpty( req.body, checkData ) ) {
                return res.json( { "payload": null, "error": { "code": 400, "message": "wrong data" } } );
            }

            // eslint-disable-next-line one-var
            const checkStudentClass = await StudentsService.checkClazz( {
                "studentId": req.body.studentId,
                "clazzId": req.body.clazzId
            } );

            console.log( "checkStudentClass -- ", checkStudentClass.payload );
            if ( checkStudentClass.error ) {
                return res.json( { "payload": null, "error": { "code": 400, "message": "wrong clazzId" } } );
            }

            // eslint-disable-next-line one-var
            const createNewGrade = await GradesService.create( req.body );

            return res.json( createNewGrade );

        } catch ( error ) {
            console.log( "creation error -- ", error );
            return res.json( { "payload": null, "error": { "code": 400, "message": "something Wrong" } } );
        }
    }

    async update( req, res ) {
        try {
            // const teacherId = req.body.teacherId, // or from JWT
            const checkData = [ "grade" ],
                id = req.params.id;

            if ( !Tools.checkKeyExistAndNotEmpty( req.body, checkData ) ) {
                return res.json( { "payload": null, "error": { "code": 400, "message": "wrong data" } } );
            }

            // eslint-disable-next-line one-var
            const editedGrade = await GradesService.edit( req.body, id );

            return res.json( editedGrade );

        } catch ( error ) {
            console.log( "grade update error case ---  ", e );
            return res.json( { "payload": null, "error": { "code": 400, "message": "something Wrong" } } );
        }
    }

    async delete( req, res ) {
        try {
            const deleteGrade = await GradesService.delete( req.params.id );

            return res.json( deleteGrade );

        } catch ( error ) {
            console.log( "threads get all error case ---  ", error );
            return res.json( { "payload": null, "error": { "code": 400, "message": "something Wrong" } } );
        }
    }

    async getById( req, res ) {
        try {
            const gradeId = req.query.id,
                gradeData = await GradesService.getById( gradeId );

            if ( gradeData.error ) {
                return res.json( { "payload": null, "error": { "code": 400, "message": "cant get data" } } );
            }
            return res.json( gradeData );

        } catch ( error ) {
            console.log( "grade get error case ---  ", error );
            return res.json( { "payload": null, "error": { "code": 400, "message": "something Wrong" } } );
        }
    }

    async list( req, res ) {
        try {
            const gradesList = await GradesService.getAll( req.query );

            return res.json( gradesList );
        } catch ( error ) {
            console.log( "grade get all error case ---  ", error );
            return res.json( { "payload": null, "error": { "code": 400, "message": "something Wrong" } } );
        }
    }


}

export default GradesController;
