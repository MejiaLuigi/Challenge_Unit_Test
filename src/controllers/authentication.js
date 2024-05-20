
const { getUsersByEmail, createUser } = require('../db/users');
const { authentication, random } = require('../helpers');
/** 
 * 
*/
exports.register = async (req, res) => {
   try {
      const { email, password } = req.body;
      if (!email || !password) {
         return res.status(400).json({ message: 'email or password' });
      }
      // .check if the user with that email
      const existingUser = await getUsersByEmail(email);
      if (existingUser) {
         return res.status(400).json({ message: 'User already exists' });
      }
// .create in user
      const salt = random();
      const user = await createUser({
         email,
         authentication: {
            salt,
            password: authentication(salt, password)
         }
      });

      return res.status(200).json(user);
   } catch (error) {
      console.log(error);
      return res.sendStatus(500);
   }
};
// login
exports.login = async (req, res) => {
   try {
      const { email, password } = req.body;
      if (!email || !password) {
         return res.sendStatus(401);
      }
      //We check if there is a user with that id

    const user = await getUsersByEmail(email).select('+authentication.salt +authentication.password');
    if(!user){
      return res.sendStatus(400)
    }

    //CHECK IF THE HASHED PASSWORD IS THE SAME AS THE PASSWORD IN THE DATABASE
    const expectHash = authentication(user.authentication.salt, password);

    // if it is not the hash password we return error
    if(user.authentication.password !== expectHash){
     return res.sendStatus(400)
    }
    // USER tOKEN
    const salt = random();
    user.authentication.sessionToken = authentication(salt, user._id.toString());
    
    await user.save();
      res.cookie('JAMES-REST-API', user.authentication.sessionToken, { domain: 'localhost', path: '/' });

   return res.status(200).json(user).end();
   
   } catch (error) {
   console.error(error);
   return res.sendStatus(400);      
   }
}
