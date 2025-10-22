package org.example.note.repository;

import org.example.note.model.Notes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotesRepository extends JpaRepository<Notes, Integer> {
    Page<Notes> findByTitleContaining (String title, Pageable pageable);
}
