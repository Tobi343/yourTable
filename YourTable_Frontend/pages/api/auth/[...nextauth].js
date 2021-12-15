import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import axios from "axios";

const providers = [
  CredentialsProvider({
    // The name to display on the sign in form (e.g. 'Sign in with...')
    name: "Credentials",
    // The credentials is used to generate a suitable form on the sign in page.
    // You can specify whatever fields you are expecting to be submitted.
    // e.g. domain, username, password, 2FA token, etc.
    // You can pass any HTML attribute to the <input> tag through the object.

    async authorize(credentials, req) {
      const res = await axios.post("http://34.139.54.192/users/login", {
        email: credentials.email,
        password: credentials.password,
      });

      const user = res.data;

      const object = {
        token: user,
        email: credentials.email,
      }
      

      if (user) {
        console.log("success");
        return object;
      }
      console.log("error");
      return null;
    },
  }),
];

const callbacks = {
  // Getting the JWT token from API response
  async jwt({ token, user, account, profile, isNewUser }) {
    // This user return by provider {} as you mentioned above MY CONTENT {token:}
    if (user) {

      token = {
        name: user.email.split("@")[0],
        email: user.email,
        picture: "https://firebasestorage.googleapis.com/v0/b/usedado.appspot.com/o/UserImage%2Fdeafult.jpeg?alt=media&token=70fee5c5-4cb3-4695-9778-8698a50c6c8c",
        sub: "undefined",
        accessToken: user.token
      };


    }
    return token;

  },
  async session({ session, user, token }) {
    // this token return above jwt()

    if(token){
      session.accessToken = token.accessToken;
      session.name = token.name;
      session.email = token.email;
      session.picture = token.picture;
    }
    return session;

  },

  async signIn({ user, account, profile, email, credentials }) {
    return true
  },
  async redirect({ url, baseUrl }) {
    return baseUrl
  },
  
  

  // That token store in session
};
const session = {
  jwt: true,
};


const options = {
  providers,
  callbacks,
  session,
  pages: {
    error: '/login' // Changing the error redirect page to our custom login page
  }
};

export default (req, res) => NextAuth(req, res, options);
