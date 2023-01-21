import Head from "next/head";
import { Inter } from "@next/font/google";
import Authentication from "../components/Authentication";

const inter = Inter({ subsets: ["latin"] });

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
