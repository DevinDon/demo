import { readdirSync } from 'fs';
import { ProcessOutput } from 'zx';
import { $, cd } from 'zx';

export const print = async (output: ProcessOutput) => {
  output.stdout && console.log(output.stdout);
  output.stderr && console.error(output.stderr);
};

export const getAppList = () =>
  readdirSync(`${process.env.BUILD_DIR}/dist/apps/`);

export const getImageName = (app: string) =>
  `${process.env.ALIYUN_REGISTRY}/iinfinity/${app}`;

export const loginToDocker = async () => $`docker login \
    --username=${process.env.ALIYUN_USERNAME} \
    --password=${process.env.ALIYUN_PASSWORD} \
    ${process.env.ALIYUN_REGISTRY}`;

export const untar = async () => {
  cd(process.env.BUILD_DIR);
  return $`tar zxvf package.tgz`;
};

export const buildAllImages = async (apps: string[]) => Promise.all(
  apps.map(async app => {
    const image = getImageName(app);
    const envSafeName = app.replace(/-/g, '_').toUpperCase();
    return $`docker build \
        --build-arg SET_DB_HOST=${process.env[envSafeName + '_SET_DB_HOST']} \
        --build-arg SET_DB_PORT=${process.env[envSafeName + '_SET_DB_PORT']} \
        --build-arg SET_DB_USER=${process.env[envSafeName + '_SET_DB_USER']} \
        --build-arg SET_DB_PASS=${process.env[envSafeName + '_SET_DB_PASS']} \
        --build-arg SET_DB_NAME=${process.env[envSafeName + '_SET_DB_NAME']} \
        -t ${image}:${process.env.DATETIME} \
        -t ${image}:latest \
        -f apps/${app}/Dockerfile \
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
  $`wget -qO- https://get.docker.com/ | sh`.then(print);

export const build = async () => {

  const apps = getAppList();

  await loginToDocker().then(print);
  await untar().then(print);

  await buildAllImages(apps)
    .then(outputs => outputs.forEach(print));

};

export const push = async () => {

  const apps = getAppList();

  await loginToDocker().then(print);
  await untar().then(print);

  await buildAllImages(apps)
    .then(outputs => outputs.forEach(print));

};
