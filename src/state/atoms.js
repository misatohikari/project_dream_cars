// atoms.js
import { atom } from 'jotai';

export const carsAtom = atom([]);
export const selectedCarAtom = atom(null);

export const userAtom = atom(null);
export const isAuthenticatedAtom = atom((get) => !!get(userAtom));

export const favoriteAtom = atom([]);
export const searchHistoryAtom = atom([]);

