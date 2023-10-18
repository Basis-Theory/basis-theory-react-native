import { ElementType } from '../../BaseElementTypes';
import { _elementValues } from '../../ElementValues';

type UseMask = { maskLength?: number; type: ElementType; id?: string };

const createCvcMask = (maskLength?: number) => {
  const length =
    maskLength == undefined || maskLength > 4 || maskLength < 3
      ? 4
      : maskLength;

  return Array.from<string | RegExp>({ length }).fill(/\d/u);
};

export const useMask = ({ maskLength, type, id }: UseMask) => {
  if (type === ElementType.CVC) {
    return createCvcMask(maskLength);
  }

  if (type === ElementType.CARD_NUMBER) {
    return [
      /\d/u,
      /\d/u,
      /\d/u,
      /\d/u,
      ' ',
      /\d/u,
      /\d/u,
      /\d/u,
      /\d/u,
      ' ',
      /\d/u,
      /\d/u,
      /\d/u,
      /\d/u,
      ' ',
      /\d/u,
      /\d/u,
      /\d/u,
      /\d/u,
    ];
  }

  if (type === ElementType.EXPIRATION_DATE) {
    return [/\d/u, /\d/u, '/', /\d/u, /\d/u];
  }

  return undefined;
};
