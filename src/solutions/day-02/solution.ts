import { createStore } from 'effector';
import { sum } from '@/shared/math';

type Outcome = keyof typeof outcomeScore;
type GameShape = keyof typeof shapes;
type GameRound = [GameShape, GameShape];
type Encrypted = [keyof typeof reqCode, keyof typeof resCode];

const shapes = {
  rock: 'scissors',
  paper: 'rock',
  scissors: 'paper'
} as const;

const shapeScore = { rock: 1, paper: 2, scissors: 3 };
const outcomeScore = { lose: 0, draw: 3, win: 6 } satisfies Record<string, number>;

const reqCode = { A: 'rock', B: 'paper', C: 'scissors' } satisfies Record<string, GameShape>;
const resCode = { X: 'rock', Y: 'paper', Z: 'scissors' } satisfies Record<string, GameShape>;

const decrypt = ([req, res]: Encrypted): GameRound => [reqCode[req], resCode[res]];
const isWon = ([req, res]: GameRound) => shapes[res] === req;
const getRoundOutcome = ([req, res]: GameRound): Outcome =>
  isWon([req, res]) ? 'win' : isWon([res, req]) ? 'lose' : 'draw';
const getRoundTotalScore = ([req, res]: GameRound) =>
  outcomeScore[getRoundOutcome([req, res])] + shapeScore[res];

export const $encryptedRounds = createStore<Encrypted[]>([], { sid: '$encryptedRounds' });
export const $rounds = $encryptedRounds.map(encrypted => encrypted.map(decrypt));
export const $roundsScore = $rounds.map(rounds => rounds.map(getRoundTotalScore));
export const $totalScore = $roundsScore.map(sum);
