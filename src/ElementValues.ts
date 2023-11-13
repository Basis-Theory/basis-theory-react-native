import { type PrimitiveType } from './BaseElementTypes';

/**
 * If `_elementValues` requires any modification, we should start looking for a better state management solution.
 */
const _elementValues: Record<string, PrimitiveType> = {};

/**
 * `_elementErrors` are used to validate the payload before it's sent to the API. If not empty the request won't be made.
 * If these require any modification we should start looking for a better state management solution.
 */
const _elementErrors: Record<string, string | undefined> = {};

export { _elementErrors, _elementValues };
