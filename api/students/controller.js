import StudentsService from "../../services/Students";
import Tools from "../../helpers/tools";

class StudentsController {
   
    async create( req, res ) {
        try {
            // const teacherId = req.body.teacherId, // or from JWT
            const checkData = [ "name", "surname", "clazzId" ];

            if ( !Tools.checkKeyExistAndNotEmpty( req.body, checkData ) ) {
                return res.json( { "payload": null, "error": { "code": 400, "message": "wrong data" } } );
            }

            // eslint-disable-next-line one-var
            const createNewStudent = await StudentsService.create( req.body );

            return res.json( createNewStudent );

        } catch ( error ) {
            console.log( "creation error -- ", error );
            return res.json( { "payload": null, "error": { "code": 400, "message": "something Wrong" } } );
        }
    }

    async update( req, res ) {
        try {
            // const teacherId = req.body.teacherId, // or from JWT
            const id = req.params.id;

            // eslint-disable-next-line one-var
            const editedStudent = await StudentsService.edit( req.body, id );

            return res.json( editedStudent );

        } catch ( error ) {
            console.log( "Student update error case ---  ", error );
            return res.json( { "payload": null, "error": { "code": 400, "message": "something Wrong" } } );
        }
    }

    async delete( req, res ) {
        try {
            const deleteStudent = await StudentsService.delete( req.params.id );

            return res.json( deleteStudent );

        } catch ( error ) {
            console.log( "students get all error case ---  ", error );
            return res.json( { "payload": null, "error": { "code": 400, "message": "something Wrong" } } );
        }
    }

    async getById( req, res ) {
        try {
            const StudentId = req.query.id,
                StudentData = await StudentsService.getById( StudentId );

            if ( StudentData.error ) {
                return res.json( { "payload": null, "error": { "code": 400, "message": "cant get data" } } );
            }
            return res.json( StudentData );

        } catch ( error ) {
            console.log( "Student get error case ---  ", error );
            return res.json( { "payload": null, "error": { "code": 400, "message": "something Wrong" } } );
        }
    }

    async list( req, res ) {
        try {
            const StudentsList = await StudentsService.getAll( req.query );

            return res.json( StudentsList );
        } catch ( error ) {
            console.log( "Student get all error case ---  ", error );
            return res.json( { "payload": null, "error": { "code": 400, "message": "something Wrong" } } );
        }
    }


}

export default StudentsController;
