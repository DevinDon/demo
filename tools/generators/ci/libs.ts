import { readdirSync } from 'fs';
import { $, cd, ProcessOutput } from 'zx';

(async () => {
  console.log('List all env:');
  console.log('$BUILD_DIR:', process.env.BUILD_DIR);
  console.log('$BUILD_NUMBER:', process.env.BUILD_NUMBER);
  console.log('$ALIYUN_REGISTRY:', process.env.ALIYUN_REGISTRY);
  console.log('$ALIYUN_USERNAME:', process.env.ALIYUN_USERNAME);
  console.log('$ALIYUN_PASSWORD:', process.env.ALIYUN_PASSWORD);
  console.log('$WEIBO_API_SET_DB_HOST', process.env.WEIBO_API_SET_DB_HOST);
})();

export const print = async (output: ProcessOutput) => {
  output.stdout && console.log(output.stdout);
  output.stderr && console.error(output.stderr);
};

export const getAppList = () => {
  try {
    return readdirSync(`${process.env.BUILD_DIR}/dist/apps/`);
  } catch (error) {
    return [];
  }
};

export const getImageName = (app: string) =>
  `${process.env.ALIYUN_REGISTRY}/iinfinity/${app}`;

export const loginToDocker = async () => $`docker login \\
    --username=${process.env.ALIYUN_USERNAME} \\
    --password=${process.env.ALIYUN_PASSWORD} \\
    ${process.env.ALIYUN_REGISTRY}`;

export const untar = async () => {
  cd(process.env.BUILD_DIR);
  return $`tar zxvf package.tgz`;
};

export const buildAllImages = async (apps: string[]) => Promise.all(
  apps.map(async app => {
    const image = getImageName(app);
    const envSafeName = app.replace(/-/g, '_').toUpperCase();
    return image.includes('api')
      ? $`docker build \\
          --build-arg SET_PROTOCOL=${process.env[envSafeName + '_SET_PROTOCOL']} \\
          --build-arg SET_HOST=${process.env[envSafeName + '_SET_HOST']} \\
          --build-arg SET_PORT=${process.env[envSafeName + '_SET_PORT']} \\
          --build-arg SET_DB_HOST=${process.env[envSafeName + '_SET_DB_HOST']} \\
          --build-arg SET_DB_PORT=${process.env[envSafeName + '_SET_DB_PORT']} \\
          --build-arg SET_DB_USER=${process.env[envSafeName + '_SET_DB_USER']} \\
          --build-arg SET_DB_PASS=${process.env[envSafeName + '_SET_DB_PASS']} \\
          --build-arg SET_DB_NAME=${process.env[envSafeName + '_SET_DB_NAME']} \\
          --build-arg SET_DB_AUTH=${process.env[envSafeName + '_SET_DB_AUTH']} \\
          --build-arg SET_HANDLER_POOL_MAX=${process.env[envSafeName + '_SET_HANDLER_POOL_MAX']} \\
          --build-arg SET_LOGGER_LEVEL=${process.env[envSafeName + '_SET_LOGGER_LEVEL']} \\
          --build-arg SET_LOGGER_TRACE=${process.env[envSafeName + '_SET_LOGGER_TRACE']} \\
          --build-arg SET_LOGGER_LOGOUT=${process.env[envSafeName + '_SET_LOGGER_LOGOUT']} \\
          --build-arg SET_LOGGER_LOGERR=${process.env[envSafeName + '_SET_LOGGER_LOGERR']} \\
          -t ${image}:${process.env.DATETIME} \\
          -t ${image}:latest \\
          -f apps/${app}/Dockerfile \\
          .`
      : $`docker build \\
          -t ${image}:${process.env.DATETIME} \\
          -t ${image}:latest \\
          -f apps/${app}/Dockerfile \\
          .`;
  }),
);

export const pushAllImages = async (apps: string[]) => Promise.all(
  apps.map(async app => {
    const image = getImageName(app);
    return $`docker push --all-tags ${image}`;
  }),
);

export const installDocker = async () =>
  $`wget -qO- https://get.docker.com/ | sh`;
