export const sleep: (delay: number) => Promise<void> = delay =>
  new Promise(resolve => setTimeout(resolve, delay));
