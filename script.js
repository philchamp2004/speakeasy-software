// Sprachwahl Funktionalität
document.getElementById('language-btn').addEventListener('click', () => {
    const selectedLanguage = prompt("Bitte wählen Sie Ihre Sprache: (z.B. Deutsch, Englisch)");
    if (selectedLanguage) {
      alert(`Sie haben "${selectedLanguage}" gewählt!`);
    } else {
      alert("Keine Sprache ausgewählt.");
    }
  });
  
  // Interaktion mit Karten
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
      const translation = card.dataset.translation;
      alert(`Übersetzung starten: ${translation}`);
    });
  });
  
  // CTA Button Interaktivität
  document.querySelector('.cta-btn').addEventListener('click', () => {
    alert('Willkommen! Diese Funktion ist noch nicht verfügbar.');
  });

  // script.js

// Liste der Sprachkombinationen
const languagePairs = [
    { from: "Deutsch", to: "Englisch", fromFlag: "de", toFlag: "gb" },
    { from: "Spanisch", to: "Französisch", fromFlag: "es", toFlag: "fr" },
    { from: "Chinesisch", to: "Französisch", fromFlag: "cn", toFlag: "fr" },
    { from: "Polnisch", to: "Italienisch", fromFlag: "pl", toFlag: "it" },
    { from: "Russisch", to: "Englisch", fromFlag: "ru", toFlag: "gb" },
    { from: "Englisch", to: "Japanisch", fromFlag: "gb", toFlag: "jp" },
    { from: "Französisch", to: "Russisch", fromFlag: "fr", toFlag: "ru" },
    { from: "Italienisch", to: "Portugiesisch", fromFlag: "it", toFlag: "pt" },
    { from: "Spanisch", to: "Arabisch", fromFlag: "es", toFlag: "sa" },
    { from: "Deutsch", to: "Türkisch", fromFlag: "de", toFlag: "tr" },
    { from: "Koreanisch", to: "Englisch", fromFlag: "kr", toFlag: "gb" },
    { from: "Hindi", to: "Französisch", fromFlag: "in", toFlag: "fr" },
    { from: "Portugiesisch", to: "Deutsch", fromFlag: "pt", toFlag: "de" },
    { from: "Thai", to: "Englisch", fromFlag: "th", toFlag: "gb" },
    { from: "Schwedisch", to: "Norwegisch", fromFlag: "se", toFlag: "no" },
  ];
  
  // Container-Element
  const cardGrid = document.getElementById("cardGrid");
  
  // Karten dynamisch generieren
  languagePairs.forEach(pair => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="https://flagpedia.net/data/flags/w580/${pair.fromFlag}.png" alt="${pair.from}">
      <img src="https://flagpedia.net/data/flags/w580/${pair.toFlag}.png" alt="${pair.to}">
      <p>${pair.from} → ${pair.to}</p>
    `;
    cardGrid.appendChild(card);
  });

  // script.js

document.getElementById("translate-btn").addEventListener("click", function () {
    const inputLanguage = document.getElementById("input-language").value;
    const outputLanguage = document.getElementById("output-language").value;
    const inputText = document.getElementById("input-text").value;
  
    // Dummy-Übersetzungslogik (später durch eine API ersetzen)
    if (inputText.trim() === "") {
      alert("Bitte geben Sie einen Text ein.");
      return;
    }
  
    // Beispielausgabe
    const translations = {
      "Hallo": { en: "Hello", fr: "Bonjour", es: "Hola" },
      "Wie geht es dir?": { en: "How are you?", fr: "Comment ça va?", es: "¿Cómo estás?" },
    };
  
    const translatedText = translations[inputText]?.[outputLanguage] || "Übersetzung nicht gefunden.";
    document.getElementById("output-text").innerText = translatedText;
  });


  document.addEventListener("DOMContentLoaded", () => {
    const inputLanguage = document.getElementById("input-language");
    const outputLanguage = document.getElementById("output-language");
    const inputText = document.getElementById("input-text");
    const outputText = document.getElementById("output-text");
    const translateBtn = document.getElementById("translate-btn");
    const copyInputBtn = document.getElementById("copy-input");
    const copyOutputBtn = document.getElementById("copy-output");
    const speakInputBtn = document.getElementById("speak-input");
    const speakOutputBtn = document.getElementById("speak-output");
    const inputFlag = document.getElementById("input-flag");
    const outputFlag = document.getElementById("output-flag");
  
    // Update Flag on Language Change
    inputLanguage.addEventListener("change", () => {
      const selectedOption = inputLanguage.options[inputLanguage.selectedIndex];
      inputFlag.src = selectedOption.dataset.flag;
    });
  
    outputLanguage.addEventListener("change", () => {
      const selectedOption = outputLanguage.options[outputLanguage.selectedIndex];
      outputFlag.src = selectedOption.dataset.flag;
    });
  
// Translate function using LibreTranslate
translateBtn.addEventListener("click", async () => {
    const text = inputText.value.trim();
    const from = inputLanguage.value;
    const to = outputLanguage.value;

    if (!text) {
      alert("Bitte geben Sie einen Text ein.");
      return;
    }

    try {
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`);
        const data = await response.json();
        outputText.value = data.responseData.translatedText;
      } catch (error) {
        console.error("Übersetzung fehlgeschlagen:", error);
        alert("Fehler bei der Übersetzung. Bitte versuchen Sie es später erneut.");
      }

  
    // Copy Text
    copyInputBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(inputText.value);
      alert("Text kopiert!");
    });
  
    copyOutputBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(outputText.value);
      alert("Text kopiert!");
    });
  
    // Text-to-Speech
    const speak = (text, lang) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      speechSynthesis.speak(utterance);
    };
  
    speakInputBtn.addEventListener("click", () => {
      const lang = inputLanguage.value;
      speak(inputText.value, lang);
    });
  
    speakOutputBtn.addEventListener("click", () => {
      const lang = outputLanguage.value;
      speak(outputText.value, lang);
    });
  });

  document.addEventListener("DOMContentLoaded", () => {
    const inputLanguage = document.getElementById("input-language");
    const outputLanguage = document.getElementById("output-language");
    const inputFlag = document.getElementById("input-flag");
    const outputFlag = document.getElementById("output-flag");
  
    // Update input flag on change
    inputLanguage.addEventListener("change", () => {
      const selectedOption = inputLanguage.options[inputLanguage.selectedIndex];
      inputFlag.src = selectedOption.dataset.flag;
    });
  
    // Update output flag on change
    outputLanguage.addEventListener("change", () => {
      const selectedOption = outputLanguage.options[outputLanguage.selectedIndex];
      outputFlag.src = selectedOption.dataset.flag;
    });


    document.addEventListener("DOMContentLoaded", () => {
        const speakButton = document.getElementById("speak-input");
        const inputText = document.getElementById("input-text");
      
        speakButton.addEventListener("click", () => {
          const text = inputText.value;
      
          if (text.trim()) {
            const utterance = new SpeechSynthesisUtterance(text);
      
            // Stoppt vorherige Instanzen
            speechSynthesis.cancel();
      
            // Startet die Sprachausgabe
            speechSynthesis.speak(utterance);
          }
        
          document.addEventListener("DOMContentLoaded", () => {
            const chooseLanguageBtn = document.getElementById("choose-language-btn");
            const languageWidget = document.getElementById("language-widget");
          
            chooseLanguageBtn.addEventListener("click", () => {
              // Widget sichtbar machen
              languageWidget.classList.remove("hidden");
            });
          });

          document.addEventListener("DOMContentLoaded", () => {
            const downloadLink = document.querySelector('a[href="#"]'); // Passe den Selektor an, falls nötig
            const widget = document.getElementById("download-widget");
            const closeWidget = document.getElementById("close-widget");
          
            // Overlay erstellen
            const overlay = document.createElement("div");
            overlay.classList.add("overlay");
            document.body.appendChild(overlay);
          
            // Widget öffnen
            downloadLink.addEventListener("click", (event) => {
              event.preventDefault(); // Verhindert Standardverhalten
              widget.classList.remove("hidden");
              overlay.style.display = "block"; // Overlay anzeigen
            });
          
            // Widget schließen
            closeWidget.addEventListener("click", () => {
              widget.classList.add("hidden");
              overlay.style.display = "none"; // Overlay ausblenden
            });
          
            // Schließen durch Klick auf Overlay
            overlay.addEventListener("click", () => {
              widget.classList.add("hidden");
              overlay.style.display = "none";
            });
          });



       
            });
          });
        });
      });
