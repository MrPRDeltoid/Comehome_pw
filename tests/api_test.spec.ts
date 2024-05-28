import { test, expect } from '@playwright/test';


test.describe('API tests for reqres.in', () => {

    const base_url = 'https://reqres.in/api'
    
    test('API GET request', async({ request }) => {
        const res_raw = await request.get(`${base_url}/users/2`);
        expect(res_raw.status()).toBe(200);
        // Assert json contents
        const res_json = await res_raw.json()
        expect(res_json['data']['email']).toBe('janet.weaver@reqres.in');
        expect(res_json['data']['first_name']).toBe('Janet');
        expect(res_json['data']['last_name']).toBe('Weaver');
    });

    test('API POST request', async({ request }) => {
        const req_body = {
            "name": "morpheus",
            "job": "leader"
        }
        const res_raw = await request.post(`${base_url}/users`, {data: req_body});
        expect(res_raw.status()).toBe(201);
        // Assert json content
        const res_json = await res_raw.json();
        expect(res_json['name']).toBe(req_body['name']);
        expect(res_json['job']).toBe(req_body['job']);
    });

    test('API PUT request', async({ request }) => {
        const req_body = {
            "name": "morpheus",
            "job": "zion resident"
        }
        const res_raw = await request.put(`${base_url}/users/2`, {data: req_body});
        expect(res_raw.status()).toBe(200);
        // Assert json content
        const res_json = await res_raw.json();
        expect(res_json['name']).toBe(req_body['name']);
        expect(res_json['job']).toBe(req_body['job']);
        expect(res_json['updatedAt']).toBeDefined();
    });

    test('API DELETE request', async({ request }) => {
        const res_raw = await request.delete(`${base_url}/users/2`);
        expect(res_raw.status()).toBe(204);
    })
});