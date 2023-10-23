# Seedy

**Introducción**

La falta de aplicaciones móviles que proporcionen información acerca del cuidado de las plantas y el desconocimiento del ciclo de vida de las mismas, es una problemática que persiste en la sociedad actual, teniendo en cuenta las transformaciones constantes de nuestro mundo tecnológico. Es bajo el conocimiento que brindan las aplicaciones que se encuentran centradas en brindar consejos o realizar la identificación de distintas especies. Esta carencia de recursos puede llevar a varios inconvenientes. En primer lugar, muchas personas sin experiencia previa en el cuidado de plantas pueden enfrentar dificultades para saber cómo mantener sus plantas adecuadamente sin una guía que los ayude. Esto puede resultar en el deterioro de las plantas debido a problemas como el riego inadecuado, la falta de luz o las plagas y enfermedades.

En segundo lugar, la ausencia de información sobre plantas puede limitar la capacidad de las personas de poder disfrutar de los beneficios de plantar en sus hogares o jardines. Sin acceso a contenidos que les enseñen cómo cuidar apropiadamente las plantas, muchas personas pueden evitar tenerlas en sus entornos. Por lo tanto, se plantea la necesidad de abordar esta problemática.

**Objetivo General de Proyecto**

El propósito de esta sección es definir la solución para la problemática que será abordada en el proyecto que se llevará a cabo durante el Seminario Final de la carrera "Analista en Sistemas" de la Escuela de Arte Multimedial Da Vinci.

Para abordar esta problemática, hemos desarrollado Seedy, una aplicación móvil que proporciona información detallada sobre el cuidado de las plantas mediante la identificación de las mismas y permite aprender sobre diversas especies vegetales. Esta aplicación móvil está disponible para su descarga por parte de los usuarios y ofrece una gran cantidad de información práctica y útil.

A pesar del avance tecnológico mencionado en el párrafo precedente, son pocas las aplicaciones que permiten ayudarte con el cuidado de plantas, las cuales si no tienen la suficiente atención pueden correr riesgo. Por esta razón,
en Seedy hemos implementado la posibilidad de generar comunidades en línea donde entusiastas de la jardinería y la horticultura pueden conectarse y compartir información y experiencias. Estas comunidades representan una oportunidad para que los usuarios interactúen con otros apasionados por las plantas y obtengan consejos valiosos.

En resumen, Seedy es una aplicación móvil que aborda la falta de información sobre el cuidado de las plantas y el desconocimiento de las especies, y lo hace de manera efectiva mediante el uso de tecnología y la creación de comunidades en línea, con el objetivo de que los usuarios logren contar sus experiencias, aprender y prevenir.

**Objetivos específicos del proyecto**

1. Implementar la función de identificación de plantas.

2. Ofrecer contenido educativo.

3. Facilitar la interacción en comunidades en línea.

4. Desarrollar una interfaz de usuario amigable.

5. Medir el impacto y la satisfacción de los usuarios.

6. Promover la conciencia y el interés en la jardinería.

**Límite**
La aplicación "Seedy" abarca desde el momento en que un usuario descarga la aplicación y la utiliza para obtener información sobre el cuidado de las plantas y se extiende hasta la identificación de las mismas a través de la función de reconocimiento de plantas. Durante este ciclo de vida de la planta, se garantiza la integridad y confidencialidad de la información relacionada con las plantas.

**Alcance**
Dado que el proyecto "Seedy" involucra tanto la creación de una nueva comunidad en línea como un cambio en la forma en que las personas cuidan de sus plantas, hemos considerado recomendable comenzar el proyecto de forma gradual, enfocándonos en un conjunto inicial de funcionalidades y objetivos. Esto permitirá un cambio cultural de magnitud y un impacto significativo en la experiencia del usuario. 
**El alcance inicial se concentra en las siguientes áreas:**

**Función de Identificación de Plantas:** Implementar una función que permita a los usuarios tomar fotos de sus plantas y recibir información instantánea sobre la especie y los cuidados requeridos. Esta funcionalidad será la piedra angular de la aplicación.

**Comunidad en Línea:** Establecer un espacio en la aplicación donde los usuarios puedan interactuar, compartir experiencias y obtener asesoramiento sobre el cuidado de las plantas. Este espacio permitirá la creación de una comunidad de amantes de la jardinería.

