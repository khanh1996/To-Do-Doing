

import cryptoRandomString from '.';
 
 cryptoRandomString({length: 10});
 //=> '2cf05d94db'
 console.log(cryptoRandomString({length: 10}));
  
 cryptoRandomString({length: 10, type: 'base64'});
 //=> 'YMiMbaQl6I'
  
 cryptoRandomString({length: 10, type: 'url-safe'});
 //=> 'YN-tqc8pOw'
  
 cryptoRandomString({length: 10, characters: '1234567890'});

 