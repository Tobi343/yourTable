import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import ContextWrapper from "./components/ContextWrapper";
import AdapterDateFns from '@mui/lab/AdapterLuxon';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <ContextWrapper session={session}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Component {...pageProps} />
        </LocalizationProvider>
      </ContextWrapper>
    </SessionProvider>
  );
}
