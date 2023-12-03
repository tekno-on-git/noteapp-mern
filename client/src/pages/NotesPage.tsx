import { Container } from 'react-bootstrap';
import NotePageLoggedInView from '../components/NotePageLoggedInView';
import NotePageLoggedOutView from '../components/NotePageLoggedOutView';
import styles from '../styles/NotesPage.module.css';
import { User } from '../models/user';

interface NotesPageProps {
  loggedUser: User | null;
}

const NotesPage = ({ loggedUser }: NotesPageProps) => {
  return (
    <Container className={styles.NotesPage}>
      <>{loggedUser ? <NotePageLoggedInView /> : <NotePageLoggedOutView />}</>
    </Container>
  );
};

export default NotesPage;
