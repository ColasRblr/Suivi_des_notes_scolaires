import 'isomorphic-fetch';
import fs from 'fs';
import path from 'path';

test('real fetch call', async () => {
    const filePath = path.resolve(__dirname, '../server/grades.json');
    const fileContents = await fs.promises.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContents);

    expect(data[0]).toHaveProperty('id');
    expect(data[0]).toHaveProperty('value');
    expect(data[0]).toHaveProperty('date');
    expect(data[0]).toHaveProperty('type');
    expect(data[0]).toHaveProperty('coef');
    expect(data[0]).toHaveProperty('id_student');
    expect(data[0]).toHaveProperty('subject');
    expect(data[0]).toHaveProperty('comments');

    expect(data[0]).not.toHaveProperty('student');
});
