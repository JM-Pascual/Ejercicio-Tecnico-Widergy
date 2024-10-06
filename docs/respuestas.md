# Ejercicio

Una clínica de diagnóstico médico desea desarrollar un software de gestión de turnos para realizar exámenes de salud en sus sucursales. Los estudios a realizarse son de varios tipos (de sangre, orina, hisopado, etc). De cada sucursal se sabe el nombre y la dirección donde se encuentra.

Un paciente entra al sitio web usando usuario y contraseña y puede registrar un turno para una sucursal en el cual queda registrado su fecha de creación. Los pacientes cuentan con un número de obra social y un número de contacto telefónico.

Sin embargo, los turnos no pueden registrarse en cualquier momento del día. Cada sucursal tiene una franja horaria para la realización de cada tipo de estudio y una cantidad total de turnos que pueden ser otorgados para ese estudio en esa franja horaria. Las sucursales atienden los 7 días a la semana, los 365 días del año.

Se desea guardar toda esta información en una base de datos. Para esto es clave distinguir las entidades y las relaciones presentes entre ellas. Una entidad es un objeto propio del dominio del problema que tiene significado por sí mismo. Es caracterizado por un conjunto de atributos. Una relación es una interacción entre dos entidades que forman parte del dominio del problema.

De manera preliminar, se deben contestar primero las siguientes preguntas:

1. ¿Cuáles son las entidades principales que encontrás en el texto?
2. ¿Qué atributos tiene cada entidad?
3. ¿Qué relaciones existen entre las entidades? ¿Cómo las nombrarías?
4. ¿Podría haber más de un turno en un mismo rango horario?
5. En el modelo que diseñaste, ¿un paciente puede tener dos turnos al mismo tiempo en dos sucursales distintas? ¿Cómo lo validarías en una posible implementación?
Mirando únicamente el modelo, si se conoce el turno que tiene asignado un paciente, ¿es posible saber a qué sucursal tiene que acudir para atenderse? De ser posible, ¿cómo lo determinarías?

## Respuestas

1. Las entidades principales son: **Sucursal**, **Paciente**, **Turno** y **Estudio**.
2. Los atributos principales de cada una de las entidades son:
    - **Sucursal**: Nombre (Pk), Direccion.
    - **Paciente**: usuario (Pk), contraseña, número de obra social y teléfono de contacto.
    - **Turno**: ID_Turno (PK), fecha de creación.
    - **Estudio**: Tipo de estudio (PK).
3. Las relaciones principales existentes son:
   - **Paciente** puede tener cero o muchos **Turnos** (0:N), pero todos los **Turnos** están asociados a un solo **Paciente** (1).
    - **Sucursal** puede tener cero o muchos **Turnos** (0:N), pero todos los **Turnos** están asociados a una sola **Sucursal** (1).
    - **Estudio** puede tener cero o muchos **Turnos** (0:N), pero todos los **Turnos** están asociados a un solo **Estudio** (1).
   
    A su vez, se podría identificar una entidad débil/secundaria **Franja Horaria** que se encargue de relacionar **Sucursal** con **Estudio**.
    - **Sucursal** puede tener una o muchas **Franjas Horarias** (1:N), pero todas las **Franjas Horarias** están asociadas a una sola **Sucursal** (1).
    - **Estudio** puede tener una o muchas **Franjas Horarias** (1:N), pero todas las **Franjas Horarias** están asociadas a un solo **Estudio** (1).
4. Sí, podría haber más de un turno en un mismo rango horario.
  Por eso es importante tener un atributo (columna) que permita identificar para un determinado estudio en una determinada franja horaria cuantos turnos se pueden asignar.
5. En primera instancia no hay lógica a nivel Base de Datos o relación entre entidades que **No** permita a un usuario registrarse en más de un turno en el mismo horario (En diferentes o la misma sucursal), ya que un paciente puede estar asociado a varios turnos.
   Se podría implementar una posible solución para esta problemática a nivel aplicación. Un ejemplo posible sería:
    - Al momento de recibir una request generada utilizando la app a manos de un paciente registrado, se realiza una consulta aprovechando los campos dentro del cuerpo del mensaje.
    - Un ejemplo podría ser (Utilizando una base Postgres): 
    ```sql
    SELECT COUNT(*) 
    FROM TablaTurnos 
    WHERE ID_Paciente = 'ID_Paciente' 
        AND FechaTurno = FechaTurno
        AND HorarioTurno = HorarioTurno;
    ```
   - Si la longitud de la respuesta es mayor a 0, se podría retornar un mensaje de error al usuario indicando que tiene horarios superpuestos y evitar realizar el POST del turno en el servicio de turnos.
   - Esta query se podría aumentar en cobertura de casos añadiendo algún tipo de lógica que no solo busque colisiones de horario exactas sino por rangos horarios basándose en duración de los estudios o distancia entre sedes.
   - Por ejemplo, un usuario que tiene turno 9:30 AM para un estudio en sede "Paternal" no debería ser capaz de sacar un turno 9:45 AM en sede "Recoleta", pero tal vez si debería poder sacarlo en la misma sede en caso de ser un estudio corto.