**Contenido Educativo para los usuarios:** Proporcionar a los usuarios recursos educativos cuando lo soliciten, como guías y consejos básicos para el cuidado de plantas las cuales se precise de información específica.El fin es ayudar a los usuarios a comenzar con sus experiencias de jardinería.

**Modelo del proceso de software:**

El proceso de desarrollo de software en el proyecto "Seedy" sigue un modelo estructurado que abarca varias etapas clave. Comienza con la comunicación, donde se recopilan los requisitos del software a través de la interacción con usuarios y partes interesadas. Luego, en la etapa de planeación, se definen las tareas, se asignan recursos y se establecen plazos para el proyecto. La fase de modelado implica la creación de un modelo de la solución, incluyendo el diseño de la interfaz de usuario y la arquitectura de la aplicación.

Posteriormente, en la etapa de construcción, se produce el código y se implementan las funcionalidades utilizando tecnologías como React Native y React Navigator. Estos frameworks desempeñan un papel fundamental en el desarrollo de la aplicación. Finalmente, en la fase de despliegue, la aplicación se publica en la tienda de aplicación de Android "Google Play" para que los usuarios la descarguen y utilicen. Este enfoque estructurado garantiza un proceso de desarrollo efectivo y eficiente en el proyecto "Seedy", permitiendo la creación de una aplicación móvil moderna para el cuidado de plantas.

**Aseguramiento de la calidad del Software:**
En todas las etapas del ciclo de vida del desarrollo de software es posible aplicar técnicas de aseguramiento de la calidad. Las técnicas que utilizamos específicamente para este proyecto es:
**Verificación:** 
**Revisión de Código:** Primeramente con la revisión del código, nos aseguramos de que el código fuente de la aplicación sea revisado por todos los miembros del grupo. Esto ayuda a identificar posibles errores o problemas de calidad en el código a tiempo.
**Pruebas de Unidad**: En estas pruebas, para verificar que cada componente o módulo de la aplicación funcione según lo acordado, comprobamos el comportamiento tanto de funciones como de métodos individuales. Para esto, hemos realizado los diagramas pertinentes para cada prueba. En el caso de las pruebas de unidad, tuvimos fuertemente en cuenta el "Diagrama de Componentes" de Seedy, realizado a la misma vez que   desarrollabamos el proyecto, aplicando constantemente cada actualización.
**Pruebas de Integración:** En las pruebas de integración, nos aseguramos que los diferentes componentes de nuestra aplicación trabajen juntos sin problemas. De esta manera, verificamos que los módulos se puedan integrar sin problema. 
**Revisiones de Diseño:** No solo realizamos pruebas para el Back-end, sino que también para el Front-end. Tenemos en cuenta que para que la aplicación funcione debemos prestar atencion a verificar que el diseño de la interfaz de usuario y la arquitectura de la aplicación, cumpla con los requisitos y estándares previamente definidos.

**Validación:**
**Pruebas de Aceptación:** En las pruebas de aceptación, necesitamos de usuarios finales o representantes de los usuarios para que prueben la aplicación en un entorno de prueba. Para esto, no solo contaron las correcciones del profesor, el cual simulaba la interaccion con la aplicación sino que también contactamos 
personas que ambos miembros del grupo conocíamos para poder realizar las validaciones de la aplicación y de esta manera, lograr como resultado que la misma haya sido lo suficientemente intuitiva como nos planteamos.Por otro lado, ver como el usuario interactua con "Seedy" y sus funciones bien establecidas. Por último, llegar a la satisfacción de las necesidades reales de los usuarios que tomen la decisión de instalar nuestra aplicación.
**Evaluación de Requisitos:** Esta evaluación es fundamental como grupo, ya que los requisitos iniciales del proyecto se deben cumplir y la aplicación, como objetivo principal del proyecto, debe cumplir las expectativas del cliente y de los usuarios.
**Pruebas de rendimiento:** En las pruebas de rendimiento, validamos que la aplicación funcione de forma eficiente ya que si probamos bajo cargas de trabajo muy elevadas, debemos garantizar un rendimiento óptimo.
**Pruebas de Seguridad:** Realizamos pruebas de seguridad para garantizar que la aplicación sea resistente a vulnerabilidades o amenazas.

