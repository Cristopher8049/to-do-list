import { describe, it, expect, beforeEach, vi } from 'vitest';

const fromMock = vi.fn();
const supabaseMock = { from: fromMock };

vi.mock('../../src/config/supabaseClient.js', () => ({
    default: {
        getClient: () => supabaseMock
    }
}));

import { getTasksByUser, createTask } from '../../src/services/taskService.js';

describe('taskService', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    describe('getTasksByUser', () => {
        it('devuelve datos cuando no hay error', async () => {
            fromMock.mockReturnValue({
                select: () => ({
                    eq: () => ({
                        order: () => ({ data: [{ id: '1', title: 'Test' }], error: null })
                    })
                })
            });

            const result = await getTasksByUser('user-123');
            expect(result).toEqual([{ id: '1', title: 'Test' }]);
            expect(fromMock).toHaveBeenCalledWith('tasks');
        });

        it('lanza error cuando supabase devuelve error', async () => {
            fromMock.mockReturnValue({
                select: () => ({
                    eq: () => ({
                        order: () => ({ data: null, error: { message: 'fail' } })
                    })
                })
            });

            await expect(getTasksByUser('user-123')).rejects.toEqual({ message: 'fail' });
        });
    });

    describe('createTask', () => {
        it('inserta y devuelve la nueva tarea', async () => {
            fromMock.mockReturnValue({
                insert: () => ({
                    select: () => ({
                        single: () => ({ data: { id: '2', title: 'New' }, error: null })
                    })
                })
            });

            const payload = { userId: 'u', title: 'New', description: null, category_id: null };
            const out = await createTask(payload);

            expect(out).toEqual({ id: '2', title: 'New' });
            expect(fromMock).toHaveBeenCalledWith('tasks');
        });

        it('lanza error si falla el insert', async () => {
            fromMock.mockReturnValue({
                insert: () => ({
                    select: () => ({
                        single: () => ({ data: null, error: { message: 'insert fail' } })
                    })
                })
            });

            await expect(createTask({ userId: 'u', title: 'Fail', description: null, category_id: null }))
                .rejects.toEqual({ message: 'insert fail' });
        });
    });
});
