/* eslint-disable new-cap */
import express from "express";
import grades from "./controller";
const router = express.Router(),
    gradesRoutes = new grades();

router.post( "/api/grades/create", gradesRoutes.create ); // checkTokenMidleware.checkToken
router.put( "/api/grades/update/:id", gradesRoutes.update ); // checkTokenMidleware.checkToken
router.delete( "/api/grades/delete/:id", gradesRoutes.delete ); // checkTokenMidleware.checkToken
router.get( "/api/grades/get", gradesRoutes.getById ); // checkTokenMidleware.checkToken
router.get( "/api/grades/list", gradesRoutes.list ); // checkTokenMidleware.checkToken
export default router;
