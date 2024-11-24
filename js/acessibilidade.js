// IIFE para encapsulamento
(() => {
  const NS = 'accessibility_magnifier_' + Math.random().toString(36).slice(2, 9);
  
  // Criação otimizada dos elementos
  const createEl = (tag, styles) => {
    const el = document.createElement(tag);
    Object.assign(el.style, styles);
    return el;
  };

  const createElements = () => {
    // Estilos base compartilhados
    const baseStyles = {
      position: 'fixed',
      width: '150px',
      height: '150px',
      borderRadius: '50%',
      pointerEvents: 'none',
      display: 'none'
    };

    const magnifier = createEl('div', {
      ...baseStyles,
      border: '2px solid #666',
      overflow: 'hidden',
      zIndex: '2147483647',
      boxShadow: '0 0 10px rgba(0,0,0,0.3)',
      willChange: 'transform',
      backfaceVisibility: 'hidden',
      background: 'white'
    });
    magnifier.id = `${NS}_magnifier`;

    const magnifierContent = createEl('div', {
      position: 'absolute',
      transformOrigin: 'top left',
      pointerEvents: 'none',
      background: 'white'
    });
    magnifierContent.id = `${NS}_content`;

    const hiddenArea = createEl('div', {
      ...baseStyles,
      zIndex: '2147483646',
      background: 'white'
    });
    hiddenArea.id = `${NS}_hidden_area`;

    const lupaToggle = createEl('button', {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      border: 'none',
      background: '#fff',
      boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
      cursor: 'pointer',
      zIndex: '2147483648',
      fontSize: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background-color 0.3s',
      pointerEvents: 'auto'
    });
    lupaToggle.id = `${NS}_toggle`;
    lupaToggle.innerHTML = '🔍';

    magnifier.appendChild(magnifierContent);
    return { magnifier, magnifierContent, hiddenArea };
  };

  // Inicialização
  const init = () => {
    const elements = createElements();
    const { magnifier, magnifierContent, hiddenArea} = elements;
    
    // Adiciona elementos apenas se não existirem
    if (!document.getElementById(magnifier.id)) {
      const fragment = document.createDocumentFragment();
      fragment.append(hiddenArea, magnifier);
      document.body.appendChild(fragment);
    }

    // Cache de elementos e valores frequentemente usados
    const state = {
      isActive: false,
      zoomLevel: 1.5,
      size: 150,
      halfSize: 75,
      pageSize: {
        width: 0,
        height: 0
      },
      rafId: null
    };

    // Atualiza dimensões da página
    const updatePageSize = () => {
      state.pageSize = {
        width: Math.max(
          document.documentElement.scrollWidth,
          document.body.scrollWidth,
          document.documentElement.offsetWidth
        ),
        height: Math.max(
          document.documentElement.scrollHeight,
          document.body.scrollHeight,
          document.documentElement.offsetHeight
        )
      };
    };

    // Otimização com RequestAnimationFrame
    const updateMagnifier = (e) => {
      if (!state.isActive) return;
      
      state.rafId = requestAnimationFrame(() => {
        const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        
        const x = e.pageX - scrollX;
        const y = e.pageY - scrollY;
        const left = `${x - state.halfSize}px`;
        const top = `${y - state.halfSize}px`;

        // Atualiza posições
        Object.assign(magnifier.style, { left, top });
        Object.assign(hiddenArea.style, { left, top });
        
        // Atualiza conteúdo apenas se necessário
        if (!magnifierContent.innerHTML) {
          updatePageSize();
          Object.assign(magnifierContent.style, {
            width: `${state.pageSize.width}px`,
            height: `${state.pageSize.height}px`
          });
          
          const clone = document.documentElement.cloneNode(true);
          // Remove elementos da lupa do clone
          [magnifier.id, hiddenArea.id].forEach(id => {
            const el = clone.querySelector(`#${id}`);
            el?.remove();
          });
          magnifierContent.innerHTML = clone.outerHTML;
        }

        // Atualiza transformação
        magnifierContent.style.transform = `
          translate(${-e.pageX * state.zoomLevel + state.halfSize}px,
                   ${-e.pageY * state.zoomLevel + state.halfSize}px)
          scale(${state.zoomLevel})
        `;
      });
    };

    // Toggle otimizado
    const handleToggle = (e) => {
      e.stopPropagation();
      state.isActive = !state.isActive;
      const display = state.isActive ? 'block' : 'none';
      
      magnifier.style.display = display;
      hiddenArea.style.display = display;
      

      if (state.isActive) {
        magnifierContent.innerHTML = '';
        document.addEventListener('mousemove', updateMagnifier, { passive: true });
      } else {
        document.removeEventListener('mousemove', updateMagnifier);
        cancelAnimationFrame(state.rafId);
      }
    };

    // Event listeners
    document.getElementById('lupa-acs').addEventListener('click', handleToggle);
    
    // Cleanup
    window[`${NS}_cleanup`] = () => {
      document.removeEventListener('mousemove', updateMagnifier);
      cancelAnimationFrame(state.rafId);
      [magnifier, hiddenArea].forEach(el => el.remove());
      delete window[`${NS}_cleanup`];
    };
  };

  // Inicializa quando o DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();

document.addEventListener("DOMContentLoaded", function () {
  // Elementos da máscara de leitura
  const readingMaskContainer = document.getElementById(
    "reading-mask-container"
  );
  const mascaraToggle = document.getElementById("mascara-toggle");
  const topMask = document.getElementById("top-mask");
  const readingLine = document.getElementById("reading-line");
  const bottomMask = document.getElementById("bottom-mask");

  // Elementos do leitor de acessibilidade
  const leitorButton = document.getElementById("leitor-acs");
  const leitorContainer = document.getElementById("leitor-container");
  const leitorText = document.getElementById("leitor-text");
  const pauseButton = document.getElementById("leitor-pause");
  const stopButton = document.getElementById("leitor-stop");

  // Verificar se os elementos necessários existem
  if (
    !readingMaskContainer ||
    !mascaraToggle ||
    !topMask ||
    !readingLine ||
    !bottomMask ||
    !leitorButton ||
    !leitorContainer ||
    !leitorText ||
    !pauseButton ||
    !stopButton
  ) {
    console.error("Elementos necessários não encontrados");
    return;
  }

  // Máscara de Leitura
  let isReadingMaskActive = false;

  // Adicionar estilo ao botão de toggle da máscara
  mascaraToggle.style.cursor = "pointer";

  function updateMaskPosition(y) {
    if (!isReadingMaskActive) return;

    const windowHeight = window.innerHeight;
    const maskHeight = 80; // Altura da linha de leitura

    // Posicionar a linha de leitura centralizada no toque ou mouse
    const linePosition = y - maskHeight / 2;

    // Atualizar posições
    topMask.style.height = `${linePosition}px`;
    readingLine.style.top = `${linePosition}px`;
    bottomMask.style.height = `${windowHeight - linePosition - maskHeight}px`;
  }

  function toggleReadingMask() {
    isReadingMaskActive = !isReadingMaskActive;
    readingMaskContainer.style.display = isReadingMaskActive ? "block" : "none";

    if (isReadingMaskActive) {
      mascaraToggle.style.border = "2px solid #d3d2d2";
      // Adicionar eventos para mouse e toque
      document.addEventListener("mousemove", (e) =>
        updateMaskPosition(e.clientY)
      );
      document.addEventListener("touchmove", (e) =>
        updateMaskPosition(e.touches[0].clientY)
      );
    } else {
      mascaraToggle.style.backgroundColor = "";
      document.removeEventListener("mousemove", (e) =>
        updateMaskPosition(e.clientY)
      );
      document.removeEventListener("touchmove", (e) =>
        updateMaskPosition(e.touches[0].clientY)
      );
    }
  }

  mascaraToggle.addEventListener("click", toggleReadingMask);

  window.addEventListener("resize", () => {
    if (isReadingMaskActive) {
      updateMaskPosition(window.innerHeight / 2);
    }
  });

  // Leitor de Acessibilidade
  let isActive = false;
  let isPaused = false;

  const synthesis = window.speechSynthesis;

  function setupVoice() {
    const utterance = new SpeechSynthesisUtterance();

    const voices = synthesis.getVoices();

    const ptVoice = voices.find((voice) => voice.lang.includes("pt"));

    if (ptVoice) {
      utterance.voice = ptVoice;
    }

    utterance.lang = "pt-BR";
    utterance.rate = 1;
    utterance.pitch = 1;

    return utterance;
  }

  function startReading(text) {
    if (synthesis.speaking) {
      synthesis.cancel();
    }

    if (text) {
      currentUtterance = setupVoice();
      currentUtterance.text = text;
      synthesis.speak(currentUtterance);
      leitorText.textContent = text;
      isPaused = false;
      updatePauseButtonText();
    }
  }

  function updatePauseButtonText() {
    pauseButton.textContent = isPaused ? "Continuar" : "Pausar";
  }

  function handleTextSelection() {
    if (!isActive) return;

    const selection = window.getSelection();

    selectedText = selection.toString().trim();

    if (selectedText) {
      startReading(selectedText);
    }
  }

  function toggleLeitor() {
    isActive = !isActive;

    leitorContainer.style.display = isActive ? "block" : "none";

    leitorButton.style.borderColor = isActive ? "#d3d2d2" : "";
    
    if (isActive) {
      document.addEventListener("mouseup", handleTextSelection);
      document.addEventListener("touchend", handleTextSelection); // Para dispositivos móveis
    } else {
      document.removeEventListener("mouseup", handleTextSelection);
      document.removeEventListener("touchend", handleTextSelection); // Para dispositivos móveis
      synthesis.cancel();
      leitorText.textContent = "Selecione um texto para começar a leitura";
      isPaused = false;
      updatePauseButtonText();
    }
  }

  leitorButton.addEventListener("click", toggleLeitor);

  pauseButton.addEventListener("click", () => {
    if (synthesis.speaking) {
      if (isPaused) {
        synthesis.resume();
      } else {
        synthesis.pause();
      }

      isPaused = !isPaused;
      updatePauseButtonText();
    }
  });

  stopButton.addEventListener("click", () => {
    synthesis.cancel();

    leitorText.textContent = "Selecione um texto para começar a leitura";

    isPaused = false;

    updatePauseButtonText();
  });

  leitorButton.style.cursor = "pointer";

  synthesis.addEventListener("voiceschanged", () => {
    setupVoice();
  });
});
