import config from "../aluratube-config.json"
import styled from "styled-components"
import { CSSReset } from "../src/components/CSSReset"
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";

function HomePage() {
	const estilosDaHomePage = {
		// backgroundColor: "red" 
	};

	// console.log(config.playlist);

	return (
		<>
			<CSSReset />
			<div style={{
				display: "flex",
				flexDirection: "column",
				flex: 1,
				// backgroundColor: "red",
			}}>
				<Menu />
				<Header />
				<Timeline playlist={config.playlist} favoritos={config.favoritos} />
			</div>
		</>
	)
}

export default HomePage


const StyledHeader = styled.div`
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
	.header-div-banner {
		margin-top: 56px;
		width: 100%;
		height: 230px;
		overflow: hidden;
		filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
	}
	.header-banner{
		width: 100%;		
	}
`
function Header() {
	return (
		<StyledHeader>
			<div className="header-div-banner">
				<img className="header-banner" src={config.banner} />
			</div>

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


function Timeline(props) {
	// console.log("Dentro do componente Timeline: ", props.playlist);
	const playlistNames = Object.keys(props.playlist);
	const favoritosNames = Object.keys(props.favoritos);

	// Statement
	// Retorno por expressão
	return (
		<StyledTimeline>
			{playlistNames.map((playlistName) => {
				const videos = props.playlist[playlistName];
				console.log(playlistName);
				console.log(videos);
				return (
					<section>
						<h2>{playlistName}</h2>
						<div>
							{videos.map((video) => {
								return (
									<a href={video.url}>
										<img src={video.thumb} />
										<span>{video.title}</span>
									</a>
								)
							})}
						</div>
					</section>
				)
			})}
			{favoritosNames.map((favoritosName) => {
				const favoritos = props.favoritos[favoritosName];
				console.log(favoritosName);
				console.log(favoritos);
				return(
					<section>
						<h2>{favoritosName}</h2>
						<div className="favoritos">
							{favoritos.map((favorito) => {
								return (
									<a className="favorito-container" href={favorito.url}>
										<img 
											className="favorito-img" 
											src={`https://github.com/${favorito.github}.png`} 
										/>
										<span className="favorito-text">{favorito.name}</span>
									</a>
								)
							})}
						</div>
					</section>
				)
			})}
		</StyledTimeline>
	)
}