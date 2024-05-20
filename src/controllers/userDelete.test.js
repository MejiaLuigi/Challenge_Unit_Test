// UserDelete.test.js
const { UserDelete } = require('./userDelete'); // Reemplaza con la ruta correcta
const { deleteUserById } = require('../db/users');

jest.mock('../db/users'); // Simula el módulo de usuarios

describe('UserDelete', () => {
    let req, res;

    beforeEach(() => {
        req = { params: { id: '123' } };
        res = {
            json: jest.fn(),
            sendStatus: jest.fn()
        };
    });

    it('should delete a user and return the deleted user', async () => {
        const mockDeletedUser = { id: '123', name: 'John Doe' };
        deleteUserById.mockResolvedValue(mockDeletedUser);

        await UserDelete(req, res);

        expect(deleteUserById).toHaveBeenCalledWith('123');
        expect(res.json).toHaveBeenCalledWith(mockDeletedUser);
        expect(res.sendStatus).not.toHaveBeenCalled();
    });

    it('should return 400 if an error occurs', async () => {
        deleteUserById.mockRejectedValue(new Error('Failed to delete user'));

        await UserDelete(req, res);

        expect(deleteUserById).toHaveBeenCalledWith('123');
        expect(res.sendStatus).toHaveBeenCalledWith(400);
        expect(res.json).not.toHaveBeenCalled();
    });
});
