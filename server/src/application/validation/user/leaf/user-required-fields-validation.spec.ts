/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserRequiredFieldsValidation } from './user-required-fields-validation';

const sutFactory = () => {
  const sut = new UserRequiredFieldsValidation();

  return {
    sut,
  };
};

describe('UserEmptyRequiredFieldsValidation', () => {
  it('should not throw if id is request is valid', async () => {
    const { sut } = sutFactory();
    const noValue = await sut.validate({
      firstName: 'first1',
      lastName: 'last1',
      email: 'email1@email.com',
      password: '123',
      confirmPassword: '123',
    });
    expect(noValue).toBeUndefined();
  });

  it('should throw if ANY field is missing or has no value', async () => {
    const { sut } = sutFactory();
    let error;

    try {
      await sut.validate({
        firstName: '',
        lastName: 'last1',
        email: 'email1@email.com',
        password: '123',
        confirmPassword: '123',
      });
    } catch (e: any) {
      error = e;
    }

    expect(error.messages).toEqual(
      expect.arrayContaining(['Missing field firstName']),
    );

    error = undefined;
    try {
      await sut.validate({
        firstName: 'first1',
        lastName: '',
        email: 'email1@email.com',
        password: '123',
        confirmPassword: '123',
      });
    } catch (e: any) {
      error = e;
    }

    expect(error.messages).toEqual(
      expect.arrayContaining(['Missing field lastName']),
    );

    error = undefined;
    try {
      await sut.validate({
        firstName: 'first1',
        lastName: 'last1',
        // email: 'email1@email.com',
        password: '123',
        confirmPassword: '123',
      } as any);
    } catch (e: any) {
      error = e;
    }

    expect(error.messages).toEqual(
      expect.arrayContaining(['Missing field email']),
    );

    error = undefined;
    try {
      await sut.validate({
        firstName: 'first1',
        lastName: 'last1',
        email: 'email1@email.com',
        password: '',
        confirmPassword: '123',
      } as any);
    } catch (e: any) {
      error = e;
    }

    expect(error.messages).toEqual(
      expect.arrayContaining(['Missing field password']),
    );

    error = undefined;
    try {
      await sut.validate({
        firstName: 'first1',
        lastName: 'last1',
        email: 'email1@email.com',
        password: '123',
        confirmPassword: '',
      } as any);
    } catch (e: any) {
      error = e;
    }

    expect(error.messages).toEqual(
      expect.arrayContaining(['Missing field confirmPassword']),
    );

    error = undefined;
    try {
      await sut.validate({
        firstName: '',
        lastName: 'last1',
        email: 'email1@email.com',
        password: '',
        confirmPassword: '',
      } as any);
    } catch (e: any) {
      error = e;
    }

    expect(error.messages).toEqual(
      expect.arrayContaining([
        'Missing field confirmPassword',
        'Missing field password',
        'Missing field firstName',
      ]),
    );
  });
});
