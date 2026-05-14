export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject('Nenhum arquivo selecionado');
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = () => {
      reject('Erro ao carregar imagem');
    };

    reader.readAsDataURL(file);
  });
}

