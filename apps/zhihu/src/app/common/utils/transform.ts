// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Vditor from 'vditor/dist/method.min';

export const transform: (markdown: string) => Promise<string> = markdown => Vditor.md2html(markdown);
