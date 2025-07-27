
## Instalação

Aqui o passo-a-passo para instalação local do projeto.

### Configurando o ambiente

 - Clone o [repositório](https://github.com/dvanael/calculadora-historico)

```bash
git clone https://github.com/dvanael/calculadora-historico.git
```

- Crie um ambiente virtual

```bash
python -m venv .venv
```

- Ative o ambiente virtual

_windows_
```powershell
.venv/Scripts/activate
```
_linux, macOs_
```bash
source .venv/bin/activate
```

---

### Configurando sua máquina

- Instale as dependências

```bash
pip install -r requirements.txt
```

- Crie as variáveis de ambiente em um arquivo `.env`

```
SECRET_KEY=dev-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ORIGINS=http://localhost, http://127.0.0.1
```

- Faça as migrações necessárias

```bash
python manage.py migrate
```

---

### Rodando o servidor

- Rode o servidor

```bash
python manage.py runserver
```

- Acesse a aplicação localmente

  - **[localhost:8000/](http://localhost:8000/)**

---
