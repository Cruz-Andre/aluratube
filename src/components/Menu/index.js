import DarkModeSwitch from "./components/DarkModeSwitch";
import Logo from "./components/Logo";
import Search from "./components/Search";
import { StyledMenu } from "./styles";

export default function Menu({valorDoFiltro, setValorDoFiltro}) {
	return (
		<StyledMenu>
			<div>
				<Logo />
			</div>
        <Search valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
        <DarkModeSwitch />
		</StyledMenu>
	);
}
