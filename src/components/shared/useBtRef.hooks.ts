import {
  Dispatch,
  ForwardedRef,
  RefObject,
  SetStateAction,
  useEffect,
} from 'react';
import { BTRef, InputBTRef } from '../../BaseElementTypes';
import { _elementValues } from '../../ElementValues';
import { TextInput } from 'react-native';

interface UseBtRefProps {
  btRef?: ForwardedRef<BTRef>;
  textInputRef: RefObject<TextInput>;
  id: string;
  setTextInputValue: Dispatch<SetStateAction<string>>;
}

export const useBtRef = ({
  btRef,
  textInputRef,
  id,
  setTextInputValue,
}: UseBtRefProps) => {
  useEffect(() => {
    const newBtRef = {
      id,
      format: (plaintextValue: string) => plaintextValue,
      clear: () => {
        textInputRef?.current?.clear();
      },
      focus: () => {
        textInputRef?.current?.focus();
      },
      blur: () => {
        textInputRef?.current?.blur();
      },
      setValue: (inputBtRef: InputBTRef) => {
        const elementValue = _elementValues[inputBtRef.id];
        const newTextInputValue = inputBtRef.format(
          typeof elementValue === 'string'
            ? elementValue
            : JSON.stringify(elementValue)
        );
        setTextInputValue(newTextInputValue);
      },
    };

    if (typeof btRef === 'function') {
      btRef(newBtRef);
    } else if (btRef && typeof btRef === 'object') {
      // eslint-disable-next-line no-param-reassign
      btRef.current = newBtRef;
    }
  }, [btRef, textInputRef, id]);
};
