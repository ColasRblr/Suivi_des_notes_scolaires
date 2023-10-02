import { average } from '../js/controller.js';

describe('isValidAverage', () => {
    // Validate average
    it('should return true if average is valid', () => {
        expect(average(28, 3)).toEqual(9.33);
    });

});