// log.js
const axios = require('axios');

const VALID_STACKS = ['backend', 'frontend'];
const VALID_LEVELS = ['debug', 'info', 'warn', 'error', 'fatal'];
const VALID_PACKAGES = {
  backend: ['cache', 'controller', 'cron_job', 'db', 'domain', 'handler', 'repository', 'route', 'service'],
  frontend: ['api', 'component', 'hook', 'page', 'state', 'style'],
  both: ['auth', 'config', 'middleware', 'utils']
};

const LOG_ENDPOINT = 'http://20.244.56.144/evaluation-service/logs';

/**
 * Logs a message to the external log server.
 * @param {string} stack - 'backend' or 'frontend'
 * @param {string} level - 'debug' | 'info' | 'warn' | 'error' | 'fatal'
 * @param {string} pkg - name of the package/module
 * @param {string} message - descriptive message
 */
async function Log(stack, level, pkg, message) {
  try {
    stack = stack.toLowerCase();
    level = level.toLowerCase();
    pkg = pkg.toLowerCase();

    // Validate stack
    if (!VALID_STACKS.includes(stack)) {
      throw new Error(`Invalid stack: ${stack}`);
    }

    // Validate level
    if (!VALID_LEVELS.includes(level)) {
      throw new Error(`Invalid log level: ${level}`);
    }

    // Validate package
    const validPackages = [...VALID_PACKAGES.both, ...VALID_PACKAGES[stack]];
    if (!validPackages.includes(pkg)) {
      throw new Error(`Invalid package "${pkg}" for stack "${stack}"`);
    }

    const payload = {
      stack,
      level,
      package: pkg,
      message
    };

    const res = await axios.post(LOG_ENDPOINT, payload);
    if (res.status === 200) {
      console.log('✅ Log submitted:', res.data.logID);
    } else {
      console.warn('⚠️ Failed to log. Status:', res.status);
    }
  } catch (err) {
    console.error('❌ Logging Error:', err.message);
  }
}

module.exports = Log;
