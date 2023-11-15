import { Note } from '../models/note';

async function fetchData(input: RequestInfo, init?: RequestInit) {
  const resp = await fetch(input, init);
  if (resp.ok) {
    return resp;
  } else {
    const errBody = await resp.json();
    const errMessage = errBody.error;
    throw Error(errMessage);
  }
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
