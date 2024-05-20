const { getAllUsers } = require('./users');
const { getUsers } = require('../db/users');

jest.mock('../db/users');

describe('getAllUsers', () => {
    const mockUsers = [{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }];

    beforeEach(() => {
        getUsers.mockClear();
    });

    test('should return all users when getUsers succeeds', async () => {
        getUsers.mockResolvedValueOnce(mockUsers);

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const next = jest.fn();

        await getAllUsers(req, res, next);

        expect(getUsers).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockUsers);
        expect(next).not.toHaveBeenCalled();
    });

    test('should handle error when getUsers fails', async () => {
        const mockError = new Error('Database error');
        getUsers.mockRejectedValueOnce(mockError);

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const next = jest.fn();

        await getAllUsers(req, res, next);

        expect(getUsers).toHaveBeenCalledTimes(1);
        expect(console.error).toHaveBeenCalledWith(mockError);
        expect(res.status).toHaveBeenCalledWith(400); // Correct status code for error
        expect(res.json).not.toHaveBeenCalled();
        expect(next).not.toHaveBeenCalled();
    });
});
