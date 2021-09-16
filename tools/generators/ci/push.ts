import { getAppList, loginToDocker, print, pushAllImages } from './libs';

(async () => {

  const apps = getAppList();

  await loginToDocker().then(print);

  await pushAllImages(apps)
    .then(outputs => outputs.forEach(print));

})();
