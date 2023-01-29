import Head from "next/head";
import Authentication from "../components/authentication/Authentication";

export default function Home() {
  return (
    <>
      <Head>
        <title>Expense tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="indexMain">
        <Authentication />
      </main>
    </>
  );
}
