exports.login = async (req, res) => {
    try {
       const { email, password } = req.body;
       if (!email || !password) {
          return res.sendStatus(401); // Credenciales incompletas
       }
 
       const user = await getUsersByEmail(email).select('+authentication.salt +authentication.password');
       if (!user) {
          return res.sendStatus(404); // Usuario no encontrado
       }
 
       const expectedHash = authentication(user.authentication.salt, password);
 
       if (user.authentication.password !== expectedHash) {
          return res.sendStatus(401); // Contraseña incorrecta
       }
 
       const salt = random();
       user.authentication.sessionToken = authentication(salt, user._id.toString());
 
       await user.save();
       res.cookie('JAMES-REST-API', user.authentication.sessionToken, { domain: 'localhost', path: '/' });
       return res.status(200).json(user).end();
 
    } catch (error) {
       console.error(error);
       return res.sendStatus(500); // Error interno del servidor
    }
 }
 