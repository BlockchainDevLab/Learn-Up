import styled from "styled-components";

export const MainComponent = styled.div`
    display: flex;
    flex-direction: column;
    z-index: 1;
    align-items: center;
    justify-content: center;

    button{
        border: 0;
        padding: 1rem;
        border-radius: 10px;
        width: 10rem;
        background-color: #936DDE;
        font-weight: 700;
        color: white;
        cursor: pointer;

        &:hover {
            box-shadow: 1px 1px 5px 1px #6E6DDE;
        }

        transition: .5s;
    }
`