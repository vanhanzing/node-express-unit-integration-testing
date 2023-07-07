const request = require('supertest');
const app = require('../../app');
const newTodo = require('../mock-data/new-todo.json');

const endpointUrl = '/todos/';
let firstTodo, newTodoId;
let nonExistingTodoId = '64a557b61596389608d6431e';
const testData = {
  title: 'Make integration test for PUT',
  done: true,
};

describe(endpointUrl, () => {
  test(
    'GET' + endpointUrl,
    async () => {
      const response = await request(app).get(endpointUrl);
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body[0].title).toBeDefined();
      expect(response.body[0].done).toBeDefined();
      firstTodo = response.body[0];
    },
    7000
  );
  test(
    'GET by ID' + endpointUrl + ':todoId',
    async () => {
      const response = await request(app).get(endpointUrl + firstTodo._id);
      expect(response.statusCode).toBe(200);
      expect(response.body.title).toBe(firstTodo.title);
      expect(response.body.done).toBe(firstTodo.done);
    },
    7000
  );
  test('GET todo id doesnt exist ' + endpointUrl + ':todoId', async () => {
    const response = await request(app).get(
      endpointUrl + '64a556edcb1614fe12c70876'
    );
    expect(response.statusCode).toBe(404);
    expect(response.body).toStrictEqual({
      message: 'Todo not found!',
    });
  });
  it(
    'POST' + endpointUrl,
    async () => {
      const response = await request(app).post(endpointUrl).send(newTodo);
      expect.assertions(3);
      expect(response.statusCode).toBe(201);
      expect(response.body.title).toBe(newTodo.title);
      expect(response.body.done).toBe(newTodo.done);
      newTodoId = response.body._id;
    },
    7000 /* add the timeout duration as it was taking longer time execute */
  );
  it(
    'should ruturn error 500 on malformed data with POST' + endpointUrl,
    async () => {
      const response = await request(app)
        .post(endpointUrl)
        .send({ title: 'Missing done property' });
      expect(response.statusCode).toBe(500);
      expect(response.body).toStrictEqual({
        message: 'Todo validation failed: done: Path `done` is required.',
      });
    }
  );
  it(
    'PUT' + endpointUrl,
    async () => {
      const response = await request(app)
        .put(endpointUrl + newTodoId)
        .send(testData);
      expect(response.statusCode).toBe(200);
      expect(response.body.title).toBe(testData.title);
      expect(response.body.done).toBe(testData.done);
    },
    7000 /* add the timeout duration as it was taking longer time execute */
  );
  it(
    'shoud return 404  on PUT' + endpointUrl,
    async () => {
      const response = await request(app)
        .put(endpointUrl + nonExistingTodoId)
        .send(testData);
      expect(response.statusCode).toBe(404);
    },
    7000 /* add the timeout duration as it was taking longer time execute */
  );
  test(
    'HTTP DELETE' + endpointUrl,
    async () => {
      const response = await request(app)
        .delete(endpointUrl + newTodoId)
        .send();
      expect(response.statusCode).toBe(200);
      expect(response.body.title).toBe(testData.title);
      expect(response.body.done).toBe(testData.done);
    },
    7000 /* add the timeout duration as it was taking longer time execute */
  );
  test(
    'HTTP DELETE 404' + endpointUrl,
    async () => {
      const response = await request(app)
        .delete(endpointUrl + nonExistingTodoId)
        .send();
      expect(response.statusCode).toBe(404);
    },
    7000 /* add the timeout duration as it was taking longer time execute */
  );
});
