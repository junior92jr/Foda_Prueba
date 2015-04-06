# Foda_Prueba

Tarea 1
-------

Por defecto el marcador mostrara la posicion actual, cuando se arrastre mostrara las direcciones en los 3 campos:
1) la direccion completa de la calle y cuadra en que se encuantra.
2) el distrito
3) la ciudad

Nota:
los valores que retorna el reverse geocoder del api de google maps, en algunas ocaciones no concuerdan con los valores de distrito que algunas veces coloca el nombre de la urbanizacion o la calle, y la ciudad que en algunas ocaciones pone a Peru como ciudad.


Tarea 2
--------

Los bugs encontrados fueron: 

- la division entera que se hacia, la cual por ejemplo lanzaba como resultado 1/2 = 0,  el cual deberia ser 1/2 = 0.5, para lo cual se incluyo 
      "from __future__ import division"  que permite a la version de python 2.7 tener una division de reales.

- otro bug era el redondeo de decimales, si precio final salia "127,4515" en la funcion "split_bill" y precio despues de descuento"price = 127,45", la solucion era redondeando el price a dos decimales.

- otro bug es la suma de reales [0.1, ... 0.1] = 0.9999999,  aunque el resultado finla deberia ser 1,  el assert no puede igualar 0.9999999 != 1.0, pero si se redondea sin decimales 0.99999999 el resultado es 1.

Adicionales
-----------

Adicionalemente a las tareas, tambien para la tarea 1 se usa un infochart en el marcador que sirve como feedback para los usuarios.
