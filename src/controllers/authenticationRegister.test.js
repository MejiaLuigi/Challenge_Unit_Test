const { register } = require('./authentication');
const { getUsersByEmail, createUser } = require('../db/users');
const { authentication, random } = require('../helpers');

jest.mock('../db/users');
jest.mock('../helpers');

describe('register', () => {
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
            sendStatus: jest.fn()
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('debería devolver 400 si el email o la contraseña faltan', async () => {
        req.body.email = '';
        await register(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'email or password' });
    });

    it('debería devolver 400 si el usuario ya existe', async () => {
        getUsersByEmail.mockResolvedValue({ id: 1 });
        await register(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'User already exists' });
    });

    it('debería crear un nuevo usuario y devolver 200', async () => {
        getUsersByEmail.mockResolvedValue(null);
        random.mockReturnValue('salt');
        authentication.mockReturnValue('hashedPassword');
        createUser.mockResolvedValue({ id: 1, email: 'test@example.com' });

        await register(req, res);
        expect(getUsersByEmail).toHaveBeenCalledWith('test@example.com');
        expect(createUser).toHaveBeenCalledWith({
            email: 'test@example.com',
            authentication: {
                salt: 'salt',
                password: 'hashedPassword'
            }
        });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ id: 1, email: 'test@example.com' });
    });

    it('debería devolver 500 si ocurre un error', async () => {
        getUsersByEmail.mockRejectedValue(new Error('Database error'));
        await register(req, res);
        expect(res.sendStatus).toHaveBeenCalledWith(500);
    });
});

