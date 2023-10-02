import { isValidMail } from '../js/controller.js';

describe('isEmail', () => {
    it('should be a valid email', () => {
        expect(isValidMail("lola.dupont@outlook.com")).toEqual(true);
    });

});