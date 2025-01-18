import styled from 'styled-components'
import { Header } from "antd/es/layout/layout";

export const StyledHeader = styled(Header)`
    position: sticky;
    top: 0;
    z-index: 1;
    width: 100%;
    display: flex;
    align-items: "center";
`;

export const StyledChildDiv = styled.div`
    padding: 24;
    min-height: 380; 
    background: "#fff";
`;