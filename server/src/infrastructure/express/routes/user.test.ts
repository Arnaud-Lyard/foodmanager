/* eslint-disable */
import request from 'supertest';
import db from '../../../infrastructure/prisma/connection';
import { app } from '../server';

const testingUsersFactory = () => {
  return [
    {
      firstName: 'firstName1',
      lastName: 'lastName1',
      email: 'email1@email.com',
      password: 'password1',
      confirmPassword: 'password1',
    },
    {
      firstName: 'firstName2',
      lastName: 'lastName2',
      email: 'email2@email.com',
      password: 'password2',
      confirmPassword: 'password2',
    },
    {
      firstName: 'firstName3',
      lastName: 'lastName3',
      email: 'email3@email.com',
      password: 'password3',
      confirmPassword: 'password3',
    },
  ];
};

describe('User Routes', () => {
  // beforeAll(async () => {
  //   await db.migrate.latest({ directory: process.env.MIGRATIONS });
  // });

  afterAll(async () => {
    // await db.user.deleteMany();
    await db.$disconnect();
  });

  // it('should create users with no errors if everything is OK', async () => {
  //   await request(app)
  //     .post('/users')
  //     .send(testingUsersFactory()[0])
  //     .then((response) => {
  //       expect(response.status).toBe(201);
  //       expect(response.body.id).toBeTruthy();
  //       expect(response.body.firstName).toBe('firstName1');
  //       expect(response.body.lastName).toBe('lastName1');
  //       expect(response.body.email).toBe('email1@email.com');
  //       expect(response.body.passwordHash).toBeTruthy();
  //       expect(response.body.passwordHash.length).toBe(60);
  //     })
  //     .catch((e) => {
  //       throw e;
  //     });
  // });

  // it('should return 400 (RequestValidationError) if request if invalid', async () => {
  //   await request(app)
  //     .post('/users')
  //     .send({
  //       // firstName: 'firstName1',
  //       lastName: 'lastName1',
  //       email: 'email1@email.com',
  //       password: 'password1',
  //       confirmPassword: 'password1',
  //     })
  //     .expect(400)
  //     .then((res) => expect(res.body.error).toBe('RequestValidationError'));

  //   await request(app)
  //     .post('/users')
  //     .send({
  //       firstName: 'firstName1',
  //       // lastName: 'lastName1',
  //       email: 'email1@email.com',
  //       password: 'password1',
  //       confirmPassword: 'password1',
  //     })
  //     .expect(400)
  //     .then((res) => expect(res.body.error).toBe('RequestValidationError'));

  //   await request(app)
  //     .post('/users')
  //     .send({
  //       firstName: 'firstName1',
  //       lastName: 'lastName1',
  //       // email: 'email1@email.com',
  //       password: 'password1',
  //       confirmPassword: 'password1',
  //     })
  //     .expect(400)
  //     .then((res) => expect(res.body.error).toBe('RequestValidationError'));

  //   await request(app)
  //     .post('/users')
  //     .send({
  //       firstName: 'firstName1',
  //       lastName: 'lastName1',
  //       email: 'email1@email.com',
  //       // password: 'password1',
  //       confirmPassword: 'password1',
  //     })
  //     .expect(400)
  //     .then((res) => expect(res.body.error).toBe('RequestValidationError'));

  //   await request(app)
  //     .post('/users')
  //     .send({
  //       firstName: 'firstName1',
  //       lastName: 'lastName1',
  //       email: 'email1@email.com',
  //       password: 'password1',
  //       // confirmPassword: 'password1',
  //     })
  //     .expect(400)
  //     .then((res) => expect(res.body.error).toBe('RequestValidationError'));
  // });

  // it('should return 400 (EmailValidationError) if email is invalid', async () => {
  //   await request(app)
  //     .post('/users')
  //     .send({
  //       firstName: 'firstName1',
  //       lastName: 'lastName1',
  //       email: 'email1email.com',
  //       password: 'password1',
  //       confirmPassword: 'password1',
  //     })
  //     .expect(400)
  //     .then((res) => expect(res.body.error).toBe('EmailValidationError'));
  // });

  // it('should return 401 if accessing a user different from logged user', async () => {
  //   await request(app).post('/users').send({
  //     firstName: 'firstName',
  //     lastName: 'lastName',
  //     email: 'temp_user1@email.com',
  //     password: 'temp_pass1',
  //     confirmPassword: 'temp_pass1',
  //   });
  //   const tokens = await request(app).post('/sign-in').send({
  //     email: 'temp_user1@email.com',
  //     password: 'temp_pass1',
  //   });
  //   const { token } = tokens.body;
  //   const response = await request(app)
  //     .get('/users/abc')
  //     .set('authorization', `Bearer ${token}`);
  //   expect(response.status).toBe(401);
  //   expect(response.body.error).toBe('UnauthorizedError');
  // });

  // it('should return 401 if accessing private route without authorization token', async () => {
  //   const response = await request(app).get('/users/abc');
  //   expect(response.status).toBe(401);
  //   expect(response.body.error).toBe('UnauthorizedError');
  // });

  // it('should return 401 if accessing private route with invalid authorization token', async () => {
  //   const response = await request(app)
  //     .get('/users/abc')
  //     .set('authorization', 'token');
  //   expect(response.status).toBe(401);
  //   expect(response.body.error).toBe('UnauthorizedError');
  // });

  // it('should delete a user if exists and is the same as logged user', async () => {
  //   await request(app)
  //     .post('/users')
  //     .send({
  //       firstName: 'firstName2',
  //       lastName: 'lastName2',
  //       email: 'email2@email.com',
  //       password: 'password2',
  //       confirmPassword: 'password2',
  //     })
  //     .then(async (response) => {
  //       const { id } = response.body;
  //       const tokens = await request(app).post('/sign-in').send({
  //         email: 'email2@email.com',
  //         password: 'password2',
  //       });
  //       expect(response.status).toBe(201);
  //       await request(app)
  //         .delete(`/users/${id}`)
  //         .set('authorization', 'Bearer ' + tokens.body.token)
  //         .expect(204)
  //         .then((response) => {
  //           expect(response.body).toEqual({});
  //         })
  //         .catch((e) => {
  //           throw e;
  //         });
  //     })
  //     .catch((e) => {
  //       throw e;
  //     });
  // });

  // it('should update a user if exists and is the same as logged user', async () => {
  //   const createResponse = await request(app).post('/users').send({
  //     firstName: 'first',
  //     lastName: 'last',
  //     email: 'temp_user3@email.com',
  //     password: 'temp_pass3',
  //     confirmPassword: 'temp_pass3',
  //   });

  //   const { id } = createResponse.body;

  //   const tokens = await request(app).post('/sign-in').send({
  //     email: 'temp_user3@email.com',
  //     password: 'temp_pass3',
  //   });

  //   const updateResponse = await request(app)
  //     .put(`/users/${id}`)
  //     .set('authorization', 'Bearer ' + tokens.body.token)
  //     .send({
  //       firstName: 'new_firstName',
  //       lastName: 'new_lastName',
  //       email: 'new_email123123@email.com',
  //     });

  //   expect(updateResponse.status).toBe(204);

  //   const findResponse = await request(app)
  //     .get(`/users/${id}`)
  //     .set('authorization', 'Bearer ' + tokens.body.token);

  //   expect(findResponse.body.firstName).toBe('new_firstName');
  //   expect(findResponse.body.lastName).toBe('new_lastName');
  //   expect(findResponse.body.email).toBe('new_email123123@email.com');
  // });

  it('should test', async () => {});
});
