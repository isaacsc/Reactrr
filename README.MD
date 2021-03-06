#¿Cómo funciona React.js?

Debido a su naturaleza funcional. React no necesita de listeners, observers o double-way data-binding para renderizar cambios. Los componentes de React son capaces de autogestionarse y saber cuando volver a renderizarse debido a cambios de sus estados internos o por paso de propiedades.

El acceso al DOM (Document Object Model) es una de las partes que más ralentizan una aplicación web. Es muy costoso acceder al DOM y realizar cambios, ya que tiene que comprobar todos los nodos hasta encontrar cual y que ha cambiado.

Para ello React tiene una implementación que denomina Virtual DOM, que es una representación del DOM original en memoria, pero únicamente con las propiedades necesarias que permiten identificar cambios y todo su sistema de eventos sintéticos.

Cuando llamamos a la función setState en la que añadimos un nuevo estado al Componente, React marca ese Component como dirty. Al finalizar el flujo de eventos que producen ese cambio de estado, React mira que componentes han quedado marcados como dirty y los re-renderiza.

![](https://www.filepicker.io/api/file/vpI2J8gS2i2lau3c6ewQ "")

Para identificar los cambios y decidir si renderizar el componente de nuevo o no, utiliza un [algoritmo de diffing](https://calendar.perfplanet.com/2013/diff/ "algoritmo de diffing") que consiste en que a cada cambio se genere un nuevo árbol virtual DOM, lo compara con el anterior, decide cuales son los cambios mínimos a implementar, los encola y los termina de procesar.

##Eventos sintéticos

React, con JSX, tiene una serie de eventos sintéticos que permite abstraerte de los eventos del navegador, de manera que no haya que usar ningún addEventListener u otras librerías como jQuery para tratarlos.

Nosotros colocaremos el evento en el elemento HTML que escribamos como JSX pero este no aparecerá renderizado en el HTML final como un evento inline. Este evento se va delegando a través del Virtual DOM y nuestro HTML queda limpio.

**Eventos de Mouse**

* onClick
* onContextMenu
* onDoubleClick
* onDrag
* onDragEnd
* onDragEnter
* onDragExit
* onDragLeave
* onDragOver
* onDragStart
* onDrop
* onMouseDown
* onMouseEnter
* onMouseLeave
* onMouseMove
* onMouseOut
* onMouseOver
* onMouseUp
* Eventos de Teclado

* onKeyDown
* onKeyPress
* onKeyUp
* Eventos Touch


* onTouchCancel
* onTouchEnd
* onTouchMove
* onTouchStart
* Eventos de portapapeles

* onCopy
* onCut
* onPaste
Y muchos [más](https://facebook.github.io/react/docs/events.html "eventos sinteticos")