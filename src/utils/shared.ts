import { replace } from 'ramda';

export const extractDigits = (value: string = ''): string | undefined =>
  value ? replace(/\D+/gu, '', value) : undefined;
