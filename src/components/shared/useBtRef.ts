import { compose } from 'ramda';
import type { Dispatch, ForwardedRef, RefObject, SetStateAction } from 'react';
import { useEffect } from 'react';
import type { TextInput } from 'react-native';
import type {
  BTDateRef,
  BTRef,
  InputBtDateRefReveal,
  InputBTRef,
  ValueSetter,
} from '../../BaseElementTypes';
import { ElementType } from '../../BaseElementTypes';
import { _elementValues } from '../../ElementValues';

type UseBtRefProps = {
  btRef?: ForwardedRef<BTDateRef | BTRef>;
  elementRef: RefObject<TextInput>;
  id: string;
  setElementValue: Dispatch<SetStateAction<string>>;
  type?: ElementType;
};

type CreateBtRefArgs = Omit<UseBtRefProps, 'btRef' | 'setElementValue'> & {
  valueSetter: ValueSetter;
};

const createBTDateRef = ({ id }: { id: string }) => ({
  month: () => ({
    id,
    datepart: 'month',
    format: (plaintextValue: string) => plaintextValue,
  }),
  year: () => ({
    id,
    datepart: 'year',
    format: (plaintextValue: string) => plaintextValue,
  }),
});

const createBtRef = ({
  id,
  elementRef,
  valueSetter,
  type,
}: CreateBtRefArgs) => ({
  id,
  format: (plaintextValue: string) => plaintextValue,
  clear: () => {
    delete _elementValues[id];
    elementRef.current?.clear();
  },
  focus: () => elementRef.current?.focus(),
  blur: () => elementRef.current?.blur(),
  setValue: valueSetter,
  ...(type === ElementType.EXPIRATION_DATE
    ? createBTDateRef({ id })
    : undefined),
});

const formatValue = (ref: InputBTRef) => {
  const value = _elementValues[ref.id];

  return ref.format(typeof value === 'string' ? value : JSON.stringify(value));
};

const updateRef = (btRef: ForwardedRef<BTRef>, newBtRef: BTRef) => {
  if (typeof btRef === 'function') {
    btRef(newBtRef);
  } else if (btRef && typeof btRef === 'object') {
    // eslint-disable-next-line no-param-reassign
    btRef.current = newBtRef;
  }
};

const isInputBtDateRef = (
  ref: InputBtDateRefReveal | InputBTRef
): ref is InputBtDateRefReveal =>
  Boolean(
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    (ref as InputBtDateRefReveal).month && (ref as InputBtDateRefReveal).year
  );

const valueFormatter = (ref: InputBtDateRefReveal | InputBTRef | undefined) => {
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
  elementRef,
  id,
  type,
  setElementValue,
}: UseBtRefProps) => {
  useEffect(() => {
    const valueSetter = compose(setElementValue, valueFormatter);

    const newBtRef = createBtRef({
      id,
      elementRef,
      valueSetter,
      type,
    });

    updateRef(btRef!, newBtRef);
  }, [btRef, elementRef, id]);
};
