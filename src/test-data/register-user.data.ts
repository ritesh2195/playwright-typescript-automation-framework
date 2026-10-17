import {faker} from '@faker-js/faker'
import { RegisterUserModel } from '../models/RegisterUserModel'

export function createUserRegistrationData(): RegisterUserModel{
    const firstName = faker.person.firstName('male');
    const lastName = faker.person.lastName();
    const email = `${firstName}.${lastName}123@gmail.com`
    const password = 'Test@12345'
    return {
        gender:'Male',
        firstName,
        lastName,
        email,
        password,
        confirmPassword:password
    }
}