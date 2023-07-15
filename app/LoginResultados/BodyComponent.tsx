"use client";
import React, { useState } from "react";
import Login from "./Login";

type Props = {};

function BodyComponent(props: Props) {
  const [User, setUser] = useState(null);
  const {} = props;

  return (
    <>
      <Login setUser={setUser} />
    </>
  );
}

export default BodyComponent;
