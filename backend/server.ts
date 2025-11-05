import express from 'express';
import cors from 'cors';

const app = express();
//as wanted
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.send('Server is up and running...');
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
