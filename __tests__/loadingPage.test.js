import httpServer from 'http-server'; // module npm pour démarrer un serveur local
import { Builder } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome';

describe('test du chargement d\'une page', () => {
    let driver;
    let server;

    beforeAll(async () => {
        jest.setTimeout(15000); // augmenter le timeout pour les tests Selenium
        // Démarrer le serveur local
        server = httpServer.createServer({
            root: '.././Suivi_des_notes_scolaires' // le dossier contenant le site web
        });
        server.listen(8080); // le port sur lequel le serveur est écouté

        // Configurer Selenium
        const options = new Options();
        options.addArguments('--headless'); // pour exécuter le navigateur en mode headless
        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
    });

    afterAll(async () => {
        await driver.quit();
        // Arrêter le serveur local
        server.close();
    });

    test('success loading page', async () => {
        await driver.get('http://localhost:8080/index.html'); // l'URL du site local
        const title = await driver.getTitle();
        expect(title).toEqual('Connexion');
        expect(title).not.toEqual('Connection');
    });
});
