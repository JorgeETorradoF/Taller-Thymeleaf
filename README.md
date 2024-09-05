# Cómo ejecutar

Se debe tener Docker y Kubernetes (k8s) instalados.

Luego, se debe desplegar el Nginx Ingress Controller en k8s con el siguiente comando:
 ```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/cloud/deploy.yaml
 ```

Una vez se haya desplegado y tenga una IP externa (en algunos casos será localhost como por ejemplo en docker desktop), se puede continuar:

1. **Cree el namespace thymeleaf:**
    ```bash
    kubectl create namespace thymeleaf
    ```

2. **Se debe tener en ejecución el contenedor registry con el comando:**
    ```bash
    docker run -d -p 5000:5000 --name registry registry:2.7
    ```
    **Si ya ejecutó almenos 1 vez el run del registry, no es necesario volver a correrlo, solo se requiere encenderlo (en caso de que esté apagado) con el comando:**
   ```bash
    docker start registry
    ```

3. **Entre a la carpeta `postgre` y ejecute el script de build y push de imagen:**
    ```bash
    buildAndPush.bat postgres-thymeleaf
    ```

4. **Entre a la carpeta `k8s` dentro de la carpeta `postgre` y aplique el deployment:**
    ```bash
    kubectl apply -f deployment.yaml
    ```

5. **Entre a la carpeta `test` y ejecute el script de build y push de imagen:**
    ```bash
    buildAndPush.bat test
    ```
   **Si surgen errores al buildear, asegurese que los caracteres de fin de línea de los archivos pom.xml y mvnw estén en formato linux y no windows, puede hacer esto mediante visual studio, seleccionando el contenido del archivo y clickeando en crlf (está ubicado abajo a su derecha) para posteriormente cambiarlo a lf 

6. **Entre a la carpeta `k8s` dentro de la carpeta `tests` y aplique el deployment y el ingress:**
    ```bash
    kubectl apply -f deployment.yaml
    kubectl apply -f ingress.yaml
    ```

7. **Para confirmar que todo salió bien ejecute el comando:**
    ```bash
    kubectl get pods -n thymeleaf
    ```

Deberían aparecerle 2 pods con estado `Running` y replicas `1/1`.
