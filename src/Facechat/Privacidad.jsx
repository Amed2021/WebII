import { Link } from 'react-router-dom';
import PrivacidadImg from '../imagenes/privacidad.jpg';

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    position: 'relative',
    maxWidth: '800px',
    margin: '0 auto',
   
  },
  image: {
    position: 'absolute',
    top: '20px',
    left: '-450px',
    width: '250px',
    height: 'auto',
    transform: 'perspective(500px) rotateY(10deg) scale(1.1)',
    transition: 'transform 0.3s',
  },
  imageHover: {
    transform: 'perspective(500px) rotateY(0deg) scale(1.2)',
  },
  heading: {
    marginTop: '20px',
    fontSize: '24px',
    color: '#333',
  },
  paragraph: {
    marginTop: '10px',
    textAlign: 'justify',
    color: '#555',
    lineHeight: '1.6',
  },
  backLink: {
    display: 'block',
    marginTop: '20px',
    textDecoration: 'none',
    color: '#007BFF',
    fontWeight: 'bold',
  },
};

const Privacidad = () => {
  return (
    <div style={styles.container}>
      <img
        src={PrivacidadImg}
        alt="Privacidad"
        style={styles.image}
        onMouseEnter={(e) => (e.currentTarget.style.transform = styles.imageHover.transform)}
        onMouseLeave={(e) => (e.currentTarget.style.transform = styles.image.transform)}
      />
      <h2 style={styles.heading}>Privacidad en Facechat</h2>
      <p style={styles.paragraph}>
        En Facechat, nos tomamos en serio tu privacidad. Sabemos que confías en nosotros para mantener segura tu información personal y nos esforzamos por garantizar que tu experiencia en nuestra plataforma sea segura y respetuosa con tu privacidad. 
        Nuestra política de privacidad detalla cómo recopilamos, usamos, compartimos y protegemos tu información cuando utilizas nuestros servicios. Aquí hay algunos aspectos destacados:
      </p>
      <p style={styles.paragraph}>
        Protección de datos: Utilizamos medidas de seguridad avanzadas para proteger tus datos contra accesos no autorizados, pérdidas o alteraciones. Además, nos aseguramos de que nuestros empleados y socios cumplan con estrictas políticas de privacidad y seguridad.
      </p>
      <p style={styles.paragraph}>
        Control de privacidad: Te brindamos opciones para controlar la privacidad de tu cuenta y la información que compartes en Facechat. Puedes ajustar la configuración de privacidad en cualquier momento para decidir quién puede ver tu información y cómo se utiliza.
      </p>
      <p style={styles.paragraph}>
        Transparencia: Nos comprometemos a ser transparentes sobre cómo recopilamos, usamos y compartimos tu información. Nuestra política de privacidad describe en detalle nuestras prácticas en materia de privacidad y te proporcionamos actualizaciones periódicas sobre cualquier cambio importante en nuestras políticas.
      </p>
      <p style={styles.paragraph}>
        Cumplimiento legal: Cumplimos con todas las leyes y regulaciones aplicables en materia de privacidad de datos. Siempre que sea necesario, obtenemos tu consentimiento antes de recopilar, usar o compartir tu información personal.
      </p>
      <p style={styles.paragraph}>
        En Facechat, nos esforzamos por crear una comunidad en línea segura y acogedora. Apreciamos tu confianza en nosotros como tu red social preferida y trabajamos arduamente para proteger tu privacidad en todo momento.
      </p>
      <p style={styles.paragraph}>
        Revisamos y actualizamos periódicamente nuestras prácticas de privacidad para asegurar que estamos proporcionando el nivel más alto de protección para tu información. Esto incluye la implementación de nuevas tecnologías y medidas de seguridad, así como la mejora continua de nuestras políticas y procedimientos.
      </p>
      <p style={styles.paragraph}>
        Además, realizamos auditorías regulares de nuestros sistemas y prácticas de seguridad para identificar y abordar cualquier posible vulnerabilidad. Nos asociamos con expertos en seguridad y privacidad para asegurarnos de que estamos cumpliendo con los estándares más altos en protección de datos.
      </p>
      <p style={styles.paragraph}>
        Facechat también está comprometido con la educación de nuestros usuarios sobre la importancia de la privacidad en línea. Proporcionamos recursos y guías para ayudarte a entender cómo proteger tu información y mantener tu cuenta segura.
      </p>
      <p style={styles.paragraph}>
        Si en algún momento decides que ya no deseas utilizar nuestros servicios, te proporcionamos opciones claras para cerrar tu cuenta y eliminar tu información personal de nuestros sistemas. Nos esforzamos por hacer este proceso lo más sencillo y transparente posible.
      </p>
      <Link to="/" style={styles.backLink}>Volver al inicio</Link>
    </div>
  );
};

export default Privacidad;
