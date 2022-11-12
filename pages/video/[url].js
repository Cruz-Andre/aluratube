import Link from "next/link";
import { useRouter } from "next/router";
import Menu from "../../src/components/Menu";
import styled from "styled-components"

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
    }

`

export default function Video() {
    const router = useRouter();
    const { url } = router.query;

    return (
        <>
            <Menu />
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

