import React from "react";
import config from "../aluratube-config.json"
import styled from "styled-components"

import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";
import { videoService } from "../src/services/video.Service";
import Link from "next/link";


function HomePage() {
	const service = videoService()

	const [valorDoFiltro, setValorDoFiltro] = React.useState("")

	const [playlist, setPlaylist] = React.useState({}) //config.playlist

	React.useEffect(() => {
		//console.log("useEffect")
		service
			.getAllVideos()
			.then((dados) => {
				//console.log(dados.data);
				// Forma Imutável
				const novasPlaylist = { ...playlist }
				dados.data.forEach((video) => {
					if (!novasPlaylist[video.playlist]) {
						novasPlaylist[video.playlist] = []
					}
					novasPlaylist[video.playlist].push(video)
				})
				setPlaylist(novasPlaylist);
			})

	}, [])

	//console.log("playlist pronto: ", playlist)

	return (
		<>
			<div style={{
				display: "flex",
				flexDirection: "column",
				flex: 1,
				// backgroundColor: "red",
			}}>
				{/* Prop Drilling */}
				<Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
				<Header />
				<Timeline searchValue={valorDoFiltro} playlist={playlist} favoritos={config.favoritos} />
			</div>
		</>
	)
}

export default HomePage

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
function Header() {
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


function Timeline({ searchValue, ...props }) {
	// console.log("Dentro do componente Timeline: ", props.playlist);
	const playlistNames = Object.keys(props.playlist);
	const favoritosNames = Object.keys(props.favoritos);

	// Statement
	// Retorno por expressão
	return (
		<StyledTimeline>
			{playlistNames.map((playlistName) => {
				const videos = props.playlist[playlistName];
				//console.log(playlistName);
				//console.log(videos);
				return (
					<section key={playlistName}>
						<h2>{playlistName}</h2>
						<div>
							{videos
								.filter((video) => {
									const titleNormalized = video.title.toLowerCase()
									const searchValueNormalized = searchValue.toLowerCase()
									return titleNormalized.includes(searchValueNormalized)
								})
								.map((video) => {
									return(
									<Link
										key={video.url}
										href="/video/"
										as={`/video/${video['url'].split('v=')[1]}`}
									>
										<img src={video.thumb} />
										<span>{video.title}</span>
									</Link>
									
									// return (
									// 	<a key={video.url} href={video.url}>
									// 		<img src={video.thumb} />
									// 		<span>{video.title}</span>
									// 	</a>
									// )
									)
								})}
						</div>
					</section>
				)
			})}
			{favoritosNames.map((favoritosName) => {
				const favoritos = props.favoritos[favoritosName];
				//console.log(favoritosName);
				//console.log(favoritos);
				return (
					<section key={favoritosName}>
						<h2>{favoritosName}</h2>
						<div className="favoritos">
							{favoritos
								.map((favorito) => {
									return (
										<a
											key={favorito.name}
											className="favorito-container"
											href={favorito.url}
										>
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