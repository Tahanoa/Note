package org.example.note.service;

import org.example.note.model.Notes;
import org.example.note.repository.NotesRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public class NotesServiceIMPL implements NotesService{
    private final NotesRepository notesRepository;
    public NotesServiceIMPL(NotesRepository notesRepository) {
        this.notesRepository = notesRepository;
    }

    @Override
    public void addNote(Notes note) {
        notesRepository.save(note);
    }

    @Override
    public void updateNote(Notes note) {
        notesRepository.save(note);
    }

    @Override
    public void deleteNote(int id) {
        notesRepository.deleteById(id);
    }

    @Override
    public Notes getNote(int id) {
        return notesRepository.findById(id).orElseThrow(() -> new RuntimeException("Note.not.found"));
    }

    @Override
    public Page<Notes> getAllNotes(Pageable pageable) {
        return notesRepository.findAll(pageable);
    }

    @Override
    public Page<Notes> findByTitle(String title, Pageable pageable) {
        return notesRepository.findByTitleContaining(title, pageable);
    }
}
