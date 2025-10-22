package org.example.note.service;

import org.example.note.model.Notes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface NotesService {
    void addNote(Notes note);
    void updateNote(Notes note);
    void deleteNote(int id);
    Notes getNote(int id);
    Page<Notes> getAllNotes(Pageable pageable);
    Page<Notes> findByTitle(String title, Pageable pageable);
}
