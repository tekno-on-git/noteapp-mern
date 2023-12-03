import { Container } from 'react-bootstrap';
import styles from './styles/NotesPage.module.css';
import NotePageLoggedInView from './components/NotePageLoggedInView';
import NotePageLoggedOutView from './components/NotePageLoggedOutView';
import SignUpModal from './components/SignUpModal';
import LoginModal from './components/LoginModal';
import NavBar from './components/NavBar';
import { useEffect, useState } from 'react';
import { User } from './models/user';

import * as NotesApi from './network/notes_api';

function App() {
  const [loggedUser, setLoggedUser] = useState<User | null>(null);

  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await NotesApi.getLoggedUser();
        setLoggedUser(user);
      } catch (error) {
        console.error(error);
        setLoggedUser(null);
      }
    }
    fetchLoggedInUser();
  }, []);

  return (
    <div>
      <NavBar
        loggedUser={loggedUser}
        onLoginClicked={() => setShowLoginModal(true)}
        onSignUpClicked={() => setShowSignUpModal(true)}
        onLogoutSuccess={() => setLoggedUser(null)}
      />
      <Container className={styles.NotesPage}>
        <>{loggedUser ? <NotePageLoggedInView /> : <NotePageLoggedOutView />}</>
        {showSignUpModal && (
          <SignUpModal
            onDismiss={() => setShowSignUpModal(false)}
            onSignUp={(user) => {
              setLoggedUser(user);
              setShowSignUpModal(false);
            }}
          />
        )}
        {showLoginModal && (
          <LoginModal
            onDismiss={() => setShowLoginModal(false)}
            onLogin={(user) => {
              setLoggedUser(user);
              setShowLoginModal(false);
            }}
          />
        )}
      </Container>
    </div>
  );
}

export default App;
