module.exports = {
  apps: [{
    name: 'baker-hub',
    script: 'npm',
    args: 'start',
    cwd: '/home/claude/family_calendar_v1/baker-family-hub',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      HOSTNAME: '0.0.0.0'
    }
  }]
};
