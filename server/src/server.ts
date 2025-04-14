import dotenv from 'dotenv';
dotenv.config();
import app from './app';
import SystemLog from '#ro/common/utils/SystemLog';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  SystemLog.info(`🚀 Server running on port ${PORT}`);
});
