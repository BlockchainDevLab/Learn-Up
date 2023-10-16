import styled from "styled-components";

export const Main = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const WatchCourseComponent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    gap:20px;

    padding: 20px 20px;

    height: 80vh;
    width: 55vw;

    iframe {
        width: 100%;
        height: 85%;
        border: 0;
        border-radius: 10px 10px 0 0;
    }
`

export const CourseDescriptionComponent = styled.div`
    display: flex;
    flex-direction: column;
    gap:10px;
    justify-content: space-between;

    width: 100%;
`

