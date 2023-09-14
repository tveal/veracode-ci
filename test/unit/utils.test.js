import 'mocha';
import { expect } from 'chai';

import utils from '../../src/utils';

describe('utils.js', () => {
  describe('parseStringToArray', () => {
    it('should parse string with escaped commas properly', () => {
      const arr = utils.parseStringToArray(
        'node_modules,node_modules/**/*,!{lib/**\\,package.json\\,package-lock.json},**/*.test.js',
      );
      expect(arr).to.deep.equal([
        'node_modules',
        'node_modules/**/*',
        '!{lib/**,package.json,package-lock.json}',
        '**/*.test.js',
      ]);
    });
  });
});
