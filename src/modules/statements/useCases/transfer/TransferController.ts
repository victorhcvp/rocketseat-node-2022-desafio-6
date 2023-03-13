import { Request, Response } from "express";
import { container } from "tsyringe";
import { TransferUseCase } from "./TransferUseCase";

export class TransferController {
	async execute(request: Request, response: Response) {
		const { id: user_id } = request.user;
		const { to_user, amount } = request.body;

		const transfer = container.resolve(TransferUseCase);

		const { statement } = await transfer.execute({ user_id, to_user, amount });

		return response.json(statement);
	}
}
