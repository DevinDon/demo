/* eslint-disable no-shadow */
export const REG_IS_VALID_URL = /^(http[s]?):\/\/(.*)$/;
export const REG_HOST = /mock.don.red\/tinyurl\//;

export const isValidURL = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

export const isInvalidURL = (url: string): boolean => !isValidURL(url);

export const isLongURL = (url: string): boolean => {
  const { hostname, pathname } = new URL(url);
  const hosts = JSON.parse(localStorage.getItem('HOSTS_KEY') || '[]');
  const result = (Array.isArray(hosts) ? hosts : []).map(host => host.domain);
  return !(result.includes(hostname) && pathname.split('/').length === 2);
};

export const isShortURL = (url: string): boolean => isValidURL(url) && !isLongURL(url);

export enum Icon {
  invalid = 'help_outline',
  link = 'link',
  copy = 'content_copy'
}


export enum Tip {
  invalid = 'Enter your link to continue',
  shorten = 'Generate short link',
  restore = 'Restore origin link',
  copy = 'Copy short link'
}

export enum ButtonText {
  invalid = 'Invalid',
  shorten = 'Shorten',
  restore = 'Restore',
  copy = 'Copy',
  copied = 'Copied'
}
