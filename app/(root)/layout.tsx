/** @format */

import React from "react";

import Navbar from "../../components/Navbar";

function Layout({ children }: React.PropsWithChildren<React.ReactNode>) {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
}

export default Layout;
