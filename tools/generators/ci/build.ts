import { buildAllImages, getAppList, loginToDocker } from './libs';

(async () => {

  const apps = getAppList();

  await loginToDocker().then(print);

  await buildAllImages(apps)
    .then(outputs => outputs.forEach(print));

})();
