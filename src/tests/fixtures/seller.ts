import { faker } from "@faker-js/faker";

export const seller = {
  id: faker.string.uuid(),
  full_name: faker.person.firstName(),
  phone: "5199989937",
  email: faker.internet.email(),
  password: faker.internet.password(),
  cpf: "930.196.600-09",
  avatarImg: faker.string.alphanumeric(),
};

export const duplicatedEmailSeller = {
  id: faker.string.uuid(),
  full_name: faker.person.firstName(),
  phone: "5199989937",
  email: "emailsuplicado@gmail.com",
  password: faker.internet.password(),
  cpf: "930.196.600-09",
  avatarImg: faker.string.alphanumeric(),
};

export const duplicatedCpfSeller = {
  id: faker.string.uuid(),
  full_name: faker.person.firstName(),
  phone: "5199989937",
  email: faker.internet.email(),
  password: faker.internet.password(),
  cpf: "930.196.600-09",
  avatarImg: faker.string.alphanumeric(),
};