**Arquitectura en Capas del Proyecto Seedy**
Para empezar a hablar de nuestra arquitectura, primeramente comenzaremos por la infraestructura subyacenete donde como grupo tomamos la decisión de optar por utilizar Amazon Web Services(AWS) para el funcionamiento de capas que explicaremos a continuación.
Elegimos AWS como nuestro proveedor de servicios en la nube, lo cual es fundamental para el funcionamiento de la aplicación. Esta decisión se basó en varias razones esenciales para el éxito del proyecto. 
En primer lugar, AWS nos permite ajustar la capacidad de nuestros servidores según la cantidad de usuarios que utilicen la aplicación.Esto quiere decir que si más personas empiezan a usar "Seedy", podemos escalar nuestros servidores de manera sencilla para acomodar esa demanda adicional. Además, AWS nos da herramientas sólidas de seguridad para proteger los datos de nuestros usuarios. Esto es vital para garantizar que la información personal y cualquier otro dato sensible estén a salvo y no sean vulnerables a amenazas externas. Por otro lado, optamos por AWS ya que más alla de que el procedimiento de acomodarlo a nuestro proyecto llevo tiempo, este nos permite automatizar muchas tareas de administración, lo que nos ahorra tiempo y recursos. 
A partir de aquí es donde nos vamos a centrar en las capas, las cuales estructuramos y cada una representa uan funcionalidad específica con tecnologías específicas.
**Capa de Presentación(Interfaz de Usuario):** En esta capa, utilizamos React Native y React Navigator para crear una interfaz de usuario atractiva y gestionar la navegación en la Aplicación.Los usuarios interactúan directamente con esta capa para acceder a la información sobre el cuidado de las plantas y para conectarse con otras personas de la comunidad. Esta capa, incluye React Express, que permite una comunicación muy eficiente en el cliente y el Servidor. 
**Capa de Lógica de Negocio:** En lo que sería el corazón de la Aplicación, esta capa gestiona la lógica e interacción con la base de datos. En esta parte, utilizamos tecnologías como Express para crear una API que maneja solicitudes y respuestas. También implementamos JSON Web Tokens(JWT Tokens) para la autenticación y autorización de usuarios, garantizando la seguridad de los datos. Nodemailer, se utiliza para el envío de correos electrónicos, esencial para envíos de notificaciones y adquirir mejor comunicación con los usuarios.
**Capa de acceso a Datos:** La capa de acceso a datos se encarga de interactuar con bases de datos y servicios externos. Para cargar y procesar archivos de imágenes de plantas empleamos Multer y Sharp, que son tecnologías que permiten al usuario cargar imágenes de plantas y, a través de Sharp, realizar un procesamiento de imágenes de alto rendimiento para mostrar información detallada sobre las plantas.
**Conclusión:**
Esta arquitectura de capaz con el uso de tecnologías como React Native, React Express, Nodemailer, JSON Web Tokens (JWT Tokens), Multer y Sharp permiten que "Seedy" ofrezca una experiencia de usuario efectiva y una plataforma sólida para el cuidado de las plantas. AWS asegura que todo funcione sin problemas y que los datos estén seguros.

**Etapa de Investigación**

**Mapa de Competencia:**
Tenemos en cuenta que el mapa de competencia es una herramienta esencial en el análisis estratégico de un proyecto, ya que nos permite identificar y comprender a los actores clave que operan en el mismo espacio. Los factores de competencia directa, indirecta, analógica y digital son categorías que nos ayudan a clasificar a los competidores y a comprender cómo influyen en el éxito de un proyecto. La competencia directa son aquellas organizaciones o aplicaciones que ofrecen un servicio similar al nuestro. La competencia indirecta se refiere a actores que no ofrecen exactamente lo mismo, pero compiten por la atención del mismo público. La competencia analógica se relaciona con las ofertas físicas, como tiendas o viveros, mientras que la competencia digital se refiere a soluciones en línea, como aplicaciones y sitios web. 
Para realizar los mapas nos quisimos centrar en los 3 objetivos principales del proyecto: Identificación de plantas, Consejos de plantas y por último la posibilidad de unirse a comunidades para los usuarios.

