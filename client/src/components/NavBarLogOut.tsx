import { Button } from 'react-bootstrap';

interface NavBarLogOutProps {
  onSignUpClicked: () => void;
  onLoginClicked: () => void;
}

const NavBarLogOut = ({
  onSignUpClicked,
  onLoginClicked,
}: NavBarLogOutProps) => {
  return (
    <>
      <Button onClick={onSignUpClicked}>Sign Up</Button>
      <Button onClick={onLoginClicked}>Log In</Button>

    </>
  );
};

export default NavBarLogOut;
