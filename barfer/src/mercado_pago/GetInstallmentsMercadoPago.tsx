import { MercadoPagoRepository } from "./MercadoPagoRepository";

const { getInstallments } = new MercadoPagoRepositoryImpl();

export const GetInstallmentsMercadoPagoUseCase = async (bin: string, amount: number) => {
  return await getInstallments(bin, amount);
}
