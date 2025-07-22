const admin = require('firebase-admin');
const serviceAccount = require('./<TU-FIREBASE-SERVICE-ACCOUNT-KEY>.json'); // Descarga esto desde tu consola de Firebase

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const userEmail = 'tu-email-de-admin@ejemplo.com'; // <-- CAMBIA ESTO

admin.auth().getUserByEmail(userEmail)
  .then((user) => {
    return admin.auth().setCustomUserClaims(user.uid, { role: 'admin' });
  })
  .then(() => {
    console.log(`¡Éxito! El usuario ${userEmail} ahora es administrador.`);
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error al asignar el rol de administrador:', error);
    process.exit(1);
  });