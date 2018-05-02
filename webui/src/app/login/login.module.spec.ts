import { LoginModule } from '.././app.module';

describe('LoginModule', () => {
    let loginModule: LoginModule;

    beforeEach(() => {
        loginModule = new LoginModule();
    });

    it('should create an instance', () => {
        expect(loginModule).toBeTruthy();
    });
});
