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

export default function RegisterVideo() {
	const formCadastro = useForm({ initialValues: { titulo: "Digite seu Título", url: "Digite a URL" } })
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
						setFormVisivel(false)
						formCadastro.clearForm()

					}}>
						<div>
							<button type="button" className="close-modal" onClick={() => setFormVisivel(false)}>
								X
							</button>
							<input
								placeholder="Titulo do vídeo"
								name="titulo"
								value={formCadastro.values.titulo}
								onChange={formCadastro.handleChange}
							/>
							<input
								placeholder="URL do vídeo"
								name="url"
								value={formCadastro.values.url}
								onChange={formCadastro.handleChange}
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