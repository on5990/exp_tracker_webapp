import Head from "next/head";
import Authentication from "../components/authentication/Authentication";

export default function Home() {
  return (
    <>
      <Head>
        <title>Controlador de gastos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="indexMain">
        <p className="indexTitle">CONTROLADOR DE GASTOS</p>
        <Authentication />
        <p className="indexWarning">
          Advertencia: Este proyecto fue desarrollado por motivos de práctica y
          demostración, no se recomienda su uso.
          <br />
          <br />
          Credenciales de prueba:
          <br />
          Email: usuario@prueba.com
          <br />
          Contraseña: @Prueba123
        </p>
        <p className="indexWarning"></p>
      </main>
    </>
  );
}
