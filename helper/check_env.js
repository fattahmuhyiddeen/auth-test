console.log(process.env.NODE_ENV);

switch (process.env.DATABASE_ENGINE) {
  case 'postgres':
    if (!process.env.DATABASE_URL) {
      throw new Error('Please set DATABASE_URL if DATABASE_ENGINE is set to postgres');
    }
    break;
  case 'mysql':
  case 'maria':
    if (!process.env.DATABASE_HOST) {
      throw new Error('Please set DATABASE_HOST if DATABASE_ENGINE is set to mysql');
    }
    if (!process.env.DATABASE_USERNAME) {
      throw new Error('Please set DATABASE_USERNAME if DATABASE_ENGINE is set to mysql');
    }
    if (!process.env.DATABASE_PASSWORD) {
      throw new Error('Please set DATABASE_PASSWORD if DATABASE_ENGINE is set to mysql');
    }
    if (!process.env.DATABASE_NAME) {
      throw new Error('Please set DATABASE_NAME if DATABASE_ENGINE is set to mysql');
    }
    break;
  default:
    throw new Error('Please set DATABASE_ENGINE properly');
}
switch (process.env.NODE_ENV) {
  case 'production':
  case 'development':
  case 'staging':
  case 'test':
  case 'local':
    break;
  default:
    throw new Error('Please set NODE_ENV properly');
}
if (!process.env.PROJECT_JWT_SECRET) {
  throw new Error(`Please set ${e} properly`);
}
