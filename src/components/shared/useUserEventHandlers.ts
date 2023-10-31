import { Dispatch, SetStateAction } from 'react';
import { _elementValues } from '../../ElementValues';
import { EventConsumer, useElementEvent } from './useElementEvent';
import { ElementType, Mask } from '../../BaseElementTypes';
import { TransformType, useTransform } from './useTransform';

type UseUserEventHandlers = {
  setElementValue: Dispatch<SetStateAction<string>>;
  element: {
    id: string;
    type: ElementType;
    mask?: Mask;
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
