function badHash() {
  return 'hash' + [].join.call(arguments);
}

export default function cachingDecorator(func, hash = badHash) {
  const cache = new Map();

  return function () {
    const key = hash(arguments);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const value = func.apply(this, arguments);

    cache.set(key, value);

    return value;
  };
}
