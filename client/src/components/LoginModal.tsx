import { useForm } from 'react-hook-form';
import { User } from '../models/user';
import { LoginCredentials } from '../network/notes_api';

import * as NotesApi from '../network/notes_api';
import { Alert, Button, Form, Modal } from 'react-bootstrap';
import TextInputFeild from './form/TextInputField';

import utilStyles from '../styles/utils.module.css';
import { useState } from 'react';
import { UnauthorizedError } from '../errors/http_erros';

interface LoginModalProps {
  onDismiss: () => void;
  onLogin: (user: User) => void;
}

const LoginModal = ({ onDismiss, onLogin }: LoginModalProps) => {
  const [errorText, setErrorText] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>();

  async function onSubmit(creds: LoginCredentials) {
    try {
      const newUser = await NotesApi.login(creds);
      onLogin(newUser);
    } catch (error) {
      if (error instanceof UnauthorizedError) setErrorText(error.message);
      else alert(error);
      console.log(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {errorText && <Alert variant="danger"> {errorText}</Alert>}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextInputFeild
            name="username"
            label="Username"
            type="text"
            placeholder="Username"
            register={register}
            registerOptions={{ required: 'Required' }}
            error={errors.username}
          />

          <TextInputFeild
            name="password"
            label="Password"
            type="password"
            placeholder="Password"
            register={register}
            registerOptions={{ required: 'Required' }}
            error={errors.password}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className={utilStyles.width100}
          >
            Log In
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
