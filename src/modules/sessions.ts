import type {
  BasisTheory as BasisTheoryType,
  CreateSessionResponse,
} from '@basis-theory/basis-theory-js/types/sdk';

export const Sessions = (bt: BasisTheoryType) => {
  const create = async (apiKey?: string): Promise<CreateSessionResponse> => {
    return bt.sessions.create({
      apiKey,
    });
  };

  return {
    create,
  };
};
