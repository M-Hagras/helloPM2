module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : 'API',
      script    : 'app.js',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production : {
        NODE_ENV: 'production'
      },
      watch     : true
    },

    // Second application
    {
      name      : 'WEB',
      script    : 'web.js',
      instances  : 4,
      exec_mode  : "cluster"
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : 'pm2_user',
      host : '10.0.0.20',
      ref  : 'origin/master',
      repo : 'https://github.com/M-Hagras/helloPM2.git',
      path : '/Users/pm2_user/Documents/production',
      'post-deploy' : 'npm install && pm2 install pm2-server-monit && pm2 reload ecosystem.config.js --env production'
    },
    dev : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/development',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env dev',
      env  : {
        NODE_ENV: 'dev'
      }
    }
  }
};
