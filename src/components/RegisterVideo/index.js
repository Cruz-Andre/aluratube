import { createClient } from "@supabase/supabase-js";
import React from "react";
import { StyledRegisterVideo } from "./styles";

function useForm(propsDoForm) {
	const [values, setValues] = React.useState(propsDoForm.initialValues)
	return {
		values,
		handleChange: (evento) => {
			const value = evento.target.value
			const name = evento.target.name
			setValues({
				...values,
				[name]: value,
			})
		},
		clearForm() {
			setValues({})
		}
	}
}

const PROJECT_URL = "https://yeasgzgceihkjwymolcb.supabase.co"
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InllYXNnemdjZWloa2p3eW1vbGNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxOTI2NTksImV4cCI6MTk4Mzc2ODY1OX0.VWLlL3djc2u_MV4GFeP_6pRfhJ14oJM8mK61lSW-rlc"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY)


//get youtube thumbnail from video url
function getThumbnail(url) {
	return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`
}


export default function RegisterVideo() {
	const formCadastro = useForm({ initialValues: { titulo: "", url: "", playlist: "" } })
	const [formVisivel, setFormVisivel] = React.useState(false)


	return (
		<StyledRegisterVideo>
			<button className="add-video" onClick={() => setFormVisivel(true)}>
				+
			</button>
			{formVisivel
				? (
					<form onSubmit={(evento) => {
						evento.preventDefault()
						console.log(formCadastro.values)

						// Contrato entre o nosso Front e o BackEnd
						supabase.from("video").insert({
							title: formCadastro.values.titulo,
							url: formCadastro.values.url,
							thumb: getThumbnail(formCadastro.values.url),
							playlist: formCadastro.values.playlist,
						})
							.then((oqueveio) => {
								console.log(oqueveio);
							})
							.catch((err) => {
								console.log(err);
							})

						setFormVisivel(false)
						formCadastro.clearForm()

					}}>
						<div>
							<button 
								type="button" 
								className="close-modal" 
								onClick={() => setFormVisivel(false)}
							>
								X
							</button>
							<h4 className="cadastro-titulo">Cadastrar Vídeos</h4>
							<input
								type="text"
								placeholder="Titulo do vídeo"
								name="titulo"
								value={formCadastro.values.titulo}
								onChange={formCadastro.handleChange}
								pattern="^([ \u00c0-\u00ffa-zA-Z])+$"
								title="Digite somente caracteres alfabeticos"
								required
							/>
							<input
								type="text"
								placeholder="URL padrão do Youtube"
								name="url"
								value={formCadastro.values.url}
								onChange={formCadastro.handleChange}
								pattern="^((https:)\/\/)((www)\.)((youtube\.com))(\/(watch)\?v=)([\w\-]+)$"
								title="Somente o link padrão--> https://youtube.com/watch?v=[ID do vídeo]"
								required
							/>
							<input
								type="text"
								placeholder="Nome da playlist"
								name="playlist"
								value={formCadastro.values.playlist}
								onChange={formCadastro.handleChange}
								pattern="^([ \u00c0-\u00ffa-zA-Z])+$"
								title="Digite somente caracteres alfabeticos"
								required
							/>
							<button type="submit">
								Cadastrar
							</button>
						</div>
					</form>
				)
				: false
			}
		</StyledRegisterVideo>
	)
}