A partir de un análisis, elaboramos un mapa de competencia específico para la "identificación de plantas" en "SEEDY" para comprender cómo se encuentra posicionado nuestro proyecto en un mercado que busca satisfacer la curiosidad y las necesidades de los amantes de las plantas. Este mapa nos brinda como grupo, una visión más clara de quiénes son nuestros competidores directos y cómo se destacan en términos de tecnología, alcance y calidad de identificación de plantas. Al comprender a nuestros competidores, estamos mejor preparados para desarrollar estrategias efectivas y diferenciarnos en este mercado competitivo.
**Mapa de Competencia de objetivo: Identificación de Plantas**
![image](https://github.com/Seedy-app/Seedy/assets/91674008/c24276ae-25c4-4d53-a63a-47a04805c982)

Por otro lado, creamos un mapa de competencia para el espacio de "Consejos de Plantas" en "SEEDY" para comprender quiénes están realizando recomendaciones relacionadas con el cuidado de plantas. Esto nos permite conocer a nuestros competidores directos, tanto en el mundo analógico como en el digital, y evaluar qué enfoques y soluciones están utilizando para atraer a los interesados en las plantas.

**Mapa de Competencia de objetivo: Consejos de Plantas**
![image](https://github.com/Seedy-app/Seedy/assets/91674008/858e4094-96bd-424e-88d7-d307aa941ee0)

Por último, la unión a comunidades es un objetivo que se basa en que los usuarios puedan interactuar con otros generando un aprendizaje reciproco y a la misma vez muy educativo. Por otro lado, generar el sentimiento de compartir la misma pasión por las plantas o si no sos un apasionado, poder resolver todas las dudas que lleven a consultar a las personas en distintas comunidades.
**Mapa de Competencia de Objetivo: Unión a Comunidades**
![image](https://github.com/Seedy-app/Seedy/assets/91674008/1fe7de1d-0d82-407a-90ba-fddd86f723b2)

**Contextos de la Aplicación:**
![image](https://github.com/Seedy-app/Seedy/assets/91674008/63575c26-55f2-4250-ac23-74201cee26e2)

**Hipótesis de los ejes centrales del Proyecto:**
La aplicación móvil Seedy representa una solución tecnológica integral que se desglosa en tres ejes principales: identificación de plantas, consejos sobre el cuidado de las plantas y la posibilidad de unirse a comunidades de amantes de la jardinería. En el eje de identificación de plantas, hipotetizamos que los usuarios encontrarán en Seedy una herramienta valiosa para identificar con precisión diversas especies de plantas, lo que enriquecerá su pasión por la jardinería o de no ser asi, resolver cualquier duda que se le presente. En el segundo eje, que se centra en brindar consejos sobre el cuidado de las plantas, esperamos que los usuarios utilicen activamente esta función para abordar desafíos y problemas específicos en el crecimiento de sus plantas. La eficacia y relevancia de estos consejos serán fundamentales para la satisfacción de los usuarios y su compromiso continuo con la aplicación. En el tercer eje, que involucra la unión a comunidades, creemos que los usuarios encontrarán un espacio donde pueden compartir sus experiencias, aprender de otros expertos en plantas y construir una comunidad en línea en la que pueden debatir y compartir su amor por la jardinería. La participación activa en estas comunidades contribuirá significativamente a la satisfacción y retención de los usuarios en la aplicación Seedy.

**Investigación de la Aplicación**
Realizamos una investigación en la cual se involucran muchos temas que se tuvieron en cuenta a la hora del nacimiento de la idea del proyecto "Seedy". Esta investigación, es esencial para nosotros porque es una manera de ver si previo a la conformación definitiva del grupo, cada uno de forma individual apuntaba para el mismo lado y tenia los mismos objetivos para con la Tesis Final que buscabamos presentar. Por lo tanto, a continuación presentaremos los temas que se tuvieron en cuenta y los análisis de tecnologías a utilizar que decidimos marcar en cada punto.

![image](https://github.com/Seedy-app/Seedy/assets/91674008/244727f7-e484-48db-88d0-41e0295fd26b)





**Tecnologías utilizadas:** 🚀
**React Native** (framework)

**React Navigator** (navegación):
  - AuthStackNavigator
  - BottomTabsNavigator

    **Diagramas**
    Draw.io
    Miro
    Figma
Confluence en JIRA
**i18next** (multilenguaje)
