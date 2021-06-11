# Lunaticos API
Hosted on Cloudflare Workers

## Endpoints
| Endpoint                | Method | Descrição                                          | Payload                               |
| ----------------------- | ------ | -------------------------------------------------- | ------------------------------------- |
| /materia/{materiaID}    | (GET)  | Retorna todas as informações sobre uma matéria;    |   |
| /atividade/{ativiadeID} | (GET)  | Retorna todas as informações sobre uma tarefa;     |   |
| /atividade/{ativiadeID}/delete/{auth} | (GET) | Apaga uma tarefa, se autenticado;     |   |
| /logistica              | (GET)  | Retorna todas as informações sobre logistica;      |   |
| /postar                 | (POST) | Posta uma atividade; (Requer autenticação);        | {"auth","title","content","materiaID"} |



