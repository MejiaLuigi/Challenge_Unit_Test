const { login } = require('./authentication');
const { getUsersByEmail } = require('../db/users');
const { authentication, random } = require('../helpers');

jest.mock('../db/users');
jest.mock('../helpers');

describe('login', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {
                email: 'test@example.com',
                password: 'password123'
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            sendStatus: jest.fn(),
            cookie: jest.fn()
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('debería devolver 401 si el email o la contraseña faltan', async () => {
        req.body.email = '';
        req.body.password = 'password123';
        await login(req, res);
        expect(res.sendStatus).toHaveBeenCalledWith(401);

        req.body.email = 'test@example.com';
        req.body.password = '';
        await login(req, res);
        expect(res.sendStatus).toHaveBeenCalledWith(401);
    });

    it('debería devolver 400 si el usuario no existe', async () => {
        getUsersByEmail.mockResolvedValue(null);
        await login(req, res);
        expect(res.sendStatus).toHaveBeenCalledWith(400);
    });

    it('debería devolver 400 si la contraseña es incorrecta', async () => {
        const mockUser = {
            authentication: {
                salt: 'randomSalt',
                password: 'hashedPassword'
            }
        };
        getUsersByEmail.mockResolvedValue(mockUser);
        authentication.mockReturnValue('wrongHash');

        await login(req, res);
        expect(res.sendStatus).toHaveBeenCalledWith(400);
    });

    it('debería iniciar sesión correctamente con credenciales válidas', async () => {
        const mockUser = {
            _id: 'userId',
            authentication: {
                salt: 'randomSalt',
                password: 'hashedPassword',
                sessionToken: 'sessionToken'
            },
            save: jest.fn().mockResolvedValue(true)
        };
        getUsersByEmail.mockResolvedValue(mockUser);
        authentication.mockImplementation((salt, data) => {
            if (salt === 'randomSalt') return 'hashedPassword';
            return 'newSessionToken';
        });
        random.mockReturnValue('newRandomSalt');

        await login(req, res);
// Se espera que la función login establezca la cookie de sesión correctamente
expect(res.cookie).toHaveBeenCalledWith('JAMES-REST-API', 'newSessionToken', { domain: 'localhost', path: '/' });

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockUser);
    });

    it('debería manejar errores inesperados', async () => {
        getUsersByEmail.mockRejectedValue(new Error('Database error'));
        await login(req, res);
        expect(res.sendStatus).toHaveBeenCalledWith(500);
    });
});
