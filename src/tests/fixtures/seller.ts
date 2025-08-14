import { faker } from "@faker-js/faker";

export const seller = {
  full_name: faker.person.firstName(),
  phone: "5199989937",
  email: faker.internet.email(),
  password: faker.internet.password(),
  cpf: "60106842005",
  avatarImg: faker.string.uuid(),
};
