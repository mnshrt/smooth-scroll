import styled from 'styled-components';
import { device } from '../../data/device';

export const ListItem = styled.li`

  margin: 10px auto;
  padding: 2em;
  font-size:16px;
  width: 75%;
  text-align:center;
  background-color: #fdfdff;
  border-radius: 0.5em;
  box-shadow: 2px 3px 7px 2px rgba(0,0,0,0.02);
  list-style: none;
 
  @media ${device.laptop} { 
    text-align:left;
    font-size:20px;
    width: 75%;
    margin: 20px auto;
    padding: 3em;
  }

  @media ${device.desktop} {
    text-align:left;
    width: 75%;
    font-size:30px;
    margin: 3em auto;
    padding: 4em; 
  }
`;
