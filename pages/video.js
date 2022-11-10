import React from "react";
import { ColorModeContext } from "../src/components/Menu/components/ColorMode";
import config from "../aluratube-config.json";


export default function Video(props) {
    const contexto = React.useContext(ColorModeContext);
    const url = config.playlist.jogos[0].url
    console.log(url)

    return (
        <div>
            Video!
            {contexto.mode}
            <iframe width="560" height="315" src={url} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            <button onClick={() => contexto.toggleMode()}>
                Trocar modo
            </button>
        </div>
    )
}

