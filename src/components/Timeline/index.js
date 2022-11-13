import React from "react";
import Link from "next/link";
import { StyledTimeline } from "./styles";



export default function Timeline({ searchValue, ...props }) {
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
									return (
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