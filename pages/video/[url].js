import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { StyledMenu } from "../../src/components/Menu/styles";
import styled from "styled-components"
import DarkModeSwitch from "../../src/components/Menu/components/DarkModeSwitch";
import Logo from "../../src/components/Menu/components/Logo";

const StyledVideo = styled.div`
    margin: 100px auto 0 auto;

    .botao {
        display: block;
        margin: 10px auto 0 auto;
        width: 100px;
        height: 40px;
        border-radius: 30px;
        border: 2px solid ${({ theme }) => theme.borderBase};
        background-color: ${({ theme }) => theme.backgroundLevel2};
    }
    .link-botao {
        color: ${({ theme }) => theme.textColorBase};
        font-size: large;
    }

`

export default function Video() {
    const router = useRouter();
    const { url } = router.query;

    return (
        <>
            <StyledMenu>
                <div>
                    <Logo />
                </div>
                <DarkModeSwitch />
            </StyledMenu>
            <StyledVideo>
                <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${url}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                >
                </iframe>
                <button className="botao"><Link className="link-botao" href="/">Voltar</Link></button>
            </StyledVideo>
        </>
    )
}

