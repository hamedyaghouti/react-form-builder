import React, { DragEvent } from "react";
import "./App.css";

type TValidation = { type: "Required"; message: string };

type TElement = ILabel | IRadioBox | THr | IRow;

type TIsContainer = IRow | IColumn | ISchema;

interface ILabel {
  type: "Label";
  typePrefix: "lbl";
  isContainer: false;
  uniqueId: string;
  value: string;
  size: "md";
  color: string;
  validations: TValidation[];
}

interface IRadioBox {
  type: "RadioBox";
  typePrefix: "rdo";
  key: string;
  isContainer: false;
  label: string;
  values: {
    id: string;
    label: string;
    value: string;
    active: boolean;
  }[];
  direction: "row" | "column";
  validations: TValidation[];
  summeries: [];
  uniqueId: string;
}

interface THr {
  type: "Hr";
  typePrefix: "hr";
  isContainer: false;
  uniqueId: string;
}

interface IRow {
  type: "Row";
  typePrefix: "rw";
  columns: 1 | 2 | 3;
  columnType: "Left" | "Right";
  isContainer: true;
  uniqueId: string;
  title: string;
  items: IColumn[];
}

interface IColumn {
  type: "Column";
  typePrefix: "col";
  isContainer: true;
  uniqueId: string;
  size: "md";
  width: 8 | 4;
  items: TElement[];
}

interface ISchema {
  type: "form";
  typePrefix: "frm";
  name: string;
  system: string;
  language: "fa" | "en";
  direction: "rtl" | "ltr";
  version: string;
  key: string;
  uniqueId: string;
  items: Array<TElement>;
}

export const schema: ISchema = {
  type: "form",
  typePrefix: "frm",
  name: "ارزیابی مدیر - ارزیاب زیرمجموعه",
  system: "هوشمند سپهر",
  language: "fa",
  direction: "rtl",
  version: "1.0.0",
  key: "ManagerSubalternEvaluator",
  uniqueId: "6613839280fa",
  items: [
    {
      type: "Row",
      typePrefix: "rw",
      columns: 2,
      columnType: "Left",
      isContainer: true,
      uniqueId: "cf90d3dc10fb",
      title: "2 ستون",
      items: [
        {
          type: "Column",
          typePrefix: "col",
          isContainer: true,
          uniqueId: "040b4ec25e72",
          size: "md",
          width: 4,
          items: [
            {
              type: "Label",
              typePrefix: "lbl",
              isContainer: false,
              uniqueId: "4a76bd7d3a41",
              value: "1- نظم و انضباط كاری:",
              size: "md",
              color: "#000000",
              validations: [],
            },
          ],
        },
        {
          type: "Column",
          typePrefix: "col",
          isContainer: true,
          uniqueId: "8ed17358317c",
          size: "md",
          width: 8,
          items: [
            {
              type: "Label",
              typePrefix: "lbl",
              isContainer: false,
              uniqueId: "77a2c82792e5",
              value: "حضور منظم، مرتب بودن میزكار و ...",
              size: "md",
              color: "#000000",
              validations: [],
            },
          ],
        },
      ],
    },
    {
      type: "RadioBox",
      typePrefix: "rdo",
      key: "Discipline",
      isContainer: false,
      label: ".",
      values: [
        {
          id: "69504d641ffc",
          label: "بسیار کمتر از حد انتظار",
          value: "1",
          active: false,
        },
        {
          id: "498ba57bbeaf",
          label: "کمتر از حد انتظار",
          value: "2",
          active: false,
        },
        {
          id: "8a3fe14493bb",
          label: "در حد انتظار",
          value: "3",
          active: false,
        },
        {
          id: "e95266c9720d",
          label: "بالاتر از حد انتظار",
          value: "4",
          active: false,
        },
        {
          id: "9792ff5a3912",
          label: "بسیار بالاتر از حد انتظار",
          value: "5",
          active: false,
        },
      ],
      direction: "row",
      validations: [{ type: "Required", message: "فیلد . الزامی است." }],
      summeries: [],
      uniqueId: "79c2756d7764",
    },
    {
      type: "Hr",
      typePrefix: "hr",
      isContainer: false,
      uniqueId: "e7a8b7dffb7d",
    },
  ],
};

