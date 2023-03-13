import {
	Connection,
	createConnection,
	getRepository,
	Repository,
} from "typeorm";

import { Statement } from "../modules/statements/entities/Statement";
import { User } from "../modules/users/entities/User";

import { StatementsRepository } from "../modules/statements/repositories/StatementsRepository";
import { UsersRepository } from "../modules/users/repositories/UsersRepository";

const users: User[] = [
	{
		name: "Victor Hugo",
		email: "victor@gmail.com",
		password: "1234",
	},
] as User[];

describe("FinAPI", () => {
	let connection: Connection;

	let ormUsersRepository: Repository<User>;
	let ormStatementsRepository: Repository<Statement>;

	let usersRepository: UsersRepository;
	let statementsRepository: StatementsRepository;

	beforeAll(async () => {
		connection = await createConnection();

		ormUsersRepository = getRepository(User);
		ormStatementsRepository = getRepository(Statement);

		usersRepository = new UsersRepository();
		statementsRepository = new StatementsRepository();

		await connection.query("DROP TABLE IF EXISTS users");
		await connection.query("DROP TABLE IF EXISTS statements");

		await connection.runMigrations();
	});

	it("should be able to create a user", () => {});
});
