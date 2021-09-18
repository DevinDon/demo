import { Tree } from '@nrwl/devkit';
import { installDocker } from './libs';
import { Schema } from './schema';

export default async function (tree: Tree, { action }: Schema) {
  console.log(`Images will be ${action}.`);
  await installDocker();
  // action === 'build' && await build();
  // action === 'push' && await push();
  console.log(`Images ${action} done.`);
}
