import { compose } from 'ramda';
import {
  Dispatch,
  ForwardedRef,
  RefObject,
  SetStateAction,
  useEffect,
} from 'react';
import { TextInput } from 'react-native';
import {
  BTRef,
  InputBTRef,
  InputBtDateRef,
  ValueSetter,
} from '../../BaseElementTypes';
import { _elementValues } from '../../ElementValues';

interface UseBtRefProps {
  btRef?: ForwardedRef<BTRef>;
  textInputRef: RefObject<TextInput>;
  id: string;
  setTextInputValue: Dispatch<SetStateAction<string>>;
}

type CreateBtRefArgs = {
  valueSetter: ValueSetter;
} & Omit<UseBtRefProps, 'setTextInputValue' | 'btRef'>;

const createBtRef = ({ id, textInputRef, valueSetter }: CreateBtRefArgs) => ({
  id,
  format: (plaintextValue: string) => plaintextValue,
  clear: () => textInputRef?.current?.clear(),
  focus: () => textInputRef?.current?.focus(),
  blur: () => textInputRef?.current?.blur(),
  setValue: valueSetter,
});

const formatValue = (ref: InputBTRef) => {
  const value = _elementValues[ref.id];
  return ref.format(typeof value === 'string' ? value : JSON.stringify(value));
};

const updateRef = (btRef: ForwardedRef<BTRef>, newBtRef: BTRef) => {
  if (typeof btRef === 'function') {
    btRef(newBtRef);
  } else if (btRef && typeof btRef === 'object') {
    btRef.current = newBtRef;
  }
};

const isInputBtDateRef = (
  ref: InputBTRef | InputBtDateRef
): ref is InputBtDateRef =>
  Boolean((ref as InputBtDateRef).month && (ref as InputBtDateRef).year);

const valueFormatter = (ref: InputBTRef | InputBtDateRef | undefined) => {
  if (!ref) return '';

  if (isInputBtDateRef(ref)) {
    const month = formatValue(ref.month).padStart(2, '0');
    const year = formatValue(ref.year).slice(-2);

    return `${month}/${year}`;
  }

  return formatValue(ref);
};

export const useBtRef = ({
  btRef,
  textInputRef,
  id,
  setTextInputValue,
}: UseBtRefProps) => {
  useEffect(() => {
    const valueSetter = compose(setTextInputValue, valueFormatter);

    const newBtRef = createBtRef({ id, textInputRef, valueSetter });

    updateRef(btRef!!, newBtRef);
  }, [btRef, textInputRef, id]);
};
