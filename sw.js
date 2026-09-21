// Service worker do app de treino.
//
// Faz duas coisas: deixa o app ser instalado na tela de início e guarda a
// casca (HTML, ícones, plano) para ele abrir sem internet. O plano do dia
// precisa estar disponível às 6h da manhã mesmo sem sinal.
//
// O que NUNCA é guardado aqui: as chamadas à API do Intervals.icu. Elas
// trazem dado que muda e levam a chave no cabeçalho — passam direto.

const CACHE = 'treino-v1';
const CASCA = ['./', './index.html', './dados.json',
               './icon-192.png', './icon-512.png', './manifest.json'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CASCA)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((nomes) => Promise.all(nomes.filter((n) => n !== CACHE).map((n) => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;          // API e fontes: direto
  if (e.request.method !== 'GET') return;

  // Rede primeiro para o plano, para ele pegar a versão nova quando houver
  // sinal; cache como rede de segurança.
  e.respondWith(
    fetch(e.request)
      .then((resp) => {
        const copia = resp.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copia));
        return resp;
      })
      .catch(() => caches.match(e.request).then((r) => r || caches.match('./index.html')))
  );
});
