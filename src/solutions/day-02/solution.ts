import { createStore } from 'effector';
import { sum } from '@/shared/math';

export type Outcome = keyof typeof outcomeScore;
export type GameShape = keyof typeof shapes;
export type GameRound = [GameShape, GameShape];
export type Encrypted = [EncryptedReq, EncryptedRes];
export type EncryptedReq = keyof typeof reqCode;
export type EncryptedRes = keyof typeof resCode;

export const shapes = {
  rock: 'scissors',
  paper: 'rock',
  scissors: 'paper'
} as const;

export const shapeScore = { rock: 1, paper: 2, scissors: 3 };
export const outcomeScore = { lose: 0, draw: 3, win: 6 } satisfies Record<string, number>;

export const reqCode = { A: 'rock', B: 'paper', C: 'scissors' } satisfies Record<string, GameShape>;
export const resCode = { X: 'rock', Y: 'paper', Z: 'scissors' } satisfies Record<string, GameShape>;

const decrypt = ([req, res]: Encrypted): GameRound => [reqCode[req], resCode[res]];
const getRoundOutcome = ([req, res]: GameRound): Outcome =>
  req === res ? 'draw' : shapes[res] === req ? 'win' : 'lose';
const getRoundTotalScore = ([req, res]: GameRound) =>
  outcomeScore[getRoundOutcome([req, res])] + shapeScore[res];

export const $encryptedRounds = createStore<Encrypted[]>([], { sid: '$encryptedRounds' });
export const $rounds = $encryptedRounds.map(encrypted => encrypted.map(decrypt));
export const $roundsScore = $rounds.map(rounds => rounds.map(getRoundTotalScore));
export const $totalScore = $roundsScore.map(sum);
