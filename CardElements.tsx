import React, {
  ForwardedRef,
  useState,
  useRef,
  useEffect,
  Component,
} from 'react';
import uuid from 'react-native-uuid';
import {StyleProp, TextInput, TextStyle} from 'react-native';
import {BasisTheoryElements} from './BasisTheoryElements';

interface CommonBTRefFunctions {
  clear: () => void;
  focus: () => void;
  // other common element methods
}

interface BTRefBase {
  id: string;
  format: (plaintextValue: string) => string;
}

export interface BTRef extends BTRefBase, CommonBTRefFunctions {}

export interface BTDateRef extends CommonBTRefFunctions {
  month: () => BTRefBase;
  year: () => BTRefBase;
}

/*
need to check that getting an instance of one of the parent elements won't allow
getting the value of a child element
 */

interface CardDateExpirationProps {
  btDateRef: ForwardedRef<BTDateRef>;
  style: StyleProp<TextStyle>;
}

export const CardDateExpirationElement = ({
  btDateRef,
  style,
}: CardDateExpirationProps) => {
  const ref = useRef<TextInput>(null);
  const [id] = useState(uuid.v4() as string);
  /*
  React will call the ref callback with the DOM element when the component mounts, and call it with null when it unmounts.
  Refs are guaranteed to be up-to-date before componentDidMount or componentDidUpdate fires.
  TODO: need to implement the above??
   */

  useEffect(() => {
    const newBtDateRef = {
      clear: () => {
        ref.current?.clear();
      },
      focus: () => {
        ref.current?.focus();
      },
      // this could contain a callback that takes in the value and returns the formatted value. NEED TO CHECK IF THIS LEAKS THE VALUE
      month: () => ({
        id,
        format: (plaintextValue: string) => plaintextValue,
      }),
      year: () => ({
        id,
        format: (plaintextValue: string) => plaintextValue,
      }),
    };

    if (typeof btDateRef === 'function') {
      // TODO: throw error? possibly switch to something other than a Ref
      btDateRef(newBtDateRef);
    } else if (btDateRef && typeof btDateRef === 'object') {
      btDateRef.current = newBtDateRef;
    }
  }, [btDateRef, id, ref]);

  return (
    <TextInput
      ref={ref}
      onChangeText={newValue =>
        BasisTheoryElements.updateElementValue(id, newValue)
      }
      style={style}
      value={'testing'}
    />
  );
};

interface CardNumberProps {
  btRef: ForwardedRef<BTRef>;
  style: StyleProp<TextStyle>;
}

export class CardNumberElementClass extends Component<CardNumberProps> {
  private ref: React.RefObject<TextInput>;
  private readonly id: string;
  #value: string;

  constructor(props: CardNumberProps) {
    super(props);
    this.ref = React.createRef();
    this.id = uuid.v4() as string;
    this.#value = '';
  }

  #testFunction() {
    console.log('test function real deal');
  }

  componentDidMount() {
    const {btRef} = this.props;

    const newBtRef = {
      id: this.id,
      format: (plaintextValue: string) => plaintextValue,
      clear: () => {
        this.ref.current?.clear();
      },
      focus: () => {
        this.ref.current?.focus();
      },
    };

    if (typeof btRef === 'function') {
      btRef(newBtRef);
    } else if (btRef && typeof btRef === 'object') {
      btRef.current = newBtRef;
    }
  }

  render() {
    const {style} = this.props;

    return (
      <TextInput
        ref={this.ref}
        onChangeText={newValue =>
          BasisTheoryElements.updateElementValue(this.id, newValue)
        }
        style={style}
      />
    );
  }
}

export const CardNumberElement = ({btRef, style}: CardNumberProps) => {
  const ref = useRef<TextInput>(null);
  const [id] = useState(uuid.v4() as string);
  /*
  React will call the ref callback with the DOM element when the component mounts, and call it with null when it unmounts.
  Refs are guaranteed to be up-to-date before componentDidMount or componentDidUpdate fires.
  TODO: need to implement the above??
   */

  useEffect(() => {
    const newBtRef = {
      id,
      format: (plaintextValue: string) => plaintextValue,
      clear: () => {
        ref.current?.clear();
      },
      focus: () => {
        ref.current?.focus();
      },
    };

    if (typeof btRef === 'function') {
      btRef(newBtRef);
    } else if (btRef && typeof btRef === 'object') {
      btRef.current = newBtRef;
    }
  }, [btRef, ref, id]);

  return (
    <TextInput
      ref={ref}
      onChangeText={newValue =>
        BasisTheoryElements.updateElementValue(id, newValue)
      }
      style={style}
    />
  );
};
