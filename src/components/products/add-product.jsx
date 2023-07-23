import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input } from "../ui/shared";
import { validateProductForm } from "./utils/validations";
import { useCreateProduct } from "./hooks/use-products";
import { toast } from "react-toastify";
import { closeModal, productCreated } from "../../store";
import { useDispatch } from "react-redux";

export const AddProduct = () => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const schema = validateProductForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    setValue,
    watch,
  } = useForm();

  const { mutateAsync: createProductMutate } = useCreateProduct();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        if (key !== "image") {
          formData.append(key, data[key]);
        }
      });

      if (file) {
        formData.append("image", file);
      }
      await createProductMutate(formData);
      toast.success("Producto creado exitosamente");
      dispatch(closeModal());
      dispatch(productCreated());
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    setFile(file);
    setFileName(file.name);
    event.target.value = null;
  };

  return (
    <div className="p-4 flex flex-col h-full overflow-y-auto">
      <div className="justify-center px-36 gap-1">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-2">
            <Input
              register={register}
              schema={schema}
              name="name"
              label="Nombre producto"
              placeholder="Ingrese producto"
              required
              variant="primary-search"
            />
          </div>
          <div className="p-2">
            <Input
              register={register}
              schema={schema}
              name="brand"
              label="Marca"
              placeholder="Ingrese marca"
              required
              variant="primary-search"
            />
          </div>
          <div className="p-2">
            <Input
              register={register}
              schema={schema}
              name="size"
              label="Tamaño"
              placeholder="Ingrese tamaño"
              required
              variant="primary-search"
            />
          </div>

          <div className="p-2">
            <Input
              register={register}
              schema={schema}
              name="stock"
              label="Stock"
              placeholder="Ingrese stock"
              required
              variant="primary-search"
            />
          </div>

          <div className="p-2">
            <Input
              register={register}
              schema={schema}
              name="price"
              label="Precio"
              placeholder="Ingrese precio"
              required
              variant="primary-search"
            />
          </div>
          <div className="p-2">
            <div className="relative inline-flex gap-x-1">
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleUpload}
              />
              <Button variant="primary-outlined">Seleccionar archivo</Button>
              <p>{fileName}</p>
            </div>
          </div>
          <div className="flex justify-end">
            <Button variant="secondary" type="submit" fullWidth>
              Añadir producto
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
