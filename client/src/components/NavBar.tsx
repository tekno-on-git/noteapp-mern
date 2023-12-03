import { Container, Nav, Navbar } from 'react-bootstrap';
import { User } from '../models/user';
import NavBarLogged from './NavBarLogged';
import NavBarLogOut from './NavBarLogOut';

interface NavBarProps {
  loggedUser: User | null;
  onSignUpClicked: () => void;
  onLoginClicked: () => void;
  onLogoutSuccess: () => void;
}

const NavBar = ({
  loggedUser,
  onSignUpClicked,
  onLoginClicked,
  onLogoutSuccess,
}: NavBarProps) => {
  return (
    <Navbar bg="primary" variant="dark" expand="sm" sticky="top">
      <Container>
        <Navbar.Brand>
          <b>
            <i>codep</i>
          </b>
          's Notes
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto">
            {loggedUser ? (
              <NavBarLogged
                user={loggedUser}
                onLogoutSucess={onLogoutSuccess}
              />
            ) : (
              <NavBarLogOut
                onLoginClicked={onLoginClicked}
                onSignUpClicked={onSignUpClicked}
              />
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
