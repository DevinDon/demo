interface URLInput {
  host?: string;
  segments: (string | number)[];
  params?: { [index: string]: (string | number) };
}

export const join: (input: URLInput) => string = ({ host, segments, params }) => {

  const paths = segments
    .map(segment => segment.toString())
    .map(encodeURIComponent);

  const queries: string[] = [];
  for (const key in params) {
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      const value = params[key].toString();
      queries.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    }
  }

  const url = [host, ...paths]
    .filter(v => v)
    .join('/')
    .replace('://', '~PROTOCOL~')
    .replace(/\/+/g, '/')
    .replace(/\/$/, '')
    .replace('~PROTOCOL~', '://')
    + (queries.length ? '?' : '')
    + queries.join('&');

  return url;

};
