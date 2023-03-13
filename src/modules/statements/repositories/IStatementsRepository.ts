import { Statement } from "../entities/Statement";
import { ICreateStatementDTO } from "../useCases/createStatement/ICreateStatementDTO";
import { IGetBalanceDTO } from "../useCases/getBalance/IGetBalanceDTO";
import { IGetStatementOperationDTO } from "../useCases/getStatementOperation/IGetStatementOperationDTO";
import { ITransferDTO } from "../useCases/transfer/ITransferDTO";

export interface IStatementsRepository {
	create: (data: ICreateStatementDTO) => Promise<Statement>;
	findStatementOperation: (
		data: IGetStatementOperationDTO,
	) => Promise<Statement | undefined>;
	getUserBalance: (
		data: IGetBalanceDTO,
	) => Promise<
		{ balance: number } | { balance: number; statement: Statement[] }
	>;
	transfer: (data: ITransferDTO) => Promise<Statement>;
}
