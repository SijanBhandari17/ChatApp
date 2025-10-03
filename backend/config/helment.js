import helmet from 'helmet';

const helmetConfig = helmet({
  contentSecurityPolicy: false,
  hsts: false,
});

export default helmetConfig;
