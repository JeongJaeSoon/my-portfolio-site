# my-portfolio-site Docker

### SET UP

1. Clone docker-compose File 

    ```bash
    $ git clone -b docker-compose https://github.com/JeongJaeSoon/my-portfolio-site.git
    ```

2. Directory cleanup & docker-compose build / up

    ```bash
    $ cd my-portfolio-site
    $ mkdir mysql
    $ docker-compose build && docker-compose up -d
    ```
    
3. Check Nginx Server Status
    - react : http://localhost:3000
    - laravel : http://localhost:8888
