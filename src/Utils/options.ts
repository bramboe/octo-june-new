import { readFileSync } from 'fs';

<<<<<<< HEAD
export type Type = 'octo';
=======
export type Type =
  | 'sleeptracker'
  | 'ergomotion'
  | 'ergowifi'
  | 'richmat'
  | 'linak'
  | 'solace'
  | 'motosleep'
  | 'reverie'
  | 'leggettplatt'
  | 'logicdata'
  | 'okimat'
  | 'keeson'
  | 'octo'
  | 'scanner';
>>>>>>> a077a20 (Initial Octo-only version: removed all beds except Octo, updated metadata, and cleaned up project.)

interface OptionsJson {
  type: Type;
}

const fileContents = readFileSync('../data/options.json');
const options: OptionsJson = JSON.parse(fileContents.toString());
export const getRootOptions = (): any => options;

export const getType = () => options.type;
