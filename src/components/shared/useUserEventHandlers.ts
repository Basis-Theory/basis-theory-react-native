import type { Dispatch, SetStateAction } from 'react';
import { _elementValues } from '../../ElementValues';
import { useElementEvent } from './useElementEvent';
import type { ElementType, EventConsumers } from '../../BaseElementTypes';
import type { TransformType } from './useTransform';
import { useTransform } from './useTransform';
import { ValidatorOptions } from '../../utils/validation';
import { NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';
import { isString } from '../../utils/shared';

type UseUserEventHandlers = {
  setElementValue: Dispatch<SetStateAction<string>>;
  element: {
    id: string;
    type: ElementType;
    validatorOptions?: ValidatorOptions;
  };
  transform?: TransformType;
} & EventConsumers;

export const useUserEventHandlers = ({
  setElementValue,
  element,
  onChange,
  onBlur,
  onFocus,
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
    _onFocus: (_event: NativeSyntheticEvent<TextInputFocusEventData>) => {
      const val = _elementValues[element.id] ?? '';

      if (onFocus && isString(val)) {
        const event = createEvent(val);
        onFocus(event);
      }
    },
    _onBlur: (_event: NativeSyntheticEvent<TextInputFocusEventData>) => {
      const val = _elementValues[element.id] ?? '';

      if (onBlur && isString(val)) {
        const event = createEvent(val);
        onBlur(event);
      }
    },
    _onReady: () => {
      // TODO
    },
    _onKeydown: () => {
      // TODO
    },
  };
};
