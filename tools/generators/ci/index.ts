import { Tree } from '@nrwl/devkit';
import { buildAllImages, getAppList, installDocker, loginToDocker, untar } from './libs';
import { Schema } from './schema';

const build = async () => {

  const apps = getAppList();

  await loginToDocker().then(print);
  await untar().then(print);

  await buildAllImages(apps).then(print);

};

const push = async () => {

  const apps = getAppList();

  await loginToDocker().then(print);
  await untar().then(print);

  await buildAllImages(apps).then(print);

};

export default async function (tree: Tree, { action }: Schema) {
  console.log(`Images will be ${action}.`);
  await installDocker();
  action === 'build' && await build();
  action === 'push' && await push();
  console.log(`Images ${action} done.`);
}
