import { sum } from '@/shared/math';
import type { Encrypted, EncryptedRes, GameShape, Outcome } from '@/solutions/day-02/solution';
import {
  $encryptedRounds,
  outcomeScore,
  reqCode,
  shapes,
  shapeScore
} from '@/solutions/day-02/solution';

type RoundOutcome = [GameShape, Outcome];

const loseShapes = Object.fromEntries(
  Object.entries(shapes).map(([key, value]) => [value, key])
) as Record<GameShape, GameShape>;
const resAsOutcome: Record<EncryptedRes, Outcome> = { X: 'lose', Y: 'draw', Z: 'win' };

const decryptAsOutcome = ([req, res]: Encrypted): RoundOutcome => [reqCode[req], resAsOutcome[res]];
const restoreRoundScore = ([req, outcome]: RoundOutcome) => {
  const res = outcome === 'lose' ? shapes[req] : outcome === 'draw' ? req : loseShapes[req];

  return shapeScore[res] + outcomeScore[outcome];
};

export const $roundsOutcome = $encryptedRounds.map(rounds => rounds.map(decryptAsOutcome));
export const $restoredRoundsScore = $roundsOutcome.map(rounds => rounds.map(restoreRoundScore));
export const $restoredTotalScore = $restoredRoundsScore.map(sum);
