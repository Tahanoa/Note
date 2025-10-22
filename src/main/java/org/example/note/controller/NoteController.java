package org.example.note.controller;

import jakarta.validation.Valid;
import org.example.note.model.Notes;
import org.example.note.service.NotesService;
import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(allowedHeaders = "*", origins = "*")
@RestController
@RequestMapping("/notes")
public class NoteController {
    private final NotesService notesService;
    private final MessageSourceAccessor messageSource;
    public NoteController(NotesService notesService, MessageSourceAccessor messageSource) {
        this.notesService = notesService;
        this.messageSource = messageSource;
    }


    @PostMapping("/addNotes")
    public ResponseEntity<Object> addNote(@RequestBody @Valid Notes notes) {
        try {
            notesService.addNote(notes);
            return ResponseEntity.ok().body(messageSource.getMessage("Note.added.successfully" ,"Note.added.successfully"  ));
        }catch (RuntimeException e){
            return ResponseEntity.status(409).body(e.getMessage());
        }
    }


    @GetMapping("/findAll")
    public ResponseEntity<Page<Notes>>findAll(Pageable pageable) {
        try {
            return ResponseEntity.ok().body( notesService.getAllNotes(pageable));
        }catch (RuntimeException e) {
            return ResponseEntity.status(409).body(null);
        }
    }


    @GetMapping("/findAllByTitle/{title}")
    public ResponseEntity<Object> findAllByTitle(@PathVariable String title, Pageable pageable) {
        try {
            Page<Notes> task = notesService.findByTitle(title, pageable);
            return ResponseEntity.ok(task);
        }catch (Exception e){
            return ResponseEntity.status(404).body("Note.not.found");
        }
    }


    @GetMapping("/getTaskById/{id}")
    public ResponseEntity<Notes> getById(@PathVariable int id) {
        try {
            return ResponseEntity.ok().body(notesService.getNote(id));
        }catch (RuntimeException e) {
            return ResponseEntity.status(409).body(null);
        }
    }


    @GetMapping("/delete/{id}")
    public ResponseEntity<Object> delete(@PathVariable int id) {
        try {
            notesService.deleteNote(id);
            return ResponseEntity.ok().body(messageSource.getMessage("Note.deleted.successfully" , "Task.deleted.successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(409).body(e.getMessage());
        }
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<Object> update(@PathVariable int id, @RequestBody @Valid Notes notes) {
        Notes existingNote = notesService.getNote(id);
        if (existingNote == null) {
            return ResponseEntity.status(404).body("Note.not.found");
        }

        existingNote.setTitle(notes.getTitle());
        existingNote.setContent(notes.getContent());

        Notes updatedTask = notesService.updateNote(existingNote);
        return ResponseEntity.ok().body(messageSource.getMessage("Task.updated.successfully", "Task.updated.successfully"));
    }

}
