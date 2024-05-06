import styled from "styled-components"

function Footer(){ 
    const FooterContainer = styled.div`
    background-color: #121054; 
    position: fixed; 
    bottom: 0;
    width: 100%; 
    p{
        color: white; 
        text-align: right;
        padding-right: 10px;
    }
    
    `;
    return (
        <FooterContainer>
            <p>https://www.makeus.im/umc</p>
        </FooterContainer>
    )
}
export default Footer;