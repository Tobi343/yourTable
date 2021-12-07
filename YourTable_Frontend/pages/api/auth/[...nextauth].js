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

      console.log(user);

      if (user) {
        console.log("success");
        return user;
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
      console.log("LOL: " + user);
      console.log("LOL: " + account);
      token = {
        name: 'sebi@gmail.com'.split("@")[0],
        email: 'sebi@gmail.com',
        picture: "undefined",
        sub: "undefined",
        accessToken: user
      };

      console.log('ABC: '+token);

    }
    return token;

  },
  async session({ session, user, token }) {
    // this token return above jwt()
    console.log("Session");
    console.log(token)
    if(token){
      console.log("Token set")
      session.accessToken = token.accessToken
  
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
};

export default (req, res) => NextAuth(req, res, options);
