"use client";
import React, { useState } from "react";
import { RequisitrosMatricula } from "../../../typings";
import TitleButton from "../TitleButton";
import ModalAdd from "./ModalAdd";
import TableRequisitosMatricula from "./TableRequisitosMatricula";

type Props = {
  // type props useState
  requisitosMatricula: RequisitrosMatricula[];
};
const BodyRequisitrosMatricula = ({ requisitosMatricula }: Props) => {
  const [ShowModal, setShowModal] = useState(false);
  const [Data, setData] = useState(requisitosMatricula);

  return (
    <>
      {ShowModal && (
        <ModalAdd
          setShowModal={setShowModal}
          setRequisitosMatricula={setData}
        />
      )}

      <TitleButton title="Requisitos de matrícula">
        <div>
          <button
            autoFocus
            onClick={() => setShowModal(true)}
            className="BtnHeader hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <span>Agregar Requisito</span>
          </button>
        </div>
      </TitleButton>
      <div className="border-l-2 border-t-2 border-r-2 border-white">
        <TableRequisitosMatricula info={Data} setData={setData} />
      </div>
    </>
  );
};

export default BodyRequisitrosMatricula;
