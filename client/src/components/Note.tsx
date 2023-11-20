import styles from '../styles/Note.module.css';
import { Note as NoteModel } from '../models/note';
import { Card } from 'react-bootstrap';
import { formateDate } from '../utils/formatDate';
import { MdDelete } from 'react-icons/md';
import utilStyles from '../styles/utils.module.css';
interface NoteProps {
  note: NoteModel;
  onDeleteNoteClicked: (note: NoteModel) => void;
  onNoteClick: (note: NoteModel) => void;
  className?: string;
}

const Note = ({
  note,
  className,
  onDeleteNoteClicked,
  onNoteClick,
}: NoteProps) => {
  const { title, text, createdAt, updatedAt } = note;

  let updateText: string;
  if (updatedAt > createdAt) {
    updateText = 'Updated: ' + formateDate(updatedAt);
  } else {
    updateText = 'Created: ' + formateDate(createdAt);
  }

  return (
    <Card
      className={`${className} ${styles.noteCard} `}
      onClick={() => onNoteClick(note)}
    >
      <Card.Body className={styles.cardBody}>
        <Card.Title className={utilStyles.flexCenter}>
          {title}
          <MdDelete
            className="text-muted ms-auto"
            onClick={(event: { stopPropagation: () => void }) => {
              onDeleteNoteClicked(note);
              event.stopPropagation();
            }}
          />
        </Card.Title>
        <Card.Text className={styles.cardText}>{text}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">{updateText}</Card.Footer>
    </Card>
  );
};

export default Note;
