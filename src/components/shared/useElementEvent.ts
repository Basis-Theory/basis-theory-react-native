import { ChangeEvent } from '@basis-theory/basis-theory-react/types';
import { ElementType, Mask } from '../../BaseElementTypes';
import { useElementValidation } from './useElementValidation';
import { isEmpty } from 'ramda';
import { useMemo } from 'react';
import { useCardMetadata } from './useCardMetadata';

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

    const { cvcLenth, cardBin, cardLast4, brand } =
      _getMetadataFromCardNumber(value);

    return { cvcLenth, cardBin, cardLast4, brand };
  };

  return (value: string) => {
    const empty = isEmpty(value);
    const errors = validate(value);
    const valid = !empty && !errors;
    const maskSatisfied = mask ? value.length == mask.length : true;
    const complete = !errors && maskSatisfied;
    const additionalCardMetadata = getMetadataFromCardNumber(value);

    return {
      empty,
      errors,
      valid,
      maskSatisfied,
      complete,
      ...additionalCardMetadata,
    };
  };
};
