document.addEventListener('DOMContentLoaded', () => {
  const notesList = document.getElementById('notesList');
  const clearAllBtn = document.getElementById('clearAll');
  const template = document.getElementById('noteTemplate');

  // Notları yükle
  function loadNotes() {
    chrome.storage.local.get({ notes: [] }, (result) => {
      notesList.innerHTML = '';
      
      if (result.notes.length === 0) {
        notesList.innerHTML = '<p class="empty-state">Henüz not almadınız...</p>';
        return;
      }

      result.notes.forEach(note => {
        const clone = template.content.cloneNode(true);
        
        clone.querySelector('.note-text').textContent = note.text;
        clone.querySelector('.note-url').href = note.url;
        clone.querySelector('.note-url').title = note.url;
        clone.querySelector('.note-date').textContent = note.date;
        
        const deleteBtn = clone.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => deleteNote(note.id));

        notesList.appendChild(clone);
      });
    });
  }

  // Tekil not sil
  function deleteNote(id) {
    chrome.storage.local.get({ notes: [] }, (result) => {
      const updatedNotes = result.notes.filter(n => n.id !== id);
      chrome.storage.local.set({ notes: updatedNotes }, loadNotes);
    });
  }

  // Tümünü temizle
  clearAllBtn.addEventListener('click', () => {
    if (confirm('Tüm notları silmek istediğinize emin misiniz?')) {
      chrome.storage.local.set({ notes: [] }, loadNotes);
    }
  });

  loadNotes();
});