/* eslint-disable new-cap */
import express from "express";
import students from "./controller";
const router = express.Router(),
    studentsRoutes = new students();

router.post( "/api/students/create", studentsRoutes.create ); // checkTokenMidleware.checkToken
router.put( "/api/students/update/:id", studentsRoutes.update ); // checkTokenMidleware.checkToken
router.delete( "/api/students/delete/:id", studentsRoutes.delete ); // checkTokenMidleware.checkToken
router.get( "/api/students/get", studentsRoutes.getById ); // checkTokenMidleware.checkToken
router.get( "/api/students/list", studentsRoutes.list ); // checkTokenMidleware.checkToken
export default router;
