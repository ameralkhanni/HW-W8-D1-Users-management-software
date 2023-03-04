import  express ,{Application} from "express";
const app:Application= express();
import userRoutes from './routes/user.routes'
let port:number=3003;
app.use(express.json());

app.use('/user',userRoutes);



app.listen(port,() => console.log(`express server started on port ${port}`));

