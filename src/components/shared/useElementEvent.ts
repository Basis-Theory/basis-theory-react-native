import type { CreateEvent, Mask } from '../../BaseElementTypes';
import { ElementType } from '../../BaseElementTypes';
import { useElementValidation } from './useElementValidation';
import { has, isEmpty } from 'ramda';
import { useMemo } from 'react';
import { useCardMetadata } from './useCardMetadata';
import { extractDigits, isNilOrEmpty } from '../../utils/shared';
import { _elementErrors } from '../../ElementValues';

type UseElementEventProps = {
  type: ElementType;
  id: string;
  mask?: Mask;
};

export const useElementEvent = ({
  type,
  id,
  mask,
}: UseElementEventProps): CreateEvent => {
  const { getValidationStrategy } = useElementValidation();
  const { getMetadataFromCardNumber: _getMetadataFromCardNumber } =
    useCardMetadata();

  const validator = useMemo(() => getValidationStrategy(type), [type]);

  const validate = (value: string) => {
    const error = validator(value, mask);

    if (error && isNilOrEmpty(_elementErrors[id])) _elementErrors[id] = error;

    if (!error && has(id, _elementErrors)) delete _elementErrors[id];

    return error
      ? [
          {
            targetId: type,
            type: error,
          },
        ]
      : undefined;
  };

  const getMetadataFromCardNumber = (value: string) => {
    if (type !== ElementType.CARD_NUMBER) return undefined;

    const { cvcLength, cardBin, cardLast4, brand, lengths } =
      _getMetadataFromCardNumber(value);

    return {
      card: {
        cvcLength,
        cardBin,
        cardLast4,
        brand,
      },
      lengths,
    };
  };

  return (value: string) => {
    const metadata = getMetadataFromCardNumber(value);
    const empty = isEmpty(value);
    const errors = validate(value);
    const valid = !empty && !errors;

    const maskSatisfied = mask
      ? metadata?.lengths?.includes(extractDigits(value)?.length ?? 0) ??
        mask.length === value.length
      : true;

    const complete = !errors && maskSatisfied;

    return {
      empty,
      errors,
      valid,
      maskSatisfied,
      complete,
      ...metadata?.card,
    };
  };
};
