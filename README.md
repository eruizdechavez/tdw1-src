Taller de desarrollo web
========================

Requisitos
----------

- Internet (duh)
- Cuenta de GitHub
- Virtual Box
- Vagrant

Configuracion
-------------

### Editar el archivo hosts local.

- En Windows: `C:\Windows\System32\etc\drivers\hosts`
- En Mac y Linux: `/etc/hosts`

Para guardar los cambios se requiere abrir el archivo como administrador, de lo contrario no permitira el cambio.

Agregar la siguiente linea al final del archivo:

```
192.168.56.103    tdw.local
```

### Clonar repositorio

https://github.com/erickrdch/tdw1-src

### Iniciar la maquina virtual

Abrir una terminal (o consola, o linea de comandos) y cambiarnos al directorio del repositorio. Una vez ahi, ejecutar el siguiente comando:

```
vagrant up
```

Esto va a tardar un buen rato, dependiendo de la velocidad de internet que tengan pues va a bajar un ISO de linux, configurar la maquina virtual, dependencias, etc.

En adelante, siempre que querramos usar nuestra maquina virtual haremos el mismo comando (`vagrant up`) el cual ya no requiere internet y tomara menos de 5 minutos.

Para parar la maquina virtual NO debemos usar virtualbox directamente pues esto podria alterar la configuracion de vagrant. En su lugar, para detenerla usaremos el siguiente comando dentro de la carpeta del proyecto:

```
vagrant suspend
```

Si por algun motivo es necesario reconfigurar la maquina virtual (cambio de configuracion, nuevos paquetes, etc) les pedire que hagan el siguiente comando:

```
vagrant provision
```

No esta por demas mencionar que todos estos comandos deben siempre ser ejecutados dentro de la carpeta del proyecto.

### Probando el local

Una vez que vagrant haya terminado, podremos comprobar que todo esta funcionando abriendo el navegador estas dos URLs:

- Servidor local: [http://tdw.local](http://tdw.local)
- API local: [http://tdw.local/api/](http://tdw.local/api/)
