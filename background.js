// Eklenti yüklendiğinde sağ tık menüsünü oluştur
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "quickNoteSave",
    title: "Bunu Not Al",
    contexts: ["selection"]
  });
});

// Menüye tıklandığında çalışacak fonksiyon
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "quickNoteSave") {
    const newNote = {
      id: Date.now(),
      text: info.selectionText,
      url: tab.url,
      date: new Date().toLocaleString('tr-TR'),
      title: tab.title || "Adsız Sayfa"
    };

    // Mevcut notları al ve yenisini ekle
    chrome.storage.local.get({ notes: [] }, (result) => {
      const updatedNotes = [newNote, ...result.notes];
      chrome.storage.local.set({ notes: updatedNotes }, () => {
        console.log("Not başarıyla kaydedildi.");
      });
    });
  }
});