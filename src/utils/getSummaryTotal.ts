import { Product } from "@/typings/Product";
import { SummaryTotal } from "@/typings/SummaryTotal";

export const getSummaryTotal = (products: Product[], product: SummaryTotal) => {
	const p = products.find(p => p.id === product.id)!;
	if (product.amount >= 1000 && p.x1000 !== '') {
		return `${Intl.NumberFormat('pt-BR', {
			minimumFractionDigits: 0,
			maximumFractionDigits: 3,
			useGrouping: false,
		}).format(product.amount / 1000)} ${p.x1000}`;
	} else {
		return `${Intl.NumberFormat('pt-BR', {
			minimumFractionDigits: 0,
			maximumFractionDigits: 3,
			useGrouping: false,
		}).format(product.amount)} ${p.unit}`;
	}
}