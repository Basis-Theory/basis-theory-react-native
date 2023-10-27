import { Dispatch, SetStateAction } from 'react';
import { _elementValues } from '../../ElementValues';
import { EventConsumer, useElementEvent } from './useElementEvent';
import { ElementType, Mask } from '../../BaseElementTypes';
import { identity } from 'ramda';

type UseUserEventHandlers = {
  setElementValue: Dispatch<SetStateAction<string>>;
  element: {
    id: string;
    type: ElementType;
    mask?: Mask;
  };
  onChange?: EventConsumer;
  transform?: (value: string) => string;
};

export const useUserEventHandlers = ({
  setElementValue,
  element,
  onChange,
  transform = identity,
}: UseUserEventHandlers) => {
  const createEvent = useElementEvent(element);

  return {
    _onChange: (_elementValue: string) => {
      _elementValues[element.id] = transform(_elementValue);

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
