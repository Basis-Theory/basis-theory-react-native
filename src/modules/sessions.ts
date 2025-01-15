import type { BasisTheory as BasisTheoryType } from '@basis-theory/basis-theory-js/types/sdk';

export const Sessions = (bt: BasisTheoryType) => {
  const create = async () => {
    try {
      const session = await bt.sessions.create();

      return session;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    create,
  };
};
