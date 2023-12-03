import { Button, Navbar } from 'react-bootstrap';
import { User } from '../models/user';
import * as NotesApi from '../network/notes_api';

interface NavBarLoggedProps {
  user: User;
  onLogoutSucess: () => void;
}

const NavBarLogged = ({ user, onLogoutSucess }: NavBarLoggedProps) => {
  async function logout() {
    try {
      await NotesApi.logout();
      onLogoutSucess();
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  return (
    <>
      <Navbar.Text className="me-2">Signed in as: {user.username}</Navbar.Text>
      <Button onClick={logout}>Log out</Button>
    </>
  );
};

export default NavBarLogged;
