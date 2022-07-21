import logger from 'pino';
import dayjs from 'dayjs';

const log = logger({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true
    }
  },
  base: {
    pid: false
  },
  timestamp: () => `,"Time": ${dayjs().format()}`
});

export default log;