import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
i

function EmailForm() {
  const [user_name, setUsername] = useState('');  // Nombre del usuario
  const [user_email, setEmail] = useState('');     // Correo electrónico del usuario
  const [message, setMessage] = useState('');      // Mensaje del usuario
  const [verificationCode, setVerificationCode] = useState(''); // Código de validación generado
  const [userCode, setUserCode] = useState('');    // Código que el usuario ingresa para validar
  const [isCodeSent, setIsCodeSent] = useState(false); // Estado para saber si el código ha sido enviado

  const form = useRef();

  // Función para generar un código aleatorio
  const generateRandomCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000); // Genera un código de 6 dígitos
    setVerificationCode(code);
    return code;
  };

  const sendEmail = (e) => {
    e.preventDefault();

    const code = generateRandomCode(); // Genera el código de validación

    // Prepara los parámetros para el envío del correo
    const templateParams = {
      user_name,          // Nombre del usuario
      user_email,         // Correo electrónico del usuario
      message,            // Mensaje ingresado por el usuario
      to_email: user_email,   // Aquí usamos el correo del destinatario
      verification_code: code, // Agregamos el código de verificación
    };

    emailjs
      .send('service_lgmm5so', 'template_wv3sdno', templateParams, 'xKYQea8wmj0LgY5FG')
      .then(
        (response) => {
          console.log('Correo enviado con éxito!', response);
          alert(`El código de verificación se ha enviado a ${user_email}`);
          setIsCodeSent(true); // Indicar que el código ha sido enviado
        },
        (error) => {
          console.log('Error al enviar el correo:', error.text);
        }
      );
  };

  // Función para validar el código ingresado por el usuario
  const validateCode = () => {
    if (parseInt(userCode) === verificationCode) {
      alert('Código validado correctamente');
      // Aquí puedes agregar más lógica para continuar con el flujo de tu aplicación

      ///// Aqui va el post hacia la tabla 
      
    } else {
      alert('El código ingresado es incorrecto');
    }
  };

  return (
    <div>
      <form ref={form} onSubmit={sendEmail}>
        <h2>Formulario de Contacto</h2>

        <p>Nombre</p>
        <input
          value={user_name}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          name="user_name"
          required
        />

        <p>Correo Electrónico</p>
        <input
          value={user_email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="user_email"
          required
        />

        <p>Mensaje</p>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          name="message"
          required
        />

        <br />
        <input type="submit" value="ENVIAR" />
      </form>

      {/* Mostrar el campo para ingresar el código solo si el código fue enviado */}
      {isCodeSent && (
        <div>
          <h3>Ingresa el código de verificación que hemos enviado a tu correo</h3>
          <input
            type="text"
            value={userCode}
            onChange={(e) => setUserCode(e.target.value)}
            placeholder="Código de verificación"
            required
          />
          <button onClick={validateCode}>Validar Código</button>
        </div>
      )}
    </div>
  );
}

export default EmailForm;