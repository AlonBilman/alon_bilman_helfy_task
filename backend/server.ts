import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/tasks.route';

const app = express();
//as wanted
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use('/api/tasks', taskRoutes);

app.get('/health', (_req, res) => {
  res.send('Server is up and running...');
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});

