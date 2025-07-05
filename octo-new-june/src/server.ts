import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

const app = express();
const port = process.env.PORT || 8099;
const configPath = '/data/options.json';

app.use(express.json());

// Serve static UI
app.use('/', express.static(path.join(__dirname, 'public')));

// API: Get config
app.get('/api/config', (_req: Request, res: Response) => {
  try {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    res.json(config);
  } catch (e) {
    res.status(500).json({ error: 'Failed to read config' });
  }
});

// API: Update config
app.post('/api/config', (_req: Request, res: Response) => {
  try {
    fs.writeFileSync(configPath, JSON.stringify(_req.body, null, 2));
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: 'Failed to write config' });
  }
});

app.listen(port, () => {
  console.log(`Config UI server running on port ${port}`);
}); 