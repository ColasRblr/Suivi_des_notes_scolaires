import { isValidValue, isValidDate, isDateBeforeToday, isValidComment, isValidGradeType, isValidGradeSubject } from '../js/controller';

describe('isValidGrade', () => {
    // Validate value of grade
    it('should return true for a number between 0 and 20', () => {
        expect(isValidValue(14)).toEqual(true);
        expect(isValidValue(0)).toEqual(true);
        expect(isValidValue(20)).toEqual(true);
    });

    it('should return false for an invalid value', () => {
        expect(isValidValue(-1)).toBe(false);
        expect(isValidValue(25)).toBe(false);
        expect(isValidValue('abc')).toBe(false);
    });

    // Validate date of grade
    it('should return true for a date with this format AAAA-MM-JJ', () => {
        expect(isValidDate("2023-01-04")).toEqual(true);
    });

    it('should return false for an invalid date', () => {
        expect(isValidDate("2023-01-44")).toEqual(false);
        expect(isValidDate("2023-22-20")).toEqual(false);
        expect(isValidDate("23-01-20")).toEqual(false);
    });


    it('should return true for a date before or equal to today', () => {
        expect(isDateBeforeToday("2023-01-04")).toEqual(true);
    });

    it('should return true for a date before or equal to today', () => {
        expect(isDateBeforeToday("2060-01-04")).toEqual(false);
    });

    // Validate grade's comment
    it('should return true if comment doesn\'t contain =+*%\'"[{(', () => {
        expect(isValidComment("Bonjour ! Comment allez-vous ?")).toEqual(true);
    });

    it('should return false if comment contain =+*%\'"[{(', () => {
        expect(isValidComment("Bonjour = Comment allez-vous ?")).toEqual(false);
        expect(isValidComment("Bonjour + Comment allez-vous ?")).toEqual(false);
        expect(isValidComment("Bonjour *")).toEqual(false);
        expect(isValidComment("Bonjour %")).toEqual(false);
        expect(isValidComment("Bonjour \"")).toEqual(false);
        expect(isValidComment("Bonjour []")).toEqual(false);
    });

    // Validate grade's type
    it('should return true if grade\'s type is oral or écrit', () => {
        expect(isValidGradeType("oral")).toEqual(true);
        expect(isValidGradeType("écrit")).toEqual(true);
    });

    it('should return false if grade\'s type is not oral or écrit', () => {
        expect(isValidGradeType("hello")).toEqual(false);
        expect(isValidGradeType(2)).toEqual(false);
    });

    // Validate grade's subject
    it('should return true if grade\'s subject is Histoire or Anglais or Physique or Français or Mathématiques', () => {
        expect(isValidGradeSubject("Histoire")).toEqual(true);
        expect(isValidGradeSubject("Anglais")).toEqual(true);
        expect(isValidGradeSubject("Physique")).toEqual(true);
        expect(isValidGradeSubject("Français")).toEqual(true);
        expect(isValidGradeSubject("Mathématiques")).toEqual(true);
    });

    it('should return false if grade\'s subject isn\'t Histoire or Anglais or Physique or Français or Mathématiques', () => {
        expect(isValidGradeSubject("Sport")).toEqual(false);
        expect(isValidGradeSubject(2)).toEqual(false);
        expect(isValidGradeSubject("Histoire Anglais")).toEqual(false);
    });
});