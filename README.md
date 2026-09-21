# Treino Buritama

App de celular do plano de triatlo para a **Copa Noroeste Paulista — Sprint
Buritama, 06/12/2026**.

É um site estático: abre no navegador do celular e dá para instalar na tela de
início como app. Mostra o treino do dia com os passos prontos, a semana, e a
evolução comparando o que foi planejado com o que foi treinado de verdade.

## Como usar

1. Abra o endereço no celular.
2. No Android: menu do Chrome → **Instalar app**. No iPhone: botão de
   compartilhar → **Adicionar à Tela de Início**.
3. Em **Ajustes**, cole a chave do Intervals.icu
   (Settings → Developer Settings). Ela fica guardada **só no seu aparelho**.

O treino do dia funciona sem chave e sem internet. A chave serve para o app
ler o que você treinou e desenhar a evolução.

## De onde vem o conteúdo

O `dados.json` é **gerado**, não editado à mão. Ele sai do projeto em
`TRABALHO/CLAUDE/TREINOS`, que é onde moram o plano, a regra de escala e os
limiares — num lugar só, com teste. Para atualizar:

```
python sync.py app
```

e depois commit e push desta pasta.

## O que este app não faz

Não publica treinos no relógio nem grava ajuste nenhum. Isso continua no
computador, pelo `INICIAR.bat`, porque envolve a chave com permissão de
escrita e a decisão de empurrar o cronograma.

**Nada aqui substitui treinador.**
