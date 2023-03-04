import  express from 'express';
import { CheckUserNameAndPassword, createNewUser, getAllUsers, getAllUsersYear, getNumberUsersSpecificRole, getUserAgeOlder, getUserJoined, getuserByEmail, getuserById, updatePassword } from '../controller/user.controller';


const router =  express.Router();


router.post("/", createNewUser)
router.get("/", getAllUsers)
router.get("/:id", getuserById)
router.get("/email/:email", getuserByEmail)
router.get("/age/:age", getUserAgeOlder)
router.get("/role/:role", getNumberUsersSpecificRole)
router.get("/check",CheckUserNameAndPassword)
router.put("/password/:id", updatePassword)
router.post("/sameyear/:id", getUserJoined)
router.get("/year/:year", getAllUsersYear)






export default router;