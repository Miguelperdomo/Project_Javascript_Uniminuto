"use client";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video", "code-block"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "code-block",
];

type Props = {
  DefaultValue?: string;
  setInputValue: React.Dispatch<React.SetStateAction<any>>;
};

export default function NewEditor({ DefaultValue, setInputValue }: Props) {
  return (
    <>
      <QuillNoSSRWrapper
        theme="snow"
        modules={modules}
        formats={formats}
        onChange={(content) => {
          setInputValue((antecede: any) => ({
            ...antecede,
            contenido: content,
          }));
        }}
        // defaultValue={`<h3  style="text-align: left;"><strong>¿Cual es su Requerimiento?</strong></h3>
        // <h3 style="text-align: left;"><strong>Adjunte Evidencia</strong></h2><br>`}
        defaultValue={`
        <div>
        <h3 style={{ textAlign: "left" }}>
          <strong>
            Por favor, describa detalladamente el problema o requerimiento que
            tiene con el sistema de información:
          </strong>
        </h3>
        <br />

        <h3 style={{ textAlign: "left" }}>
          <strong>
            ¿Hay algún otro dato o información adicional que debamos conocer?          
          </strong>
        </h3>
        <br />

        <h3 style={{ textAlign: "left" }}>
          <strong>          
            "Puede Adjuntar Imágenes como evidencia"
          </strong>
        </h3>
        <br />     
        `}
      />
    </>
  );
}
