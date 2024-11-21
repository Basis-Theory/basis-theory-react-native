import type { Dispatch, SetStateAction } from 'react';
import { _elementValues } from '../../ElementValues';
import { useElementEvent } from './useElementEvent';
import type { ElementType, EventConsumer } from '../../BaseElementTypes';
import type { TransformType } from './useTransform';
import { useTransform } from './useTransform';
import { ValidatorOptions } from '../../utils/validation';

type UseUserEventHandlers = {
  setElementValue: Dispatch<SetStateAction<string>>;
  element: {
    id: string;
    type: ElementType;
    validatorOptions?: ValidatorOptions;
  };
  onChange?: EventConsumer;
  transform?: TransformType;
};

export const useUserEventHandlers = ({
  setElementValue,
  element,
  onChange,
  transform,
}: UseUserEventHandlers) => {
  const createEvent = useElementEvent(element);

  const transformation = useTransform(transform);

  return {
    _onChange: (_elementValue: string) => {
      _elementValues[element.id] = transformation.apply(_elementValue);

      setElementValue(() => {
        if (onChange) {
          const event = createEvent(_elementValue);

          onChange(event);
        }

        return _elementValue;
      });
    },
    _onFocus: () => {
      // TODO
    },
    _onBlur: () => {
      // TODO
    },
    _onReady: () => {
      // TODO
    },
    _onKeydown: () => {
      // TODO
    },
  };
};
