import styled from "styled-components"
import config from "../../../aluratube-config.json"

const StyledHeader = styled.div`
	background-color: ${({ theme }) => theme.backgroundLevel1};
	.avatar {
		width: 80px;
		height: 80px;
		border-radius: 50%;
	}
	.user-info {
		//margin-top: 50px;
		display: flex;
		align-items: center;
		width: 100%;
		padding: 16px 32px;
		gap: 16px;
	}
`
const StyleBanner = styled.div`
		margin-top: 56px;
		width: 100%;
		height: 230px;
		overflow: hidden;
		filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
	
	.header-banner{
		width: 100%;		
	}
`
export default function Header() {
	return (
		<StyledHeader >
			<StyleBanner>
				<img className="header-banner" src={config.banner} />
			</StyleBanner>

			<section className="user-info">
				<img className="avatar" src={`https://github.com/${config.github}.png`} />
				<div>
					<h2>{config.name}</h2>
					<p>{config.job}</p>
				</div>
			</section>
		</StyledHeader>
	)
}