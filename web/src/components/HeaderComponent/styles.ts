import styled from "styled-components";

export const Header = styled.div`
    display: flex;
    justify-content: ${ props => props.link ? "space-between" : "center"};
    align-items: center;
    padding: 0 10px 0 10px;
    gap: 20px;
    margin: 0;
    height: 10rem;
    max-width: 100%;

    border-bottom: 2px 2px 2px 2px black;
    
    .desconect {
        background-color: red;
        
        &:hover {
            box-shadow: 1px 1px 5px 1px #6E6DDE;
            box-shadow: 1px 1px 5px 1px red;
        }
    }

    .right {
        display: flex;
        align-items: center;
        gap: 20px;
    }

    p{ 
        margin: 0;
        padding: 0;
    }

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

export const Title = styled.p`
  margin: 0;
  padding: 0;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  font-weight: 900;
`