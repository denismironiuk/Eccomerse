const jwt = require('jsonwebtoken');

function createToken(data){

    const{email,userId}=data
    const token = jwt.sign(
        {
          email,
          userId,
        },
        'secret',
        { expiresIn: '4h' }
      );

      return token
}

module.exports = {
    createToken

}