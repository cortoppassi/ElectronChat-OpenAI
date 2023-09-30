const { app, BrowserWindow, screen} = require('electron');


const createWindow = () => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  const windowWidth = 400;
  const windowHeight = 500;
  const x = width - windowWidth;
  const y = height - windowHeight;

    const win = new BrowserWindow({
        width: windowWidth,
        height: windowHeight,
        x: x,
        y: y,
        frame: false,
        transparent: true,
        alwaysOnTop: true,
    });
  win.loadURL('https://chat.openai.com/');

  // win.webContents.openDevTools();
  win.webContents.on('did-finish-load', () => { //Executar o código quando o conteúdo da janela for carregado.
  
    win.webContents.executeJavaScript(`
        const img = document.createElement('img');
        img.src = 'https://i.pinimg.com/originals/ae/d1/1d/aed11d6975231b91c8e992c02b8376da.gif';
        img.style.position = 'absolute';
        img.style.top = '0';
        img.style.left = '0';
        img.style.width = '130px';
        img.style.height = '130px';
        img.style.zindex = '9999';
        img.style.clipPath = 'circle(30px at center)';
        img.style.objectFit = 'cover';
        img.style.overflow = 'hidden';
        document.body.appendChild(img);

        let visibilidade = false;

        const eventoDeClickImg = () => {
          if (!visibilidade) {
            console.log('click');
            startRecognition()
            captureText();
            visibilidade = true;
          } else {
            console.log('clack');
            visibilidade = false;
          }
        };
        img.addEventListener('click', eventoDeClickImg);

        function captureText() {
          const divElement = document.querySelector('.markdown');
          const valorDaDiv = divElement.textContent;
          console.log(valorDaDiv);
        }
        
        function startRecognition() {
          recognition = new (webkitSpeechRecognition || SpeechRecognition)();
          recognition.lang = 'pt-BR';

          recognition.onresult = function(event) {
              const text = event.results[0][0].transcript;
              document.getElementById('prompt-textarea').innerText = text;
          };

          recognition.onerror = function(event) {
              console.error('Erro de reconhecimento:', event.error);
          };

          recognition.start();
        }

        const divElement = document.getElementById('__next');
        function convertToSpeech() {
          const paragraphs = divElement.querySelectorAll('p');
        
          let textoParaFala = '';
          paragraphs.forEach((paragraph) => {
            textoParaFala += paragraph.textContent + ' ';
          });
        
          const synthesis = window.speechSynthesis;
          const utterance = new SpeechSynthesisUtterance(textoParaFala);
          utterance.lang = 'pt-BR';

          synthesis.speak(utterance);
        }
        
        const observer = new MutationObserver(convertToSpeech);
        const observerOptions = {
          childList: true, // Observar mudanças nos filhos (parágrafos) do nó alvo.
          subtree: true,   // Observar mudanças em todos os nós descendentes.
        };
        
        // Inicie a observação no elemento alvo usando as opções configuradas
        observer.observe(divElement, observerOptions);
        
    `);
  });

};

app.whenReady().then(() => {
  createWindow();
});