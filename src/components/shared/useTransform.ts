import { identity, isEmpty, isNil } from 'ramda';

type TransformType = [RegExp | string, string];

const useTransform = (transform?: TransformType) => {
  const _transform = (str: string) =>
    !isNil(transform) && !isEmpty(transform)
      ? str.replaceAll(transform[0], transform[1])
      : str;

  return {
    apply: transform ? _transform : identity,
  };
};

export { useTransform };
export type { TransformType };
