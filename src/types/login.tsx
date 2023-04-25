export type loginObject = {
  user: { email: string; password: string };
};

export type loginResponse = {
  user: {
    email: string;
    username: string;
    bio: string;
    image: string;
    token: string;
  };
};
//  user
//  :
//  {email: 'echo.042014@gmail.com', username: 'echoes', bio: null, image: 'https://api.realworld.io/images/smiley-cyrus.jpeg', token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6I…xOTl9.Y3yu92e78XC0-1Xq4n_8Tteufo0ShEOmxbV8FuSkVHo'}
//  [[Prototype]]
//  :
//  Object
