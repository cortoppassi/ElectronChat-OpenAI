const { app, BrowserWindow, screen} = require('electron');

const createWindow = () => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize; //Dimensões da área de trabalho do monitor principal.
  const windowWidth = 400; // (Número): Define a largura da janela em pixels.
  const windowHeight = 500; //  (Número): Define a altura da janela em pixels.
  const x = width - windowWidth;
  const y = height - windowHeight;

    const win = new BrowserWindow({
        width: windowWidth,
        height: windowHeight,
        x: x,
        y: y,
        frame: false, //  (Booleano): Define se a janela possui uma barra de título e bordas.
        transparent: true, // (Booleano): Define se a janela é transparente.
        alwaysOnTop: true, //(Booleano): Define se a janela está sempre no topo de outras janelas.
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
        img.style.width = '440px';
        img.style.height = '440px';
        img.style.zindex = '9999';
        img.style.clipPath = 'circle(100px at center)';
        img.style.objectFit = 'cover';
        img.style.overflow = 'hidden';
        document.body.appendChild(img);

        let divNext = document.getElementById("__next");
        let visibilidade = true;
        
        const eventoDeClickImg = () => {
            if (visibilidade) {
                divNext.style.display = 'none';
                minimizar();
            } else {
                divNext.style.display = 'block';
            }
            visibilidade = !visibilidade;
            console.log('A imagem foi clicada!');
        };
        
        function minimizar() {
          console.log('Minimooo!')
        }

      img.addEventListener('click', eventoDeClickImg);
    `);
  });
};

app.whenReady().then(() => {
  createWindow();
});