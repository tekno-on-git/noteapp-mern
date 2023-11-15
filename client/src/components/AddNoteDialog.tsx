import { Button, Form, Modal } from 'react-bootstrap';
import { NoteInput } from '../network/notes_api';
import { Note } from '../models/note';
import * as NotesApi from '../network/notes_api';
import { useForm } from 'react-hook-form';

interface AddNoteDialogProps {
  onDismiss: () => void;
  onNoteSaved: (note: Note) => void;
}

const AddNoteDialog = ({ onDismiss, onNoteSaved }: AddNoteDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoteInput>();

  async function onSubmit(input: NoteInput) {
    try {
      const noteResponse = await NotesApi.createNote(input);
      onNoteSaved(noteResponse);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Add Note</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id="addNoteForm" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label> TItle</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              isInvalid={!!errors.title}
              {...register('title', { required: 'Required' })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Text</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Text"
              {...register('text')}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button type="submit" form="addNoteForm" disabled={isSubmitting}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddNoteDialog;
