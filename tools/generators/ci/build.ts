import { buildAllImages, getAppList, loginToDocker, print } from './libs';

(async () => {

  const apps = getAppList();

  await loginToDocker().then(print);

  await buildAllImages(apps)
    .then(outputs => outputs.forEach(print));

  console.log('All images built, image list:\n\t', apps.join('\n\t'));

})();
