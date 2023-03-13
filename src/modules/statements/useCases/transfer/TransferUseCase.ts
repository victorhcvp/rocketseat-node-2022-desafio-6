import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { Statement } from "../../entities/Statement";
import { IStatementsRepository } from "../../repositories/IStatementsRepository";
import { TransferError } from "./TransferError";

interface IRequest {
	user_id: string;
	amount: number;
	to_user: string;
}

interface IResponse {
	statement: Statement;
}

@injectable()
export class TransferUseCase {
	constructor(
		@inject('StatementsRepository')
		private statementsRepository: IStatementsRepository,

		@inject('UsersRepository')
		private usersRepository: IUsersRepository,
	) {}

	async execute({ user_id, amount, to_user }: IRequest): Promise<IResponse> {
		const user = await this.usersRepository.findById(user_id);

		if (!user) {
			throw new TransferError.UserNotFound();
		}

		const toUser = await this.usersRepository.findById(to_user);

		if (!toUser) {
			throw new TransferError.UserNotFound();
		}

		const balance = await this.statementsRepository.getUserBalance({
			user_id,
			with_statement: true,
		});

		if (balance.balance < amount) {
			throw new TransferError.InsufficientFunds();
		}

		const statement = await this.statementsRepository.transfer({
			user_id,
			to_user,
			value: amount,
		});

		return { statement };
	}
}
