import { ChangeEvent } from '@basis-theory/basis-theory-react/types';
import { ElementType, Mask } from '../../BaseElementTypes';
import { useElementValidation } from './useElementValidation';
import { isEmpty } from 'ramda';
import { useMemo } from 'react';
import { useCardMetadata } from './useCardMetadata';
import { extractDigits } from './utils';

export type ElementEvent = Omit<ChangeEvent, 'type'>;

export type EventConsumer = (event: ElementEvent) => void;

export type CreateEvent = (value: string) => ElementEvent;

type UseElementEventProps = {
  type: ElementType;
  mask?: Mask;
};

export const useElementEvent = ({
  type,
  mask,
}: UseElementEventProps): CreateEvent => {
  const { getValidationStrategy } = useElementValidation();
  const { getMetadataFromCardNumber: _getMetadataFromCardNumber } =
    useCardMetadata();

  const validator = useMemo(() => getValidationStrategy(type), [type]);

  const validate = (value: string) => {
    const error = validator(value, mask);

    return error ? [{ targetId: type, type: error }] : undefined;
  };

  const getMetadataFromCardNumber = (value: string) => {
    if (type !== ElementType.CARD_NUMBER) return undefined;

    const { cvcLenth, cardBin, cardLast4, brand, lengths } =
      _getMetadataFromCardNumber(value);

    return {
      card: { cvcLenth, cardBin, cardLast4, brand },
      lengths,
    };
  };

  return (value: string) => {
    const metadata = getMetadataFromCardNumber(value);
    const empty = isEmpty(value);
    const errors = validate(value);
    const valid = !empty && !errors;

    const maskSatisfied = mask
      ? metadata?.lengths?.includes(extractDigits(value)?.length!!) ??
        mask.length == value.length
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
