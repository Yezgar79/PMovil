# Investigación: React Native

---

## ¿Qué es React Native?

**React Native** es un marco de trabajo (*framework*) de código abierto creado por Meta (anteriormente Facebook) en 2015. Permite el desarrollo de aplicaciones móviles multiplataforma (iOS y Android) utilizando **JavaScript** y **React**.

A diferencia de las soluciones híbridas basadas en vistas web (WebView), React Native no renderiza HTML o CSS. En su lugar, se comunica con los hilos nativos de los dispositivos mediante un "puente" (*bridge*) o, en versiones más recientes, a través de la **JSI (JavaScript Interface)**. Esto significa que los componentes de React Native se transforman directamente en componentes de la interfaz de usuario nativa de cada sistema operativo, ofreciendo un rendimiento y una experiencia de usuario prácticamente idénticos a los de una aplicación nativa pura.

---

## Buenas Prácticas

Para mantener un proyecto de React Native escalable, seguro y con un rendimiento óptimo, se recomiendan las siguientes directrices:

### 1. Optimización del Rendimiento

* **Evitar renders innecesarios:** Utilizar `React.memo`, `useCallback` y `useMemo` para prevenir la recreación de funciones y componentes cuando las propiedades no han cambiado.
* **Uso eficiente de listas:** Utilizar `FlatList` o `SectionList` en lugar de `ScrollView` para renderizar colecciones de datos grandes o infinitas, ya que estas optimizan la memoria renderizando solo lo que es visible en pantalla.
* **Optimización de imágenes:** Usar formatos modernos (como WebP) y especificar tamaños fijos para evitar saltos en la interfaz (*Layout Shifts*).

### 2. Estilo y Diseño Organizativo

* **Separación de conceptos:** No mezclar la lógica de negocio con la lógica de presentación. Es recomendable usar hooks personalizados para manejar la lógica de los componentes.
* **Estilos estructurados:** Utilizar `StyleSheet.create` para definir los estilos en lugar de declararlos en línea (*inline styles*), ya que los estilos en línea se crean en cada ciclo de renderizado.

### 3. TypeScript y Tipado

* **Tipado estricto:** Implementar TypeScript desde el inicio del proyecto para capturar errores en tiempo de compilación y mejorar la autodocumentación del código.

---

## Estructura de Proyecto

Una estructura de archivos limpia y modular facilita el mantenimiento a medida que el proyecto crece. Una de las más utilizadas en la industria es la estructura basada en características o módulos (*Feature-based*) combinada con una carpeta central de recursos de desarrollo (`src`):

```text
mi-proyecto/
├── android/               # Código nativo de Android
├── ios/                   # Código nativo de iOS
├── src/                   # Código fuente de la aplicación
│   ├── assets/            # Fuentes, imágenes y videos
│   ├── components/        # Componentes reutilizables globales (Botones, Inputs)
│   ├── config/            # Variables de entorno y configuraciones (API, Firebase)
│   ├── hooks/             # Hooks personalizados globales
│   ├── navigation/        # Configuración de rutas y navegación (React Navigation)
│   ├── screens/           # Pantallas de la aplicación (Home, Login, Perfil)
│   ├── services/          # Llamadas a APIs y servicios externos (Axios, Fetch)
│   ├── store/             # Gestión de estado global (Redux, Zustand, Context)
│   ├── utils/             # Funciones utilitarias y formateadores
│   └── App.tsx            # Componente raíz de la aplicación
├── index.js               # Punto de entrada del framework
├── package.json           # Dependencias y scripts del proyecto
└── tsconfig.json          # Configuración de TypeScript

```

---

## Tipos de Datos y su Renderizado en la Vista

En React Native, el estado (`useState`) se utiliza para almacenar y actualizar los tipos de datos de JavaScript. A continuación, se presentan ejemplos de constantes con diferentes tipos de datos y la línea exacta donde se procesan o renderizan dentro del contenedor de la vista (`View`).

### Código Completo (Ejemplo en TypeScript)

```tsx
import React, { useState } from 'react';
import { StyleSheet, Text, View, Switch, FlatList } from 'react-native';

// Definición de una interfaz para el tipo de dato Objeto
interface Usuario {
  nombre: string;
  edad: number;
}

export default function App() {
  // 1. Tipo de dato: String (Cadena de texto)
  const [texto, setTexto] = useState<string>("Hola Mundo");

  // 2. Tipo de dato: Number (Número)
  const [contador, setContador] = useState<number>(42);

  // 3. Tipo de dato: Boolean (Booleano)
  const [isActivo, setIsActivo] = useState<boolean>(true);

  // 4. Tipo de dato: Object (Objeto)
  const [usuario, setUsuario] = useState<Usuario>({
    nombre: "Carlos Gómez",
    edad: 28
  });

  // 5. Tipo de dato: Array (Arreglo / Lista)
  const [frutas, setFrutas] = useState<string[]>(["Manzana", "Plátano", "Naranja"]);

  return (
    <View style={styles.container}>
      {/* Línea en View para String */}
      <Text style={styles.label}>String: {texto}</Text>

      {/* Línea en View para Number */}
      <Text style={styles.label}>Number: {contador}</Text>

      {/* Línea en View para Boolean (Se usa para controlar un componente o una condición) */}
      <View style={styles.row}>
        <Text style={styles.label}>Boolean: {isActivo ? "Activo" : "Inactivo"}</Text>
        <Switch value={isActivo} onValueChange={(value) => setIsActivo(value)} />
      </View>

      {/* Línea en View para Object (Acceso a sus propiedades) */}
      <Text style={styles.label}>Object: {usuario.nombre} tiene {usuario.edad} años</Text>

      {/* Línea en View para Array (Renderizado mediante mapeo o FlatList) */}
      <Text style={styles.label}>Array:</Text>
      <FlatList
        data={frutas}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.item}>- {item}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 8,
    color: '#333',
  },
  item: {
    fontSize: 14,
    color: '#666',
    paddingLeft: 10,
  },
});

```

### Explicación de las líneas en la Vista (`View`)

* **String:** `{texto}` se incrusta directamente dentro del componente `<Text>`.
* **Number:** `{contador}` se transforma automáticamente a texto al estar dentro de las llaves del componente `<Text>`.
* **Boolean:** No se puede renderizar un booleano directamente (`true` o `false` no muestran nada en pantalla). Se utiliza el operador ternario `{isActivo ? "Activo" : "Inactivo"}` para mostrar un texto condicional, o se asigna directamente a la propiedad `value` de un componente interactivo como `<Switch>`.
* **Object:** Se accede de forma explícita a los valores primitivos de sus propiedades utilizando la notación de punto: `{usuario.nombre}` y `{usuario.edad}`.
* **Array:** Se pasa el arreglo completo a la propiedad `data` del componente `<FlatList>`, el cual se encarga de iterar los elementos internamente a través de la función `renderItem`.