import StatisticsService from "../../services/statistics";

class StatisticsController {

    async studentsAverageGrades( req, res ) {
        try {
            const list = await StatisticsService.sortByAvg( req.query.sort );

            return res.json( list );

        } catch ( error ) {
            console.log( "sort avg error -- ", error );
            return res.json( { "payload": null, "error": { "code": 400, "message": "something Wrong" } } );
        }
    }

    async subjectsAverageGrades( req, res ) {
        try {
            const list = await StatisticsService.sortBySubjectAvg( req.query.sort );

            return res.json( list );

        } catch ( error ) {
            console.log( "sort subject avg error -- ", error );
            return res.json( { "payload": null, "error": { "code": 400, "message": "something Wrong" } } );
        }
    }

    async clazzSort( req, res ) {
        try {
            console.log( "req.query.sort -- ", req.query.sort );
            console.log( "req.query.sort -- " );
            const list = await StatisticsService.clazzSort( req.query.sort );

            return res.json( list );

        } catch ( error ) {
            console.log( "clazz sort error -- ", error );
            return res.json( { "payload": null, "error": { "code": 400, "message": "something Wrong" } } );
        }
    }

}

export default StatisticsController;
