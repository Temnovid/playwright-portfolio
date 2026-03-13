import { test, expect } from '@playwright/test';

const BASE = 'https://reqres.in/api';

test.describe('Reqres API – Users', () => {

  test('GET /users returns a list of users', async ({ request }) => {
    const res = await request.get(`${BASE}/users?page=1`);
    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(body).toHaveProperty('data');
    expect(body.data.length).toBeGreaterThan(0);
    expect(body.data[0]).toMatchObject({
      id: expect.any(Number),
      email: expect.stringContaining('@'),
      first_name: expect.any(String),
    });
  });

  test('GET /users/:id returns a single user', async ({ request }) => {
    const res = await request.get(`${BASE}/users/2`);
    expect(res.status()).toBe(200);

    const { data } = await res.json();
    expect(data.id).toBe(2);
    expect(data.email).toBeTruthy();
  });

  test('GET /users/:id returns 404 for unknown user', async ({ request }) => {
    const res = await request.get(`${BASE}/users/9999`);
    expect(res.status()).toBe(404);
  });

  test('POST /users creates a new user', async ({ request }) => {
    const payload = { name: 'Jan Kowalski', job: 'QA Engineer' };
    const res = await request.post(`${BASE}/users`, { data: payload });
    expect(res.status()).toBe(201);

    const body = await res.json();
    expect(body.name).toBe(payload.name);
    expect(body.job).toBe(payload.job);
    expect(body.id).toBeTruthy();
    expect(body.createdAt).toBeTruthy();
  });

  test('PUT /users/:id updates a user', async ({ request }) => {
    const payload = { name: 'Jan Kowalski', job: 'Senior QA Engineer' };
    const res = await request.put(`${BASE}/users/2`, { data: payload });
    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(body.job).toBe(payload.job);
    expect(body.updatedAt).toBeTruthy();
  });

  test('DELETE /users/:id returns 204', async ({ request }) => {
    const res = await request.delete(`${BASE}/users/2`);
    expect(res.status()).toBe(204);
  });
});