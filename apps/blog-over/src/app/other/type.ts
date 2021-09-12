type PickPromise<T> = T extends Promise<infer R> ? R : T;

type PickPromiseFromReturnType<T extends (...args: any) => any> = ReturnType<T> extends Promise<infer R> ? R : ReturnType<T>;
