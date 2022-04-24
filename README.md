# Test
[![Tests](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-lucianosekulic/actions/workflows/node.js.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-lucianosekulic/actions/workflows/node.js.yml)

# Coveralls
[![Coveralls](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-lucianosekulic/actions/workflows/coveralls.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-lucianosekulic/actions/workflows/coveralls.yml)

# Sonarcloud
[![Sonar-Cloud](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-lucianosekulic/actions/workflows/sonarcloud.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-lucianosekulic/actions/workflows/sonarcloud.yml)


# Informe Practica 9: Aplicación de procesamiento de notas de texto

## Introducción
En esta practica 9 se tendrá que implementar una aplicación de procesamiento de texto, la cual permitirá añadir, modificar, eliminar, listar y lee las notas de un usuario, para que luego se almacenen en ficheros JSON.

## Fichero Notas.ts
En este fichero se tendrá una clase ***Notas*** donde se usarán las funciones de la ***API sincrona*** para que se ejecuten mediante línea de comandos alguno de los comandos implementados tales como añadir, modificar, eliminar o listar una nota. A continuación se procederá a explicar el funcionamiento de la clase.

### Enum colores

En primer lugar se ha creado un **enum** el cual contendrá los colores indicados en el guión de la practica.

**Enum colores**
```
export enum colores {
  rojo = 'red',
  verde = 'green',
  azul = 'blue',
  amarillo = 'yellow'
}
``` 

### Clase ***Nota***
Luego, la estructura de la clase ***Nota*** se ha decidido que contrendrá un método getNota y un método especifico para poder llevar a cabo el añadir, modificar, eliminar o listar una nota del usuario. Para ello se propone una estructura como la siguiente:

**Clase Nota**
```

export class Notas {

  private static notas: Notas;

  private constructor() { }

  public static getNotas(): Notas {
  ... 
  ...
  }

  anadirNota(nombre: string, titulo: string, contenido: string, color: colores): string {
  ...
  ...
  }

  
  leerNota(nombre: string, titulo: string) {
   ...
   ...
  }

  modificarNota(nombre: string, titulo: string, contenido: string, color: colores): string {
   ...
   ...
  }

  listarNotas(nombre: string): string {
   ...
   ...
  }


  eliminarNota(nombre: string, titulo: string) {
    ...
    ...
  }
}
```

#### Funciones getNota, añadir, leer, modificar, listar y eliminar

* ***getNota:*** Esta función indica si no existe la carpeta denominada como **"ficheros"** donde se alojan los JSON, se cree y además se instancia un objeto de tipo **Notas**.

```
public static getNotas(): Notas {
    if (!fs.existsSync(`./ficheros`)) {
      fs.mkdirSync(`./ficheros`, {recursive: true});       
    }

    if (!Notas.notas) {
      Notas.notas = new Notas();
    }

    return Notas.notas;
  }
```

* ***añadir:*** Esta función se ha creado para añadir una nota en la ruta de un autor. En cuanto a su funcionamiento, se comprueba que exista el usuario y en caso correcto, se comprueba si existe un fichero con el nombre que se le ha pasado, en caso contrario se envía un mensaje de error.

```
anadirNota(nombre: string, titulo: string, contenido: string, color: colores): string {
    const nota: string = `{"titulo": "${titulo}", "contenido": "${contenido}", "color": "${color}"}`;
    const estiloJSON: string = titulo.split(' ').join('');
    const mensajeOK: string = `Nota anadida`;
    const mensajeError: string = `Existe una nota con dicho nombre`;

    if(fs.existsSync(`./ficheros/${nombre}`)) {
      if(fs.existsSync(`./ficheros/${nombre}/${estiloJSON}.json`)) {
        console.log(chalk.red(mensajeError));
        return mensajeError;
      } else {
        fs.writeFileSync(`./ficheros/${nombre}/${estiloJSON}.json`, nota);
        console.log(chalk.green(mensajeOK));
        return mensajeOK;
      }
    } else {
      fs.mkdirSync(`./ficheros/${nombre}`, {recursive: true});
      fs.writeFileSync(`./ficheros/${nombre}/${estiloJSON}.json`, nota);
      console.log(chalk.green(mensajeOK));
      return mensajeOK;
    }
  }
```

* ***leer:*** Función para leer una nota de un autor en concreto. En cuanto a su funcionamiento, en primer lugar se trata de buscar al usuario y el nombre de la nota, en el caso de que no la encuentre, se lanza un mensaje indicando al usuario de que la nota no existe.

```
leerNota(nombre: string, titulo: string) {
    const estiloJSON: string = titulo.split(' ').join('');

    if(fs.existsSync(`./ficheros/${nombre}/${estiloJSON}.json`)) {
      const contenidoNota = fs.readFileSync(`./ficheros/${nombre}/${estiloJSON}.json`);
      const contenidoJSON = JSON.parse(contenidoNota.toString());

      console.log(chalk.keyword(contenidoJSON.color)(contenidoJSON.titulo + '\n\n'));
      console.log(chalk.keyword(contenidoJSON.color)(contenidoJSON.contenido));

      const nota: string = (contenidoJSON.titulo + '\n\n' + contenidoJSON.contenido);
      return nota; 
    } else {
      const mensajeError: string = `Nota no encontrada`;                                  
      console.log(chalk.red(mensajeError));
      return mensajeError;
    }
```

* ***Modificar:*** Función para modificar una nota en concreto. En cuanto a su funcionamiento, se busca al usuario y a la nota, en caso de que exista se sobreescribe y se lanza un mensaje de exito, en caso contrario se lanzará un mensaje de error ya sea por no encontrar al usuario o por no encontrar la nota.

```
modificarNota(nombre: string, titulo: string, contenido: string, color: colores): string {
    const nota: string = `{"titulo": "${titulo}", "contenido": "${contenido}", "color": "${color}"}`;
    const estiloJSON: string = titulo.split(' ').join('');
    const mensajeOK: string = `La nota se ha sobrescrito`;
    const mensajeError1: string = `No existe ninguna nota con ese nombre`;
    const mensajeError2: string = `Usuario no encontrado`;

    if(fs.existsSync(`./ficheros/${nombre}`)) {
      if(fs.existsSync(`./ficheros/${nombre}/${estiloJSON}.json`)) {
        fs.writeFileSync(`./ficheros/${nombre}/${estiloJSON}.json`, nota);

        console.log(chalk.green(mensajeOK));
        return mensajeOK;
      } else {
        console.log(chalk.red(mensajeError1));
        return mensajeError1;
      }
    } else {
      console.log(chalk.red(mensajeError2));
      return mensajeError2;
    }
  }
```

* ***Listar:*** Función para listar todas las notas de un autor. En cuanto a su funcionamiento, se busca al usuario y mediante fs.readFileSync se leen esas notas guardandolas en una variable string para que luego se muestren. En el caso de que no encuentre al usuario se lanzara un mensaje de error.

```
listarNotas(nombre: string): string {
    if (fs.existsSync(`./ficheros/${nombre}`)) {
      console.log(`Tienes las siguientes notas: `);
      let notas: string = '';

      fs.readdirSync(`./ficheros/${nombre}/`).forEach((nota) => {
        const contenido = fs.readFileSync(`./ficheros/${nombre}/${nota}`);
        const contenidoJSON = JSON.parse(contenido.toString());

        console.log(chalk.keyword(contenidoJSON.color)(contenidoJSON.titulo));
        notas = notas + contenidoJSON.titulo + '\n';
      });
      return notas;
    } else {
      const mensajeError: string = 'Usuario no encontrado';
      console.log(chalk.red(mensajeError));
      return mensajeError;
    }
  }
```

* ***Eliminar:*** Función para eliminar una nota concreta de una autor. En cuanto a su funcionamiento, se busca al usuario y a la nota, en caso de encontrarse se borra la nota y se lanza un mensaje de exito. En el caso contrario se lanza un mensaje de error debido a que no se ha encontrado la ruta o el usuario.

```
eliminarNota(nombre: string, titulo: string) {
    const estiloJSON: string = titulo.split(' ').join('');

    if(fs.existsSync(`./ficheros/${nombre}/${estiloJSON}.json`)) {
      fs.rmSync(`./ficheros/${nombre}/${estiloJSON}.json`);

      const mensajeEliminado: string = 'Nota eliminada con exito';
      console.log(chalk.green(mensajeEliminado));
      return mensajeEliminado;
    } else {
      const mensajeNoEliminado: string = 'Nota no eliminada, posible error en la ruta o en el nombre';
      console.log(chalk.red(mensajeNoEliminado));
      return mensajeNoEliminado;
    }
  }
```

## Fichero ***notaApp.ts***
En este fichero se van a crear los comandos mediante el uso de **yargs**, donde se usarán las funciones anteriormente creadas y explicadas en el punto anterior. En cuanto a la creación de un comando es similar en todos y será la siguiente:

**Ejemplo de como realizar un comando**
```
yargs.command({
  command: 'delete',
  describe: 'Elimina una nota',
  builder: {
    user: {
      describe: 'Usuario',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Titulo',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if(typeof argv.user === 'string' && typeof argv.title === 'string') {
      notas.eliminarNota(argv.user, argv.title);
    }
  },
});
```

* Command: se le indica el nombre del comando.
* Describe: Es el bloque donde se va a escribir la acción que realizará el comando.
* Builder: Son las opciones que tendrá la acción. Son las siguientes: describe (nombre del argumento), demandOption (se le indica si el argumento es obligatorio), type (indicamos el tipo del argumento que se recibe).
* Handler: Se le pasa argv como parametro para obtener los argumentos y los valores especificados dentro del builder. Por último, se comprueba que los argumentos son del tipo que se requiere.



