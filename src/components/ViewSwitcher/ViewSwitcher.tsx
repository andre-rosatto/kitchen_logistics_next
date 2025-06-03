import { useViewContext } from "@/contexts/ViewContext";
import Meals from "@/views/Meals";
import Products from "@/views/Products";
import Recipes from "@/views/Recipes";

export default function ViewSwitcher() {
	const { view } = useViewContext();

	switch (view) {
		case 0:
			return <Meals />;
		case 1:
			return <Recipes />;
		case 2:
			return <Products />;
		default:
			return null;
	}
}
