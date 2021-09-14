import { ReadifyPipe } from './readify.pipe';

describe('ReadifyPipe', () => {

  let pipe: ReadifyPipe;

  beforeEach(() => {
    pipe = new ReadifyPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform raw number while value < 10000', () => {
    expect(pipe.transform(0)).toEqual('0 ');
    expect(pipe.transform(987)).toEqual('987 ');
    expect(pipe.transform(9999)).toEqual('9999 ');
    expect(pipe.transform(-1)).toEqual('0 ');
    expect(pipe.transform(123.3)).toEqual('123 ');
  });

  it('should transform raw number while 10000 <= value < 10000 * 10000', () => {
    expect(pipe.transform(10000)).toEqual('1 万');
    expect(pipe.transform(10001)).toEqual('1 万');
    expect(pipe.transform(11999)).toEqual('1.1 万');
    expect(pipe.transform(98765.432)).toEqual('9.8 万');
    expect(pipe.transform(10000 * 10000 - 1)).toEqual('9999.9 万');
  });

  it('should transform raw number while value > 10000 * 10000', () => {
    expect(pipe.transform(10000 * 10000)).toEqual('1 亿');
    expect(pipe.transform(10000 * 10000 + 10000)).toEqual('1 亿');
    expect(pipe.transform(10000 * 10000 + 1000 * 10000 + 9999)).toEqual('1.1 亿');
    expect(pipe.transform(10000 * 10000 + 0.9876)).toEqual('1 亿');
    expect(pipe.transform(9999.9 * 10000 * 10000)).toEqual('9999.9 亿');
  });

});
