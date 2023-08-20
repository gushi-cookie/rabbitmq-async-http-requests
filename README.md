# Deploy
Для работы проекта требуется - `Docker`, `Docker-Compose` и `root` доступ.

```
# Стянуть репозиторий
git clone https://github.com/gushi-cookie/rabbitmq-async-http-requests.git

# Перейти в директорию проекта
cd rabbitmq-async-http-requests

# Создать .env файл из .env.example файла
cp .env.example .env
nano .env

# Собрать проект в docker-compose
sudo docker-compose build

# Затем запустить
sudo docker-compose up
```


# Usage
По умолчанию зпустится http сервер под 8080 портом. Сервер принимает единственный `GET: /reverse?text=some text`. Задача этого маршрута заключается в том, чтобы отформатировать переданный текст путем его реверса, и вернуть результат. Весь процесс проходит по модели `[HTTP] <-> [M1] <-> [RabbitMQ] <-> [M2]`.

Правильней использовать `POST`, но для быстрой проверки в браузере выбрал `GET`.