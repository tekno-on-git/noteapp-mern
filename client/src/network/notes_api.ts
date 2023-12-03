import { UnauthorizedError } from '../errors/http_erros';
import { Note } from '../models/note';
import { User } from '../models/user';
// import { NoteInput } from '';

async function fetchData(input: RequestInfo, init?: RequestInit) {
  const resp = await fetch(input, init);
  if (resp.ok) {
    return resp;
  } else {
    const errBody = await resp.json();
    const errMessage = errBody.error;
    if (resp.status === 401) throw new UnauthorizedError(errMessage);
    else if (resp.status === 409) throw new UnauthorizedError(errMessage);
    else
      throw Error(
        `Request failed with status: ${resp.status} message: ${errMessage}`
      );
  }
}

export async function getLoggedUser(): Promise<User> {
  const resp = await fetchData('/api/users', { method: 'GET' });
  return resp.json();
}

export interface SignUpCredentials {
  username: string;
  email: string;
  password: string;
}

export async function signUp(creds: SignUpCredentials): Promise<User> {
  const resp = await fetchData('/api/users/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(creds),
  });

  return resp.json();
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export async function login(creds: LoginCredentials): Promise<User> {
  const resp = await fetchData('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(creds),
  });

  return resp.json();
}

export async function logout() {
  await fetchData('/api/users/logout', { method: 'POST' });
}
export async function fetchNotes(): Promise<Note[]> {
  const resp = await fetchData('/api/notes', { method: 'GET' });
  return resp.json();
}

export interface NoteInput {
  title: string;
  text?: string;
}

export async function createNote(note: NoteInput): Promise<Note> {
  const resp = await fetchData('api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });
  return resp.json();
}

export async function deleteNote(noteId: string) {
  await fetchData(`/api/notes/${noteId}`, { method: 'DELETE' });
}

export async function updateNote(noteId: string, note: NoteInput) {
  const resp = await fetchData(`/api/notes/${noteId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });

  return resp.json();
}
