/** @format */

import React from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const userId = (await params).id;
  return <div>{userId}</div>;
};

export default page;
