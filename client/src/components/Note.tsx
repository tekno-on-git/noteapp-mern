import styles from '../styles/Note.module.css';
import { Note as NoteModel } from '../models/note';
import { Card } from 'react-bootstrap';
import { formateDate } from '../utils/formatDate';
interface NoteProps {
  note: NoteModel;
  className?: string;
}

const Note = ({ note, className }: NoteProps) => {
  const { title, text, createdAt, updatedAt } = note;

  let updateText: string;
  if (updatedAt > createdAt) {
    updateText = 'Updated: ' + formateDate(updatedAt);
  } else {
    updateText = 'Created: ' + formateDate(createdAt);
  }

  return (
    <Card className={`${className} ${styles.noteCard} `}>
      <Card.Body className={styles.cardBody}>
        <Card.Title>{title}</Card.Title>
        <Card.Text className={styles.cardText}>{text}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">{updateText}</Card.Footer>
    </Card>
  );
};

export default Note;
