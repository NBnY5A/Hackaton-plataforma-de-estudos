import 'dotenv/config';


import express from "express";
import userRoutes from "./routes/user.route.js";
import taskRoutes from "./routes/task.route.js";
import authRoutes from "./routes/auth.route.js";

const app = express();

app.use(express.json());
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', taskRoutes);

app.listen(process.env.PORT || 3000, () => {
    if (process.env.PORT != null) {
        console.log(`Server is running on port ${process.env.PORT}`);
    }
    else {
        console.log(`Server is running on port 3000`);
    }
});

export default app;
