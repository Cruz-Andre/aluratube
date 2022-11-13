import React from "react";
import config from "../aluratube-config.json"
import { videoService } from "../src/services/video.Service";
import Menu from "../src/components/Menu";
import Header from "../src/components/Header";
import Timeline from "../src/components/Timeline";


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
