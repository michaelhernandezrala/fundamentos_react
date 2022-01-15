import styled from 'styled-components';

const primary = 'yellowgreen';

const Button = styled.button`
  background-color: ${props =>
    props.variant === 'primary' ? primary : 'white'};
  border-radius: 9999px;
  border-style: solid;
  border-width: 1px;
  border-color: ${primary};
  color: ${props => (props.variant === 'primary' ? 'white' : primary)};
  cursor: pointer;
  font: inherit;
  font-weight: bold;
  min-width: 150px;
  outline-style: none;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  padding: 7.5px 30px;
  pointer-events: ${props => (props.disabled ? 'none' : 'auto')};
  text-decoration: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props =>
      props.variant === 'primary'
        ? 'rgb(135, 201, 36)'
        : 'rgba(29, 161, 242, 0.1)'};
  }
`;

// const ButtonPrimary = props => <Button variant="primary" {...props} />;

export default Button;
