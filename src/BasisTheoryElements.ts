export class BasisTheoryElements {
  public static apiKey: string = '';
  static #_elementValues: Record<string, string> = {};

  constructor() {}

  public static updateElementValue(elementId: string, value: string): void {
    BasisTheoryElements.#_elementValues[elementId] = value;
  }
}
