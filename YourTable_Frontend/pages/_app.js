import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import ContextWrapper from "./components/ContextWrapper";


export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <ContextWrapper session={session}>
        <Component {...pageProps} />
      </ContextWrapper>
    </SessionProvider>
  );
}
