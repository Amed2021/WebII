import React from 'react';
import NormasImg from '../imagenes/normas.jpg';

import { Link } from 'react-router-dom';

const styles = {
  container: {
    padding: '20px',
    fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`,
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    textAlign: 'center',
    position: 'relative',
    maxWidth: '800px',
    margin: '0 auto'
  },
  image: {
    position: 'absolute',
    bottom: '20px',
    right: '-200px',
    width: '200px',
    height: 'auto'
  },
  heading: {
    marginTop: '20px'
  },
  paragraph: {
    marginTop: '10px',
    textAlign: 'justify'
  }
};

const Normas = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Normas y Reglamento en FACECHAT</h2>
      <p style={styles.paragraph}>
        En Facechat, nos esforzamos por mantener un entorno en línea seguro y respetuoso para todos nuestros usuarios. Para lograrlo, hemos establecido las siguientes normas y reglas que todos los usuarios deben seguir al utilizar nuestra plataforma:
      </p>
      <p style={styles.paragraph}>
        Trata a todos los usuarios con respeto y cortesía. No toleramos el acoso, la intimidación o cualquier forma de comportamiento irrespetuoso.
      </p>
      <p style={styles.paragraph}>
        Publica únicamente contenido que sea apropiado y respetuoso. Evita publicar contenido que sea ofensivo, violento, pornográfico o que infrinja los derechos de autor.
      </p>
      <p style={styles.paragraph}>
        Protege la seguridad de tu cuenta. No compartas tu contraseña con nadie y asegúrate de cerrar sesión cuando utilices Facechat en dispositivos compartidos.
      </p>
      <p style={styles.paragraph}>
        Respeta la privacidad de los demás. No compartas información personal de otros usuarios sin su consentimiento.
      </p>
      <p style={styles.paragraph}>
        No utilices Facechat para publicar spam, anuncios no deseados o cualquier tipo de contenido promocional sin autorización.
      </p>
      <p style={styles.paragraph}>
        Cumple con todas las leyes y regulaciones aplicables al utilizar Facechat. No utilices nuestra plataforma para actividades ilegales o fraudulentas.
      </p>
      <p style={styles.paragraph}>
        Si encuentras contenido inapropiado o tienes algún problema con otro usuario, repórtalo a nuestro equipo de soporte para que podamos tomar las medidas necesarias.
      </p>
      <p style={styles.paragraph}>
        Al utilizar Facechat, aceptas cumplir con estas normas y reglas. Nos reservamos el derecho de tomar medidas, incluida la suspensión o eliminación de cuentas, en caso de incumplimiento de estas normas.
      </p>
      <p style={styles.paragraph}>
        Gracias por ser parte de la comunidad de Facechat y por contribuir a crear un entorno seguro y positivo para todos nuestros usuarios. Valoramos tu participación y nos comprometemos a mantener un espacio donde todos puedan interactuar de manera respetuosa y constructiva.
      </p>
      <p style={styles.paragraph}>
        Recuerda que estas normas están diseñadas para proteger a todos los miembros de nuestra comunidad y asegurar que Facechat siga siendo un lugar seguro y agradable para todos. Si tienes alguna pregunta sobre estas normas o necesitas más información, no dudes en ponerte en contacto con nuestro equipo de soporte.
      </p>
      <img src={NormasImg} alt="Normas" style={styles.image} />
      <Link to="/" style={styles.backLink}>Volver al inicio</Link>
    </div>
  );
};

export default Normas;