function App() {
  const [formSchema, setFormSchema] = React.useState({
    form: {
      type: "form",
      typePrefix: "frm",
      version: 2,
      name: "ارتقا مبالغ تراکنش های پایانه فروش - دی ماه",
      uniqueId: "frm_r57d765a2428",
      items: [],
    },
  });

  const mainContainerRef = React.useRef(null);
  const formSchemaRef = React.useRef<ISchema>({
    type: "form",
    typePrefix: "frm",
    name: "ارتقا مبالغ تراکنش های پایانه فروش - دی ماه",
    system: "هوشمند سپهر",
    language: "fa",
    direction: "rtl",
    version: "1.0.0",
    key: "ManagerSubalternEvaluator",
    uniqueId: "frm_r57d765a2428",
    items: [],
  });

  const getObject: (schema: ISchema, uniqueId: string) => object | null = (
    schema,
    uniqueId
  ) => {
    let result: object | null = null;
    if (schema instanceof Array) {
      for (let i = 0; i < schema.length; i++) {
        result = getObject(schema[i], uniqueId);
      }
    } else {
      for (const prop in schema) {
        if (prop == "uniqueId") {
          if (schema[prop as keyof typeof schema] == uniqueId) {
            // schema['items' as keyof typeof schema] = "test";
            return schema;
          }
        }
        // if (
        //   schema[prop] instanceof Object ||
        //   schema[prop] instanceof Array
        // )
        //   result = getObject(schema[prop]);
      }
    }
    return result;
  };

  const onDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();
  };

  const onDragEnter = (event: DragEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const onFileDrop = (event: DragEvent<HTMLDivElement>) => {
    event.stopPropagation();
    console.log("id =======> ", (event.target as HTMLDivElement).id);

    console.log(
      "event.dataTransfer =====> ",
      event.dataTransfer?.getData("componentType")
    );
  };

  const setChildren: (
    schema: ISchema | Array<TElement | IColumn> | TElement | IColumn,
    uniqueId: TIsContainer["uniqueId"],
    children: TElement,
    index?: null
  ) => void = (schema, uniqueId, children, index = null) => {
    let result = null;
    if (schema instanceof Array) {
      for (let i = 0; i < schema.length; i++) {
        result = setChildren(schema[i], uniqueId, children, index);
      }
    } else {
      for (const prop in schema) {
        if (prop == "uniqueId" && schema["uniqueId"] == uniqueId) {
          if (index) {
            (schema as TIsContainer).items?.splice(index, 0, children);
          } else {
            ((schema as TIsContainer).items as Array<TElement | IColumn>).push(
              children
            );
          }
          return schema;
        }
        if (
          (schema as any)[prop] instanceof Object ||
          (schema as any)[prop] instanceof Array
        ) {
          result = setChildren(
            (schema as any)[prop],
            uniqueId,
            children,
            index
          );
        }
      }
    }
    return result;
  };

  return (
    <div className="flex">
      <div className="w-[300px] h-screen bg-[#404040]">
        <div
          className="w-[100px] h-[100px] bg-white"
          draggable="true"
          data-type="text-input"
          onDragStart={(event) => {
            console.log("event.target ========> ", event.target);
            event.dataTransfer?.setData("componentType", "text-input");
          }}
        >
          test
        </div>
      </div>
      <div className="flex-1 bg-green-100 p-[20px]">
        <div
          className="h-full bg-white rounded-[10px]"
          onDragEnter={onDragEnter}
          onDragOver={onDragOver}
          onDrop={onFileDrop}
          onClick={() => console.log("event.dataTransfer")}
          ref={mainContainerRef}
          id="frm_r57d765a2428"
        ></div>
      </div>
    </div>
  );
}
//testing
export default App;
