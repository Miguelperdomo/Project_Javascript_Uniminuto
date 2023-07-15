"use client";
import React from "react";
import { Administrativo, VisibilidadModal } from "../../../typings";
import TitleButton from "../TitleButton";
import ModalAdd from "./ModalAdd";
import ModalUpgrade from "./ModalUpgrade";

type props = {
  // type setadministrativos useState Administrativo
  setAdministrativos: React.Dispatch<React.SetStateAction<Administrativo[]>>;
  showModal: VisibilidadModal;
  setShowModal: React.Dispatch<React.SetStateAction<VisibilidadModal>>;
  InfoEditar: Administrativo;
};

const Header = ({
  setAdministrativos,
  showModal,
  setShowModal,
  InfoEditar,
}: props) => {
  return (
    <>
      <TitleButton title="Colaboradores">
        {showModal?.AddVisible && (
          <ModalAdd
            setShowModal={setShowModal}
            setAdministrativos={setAdministrativos}
          />
        )}

        {showModal?.EditVisible && (
          <ModalUpgrade
            setShowModal={setShowModal}
            setAdministrativos={setAdministrativos}
            InfoEditar={InfoEditar}
          />
        )}

        <div>
          <button
            autoFocus
            onClick={() =>
              setShowModal((prev) => ({ ...prev, AddVisible: true }))
            }
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

            <span>Agregar Colaborador</span>
          </button>
        </div>
      </TitleButton>
    </>
  );
};

export default Header;
