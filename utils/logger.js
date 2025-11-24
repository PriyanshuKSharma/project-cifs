const fs = require('fs');
const path = require('path');

class Logger {
  static log(level, message, data = {}) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      message,
      data
    };

    console.log(`[${timestamp}] ${level.toUpperCase()}: ${message}`);

    try {
      const logDir = path.join(__dirname, '../logs');
      if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
      }
      const logFile = path.join(logDir, `${new Date().toISOString().split('T')[0]}.log`);
      fs.appendFileSync(logFile, JSON.stringify(logEntry) + '\n');
    } catch (err) {
      console.error('Logging failed:', err);
    }
  }

  static security(message, data) {
    this.log('SECURITY', message, data);
  }
}

module.exports = Logger;