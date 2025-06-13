import { describe, it, expect, beforeEach, vi } from 'vitest';

const fromMock = vi.fn();
const supabaseMock = { from: fromMock };

vi.mock('../../src/config/supabaseClient.js', () => ({
    default: {
        getClient: () => supabaseMock
    }
}));

import { getTasks, createTask } from '../../src/controllers/taskController.js';
import * as taskService from '../../src/services/taskService.js';

describe('taskController', () => {
    let req, res;

    beforeEach(() => {
        req = { user: { id: 'u1' }, body: {}, params: { id: '1' } };
        res = {
            json: vi.fn(),
            status: vi.fn().mockReturnThis(),
            send: vi.fn()
        };
        vi.resetAllMocks();
    });

    describe('getTasks', () => {
        it('responde con el array de tareas', async () => {
            vi.spyOn(taskService, 'getTasksByUser').mockResolvedValue([{ id: 't1' }]);
            await getTasks(req, res);

            expect(taskService.getTasksByUser).toHaveBeenCalledWith('u1');
            expect(res.json).toHaveBeenCalledWith([{ id: 't1' }]);
        });

        it('maneja errores correctamente', async () => {
            vi.spyOn(taskService, 'getTasksByUser').mockRejectedValue({ status: 400, message: 'fail' });
            await getTasks(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'fail' });
        });
    });

    describe('createTask', () => {
        it('responde con la tarea creada al tener éxito', async () => {
            req.body = { title: 'Title' };
            vi.spyOn(taskService, 'createTask').mockResolvedValue({ id: 't2' });

            await createTask(req, res);

            expect(taskService.createTask).toHaveBeenCalledWith({
                userId: 'u1',
                title: 'Title',
                description: null,
                category_id: null
            });
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ id: 't2' });
        });

        it('devuelve 400 si falta el título', async () => {
            req.body = { title: '' };
            await createTask(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Title is required.' });
        });
    });
});
