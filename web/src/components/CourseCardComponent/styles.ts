import styled from "styled-components";

export const Card = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 19rem;
    height: 30rem;
    border-radius: 10px ;
    background-color: white;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    cursor: pointer;
    padding-bottom:10px;
   
    &:hover {
        box-shadow: 3px 2px 2px 2px #8a84e2;
        margin-top: -1rem;
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

    transition: .5s;
`

export const CardImg = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 10px 10px 0 0;
    background-image: ${props => `url(${props.src})`} ;
`

export const MainCardSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap:10px;
    
    padding: 10px;

    p {
       padding: 0;
       margin: 0;
    }

    .loader {
  width: 48px;
  height: 48px;
  display: inline-block;
  position: relative;
}
.loader::after,
.loader::before {
  content: '';  
  box-sizing: border-box;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid #6E6DDE;
  position: absolute;
  left: 0;
  top: 0;
  animation: animloader 2s linear infinite;
}
.loader::after {
  animation-delay: 1s;
}

@keyframes animloader {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}

    .course_name {
    
        p {
            font-size: 15px;
            font-weight: 500;
        }
    }

    .duration {
        p {
            font-weight: 400;
            font-size: .85rem;
        }
    }

    .teacher_and_price {
        display: flex;
        justify-content: space-between;
        
        p{
            font-size: .9rem;
        }
    }

`

