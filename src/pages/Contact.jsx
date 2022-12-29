import { createRef } from "react";
import Header from "../componentes/Header/Header";
import Wrapper from "../hoc/Wrapper";

import FormText from "../componentes/Form/FormText";
import { Controller, useForm } from "react-hook-form";
import FormSelect from "../componentes/Form/FormSelect";

import FormTextarea from "../componentes/Form/FormTextarea";
import ReCAPTCHA from "react-google-recaptcha";
import clientAxios from "../config/axiosClient";
import SpinnerButton from "../componentes/spinner/SpinnerButton";
import Skeleton from "../hoc/Skeleton";

const recaptchaRef = createRef();

const Contact = () => {
  return (
    <>
      <Wrapper>
        <Header />
        <div className="flex justify-center">
          <div className="max-w-6xl flex flex-col items-center gap-10">
            <Hero />
            <Form />
          </div>
        </div>
      </Wrapper>
    </>
  );
};

const Hero = () => {
  return (
    <>
      <section className="mt-14">
        <h1 className="text-3xl md:text-5xl font-bold text-center capitalize">
          Queremos escucharte para mejorar Jabbits
        </h1>
      </section>
    </>
  );
};
const Form = () => {
  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      nombre: "",
      email: "",
      select: "",
      message: "",
    },
  });
  const submitForm = async (formData) => {
    try {
      const { data } = await clientAxios.post("/contacto", formData);
      console.log(data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const submitError = (data) => {
    console.log(data);
  };

  if(formState.isSubmitSuccessful) return <p className="font-bold text-green-500">Mensaje Enviado !</p>

  return (
    <form
      id="demo-form"
      onSubmit={handleSubmit(submitForm, submitError)}
      noValidate
      className="flex flex-col gap-5 max-w-2xl w-full"
    >
      <div className="grid grid-cols-2 gap-4	">
        <Controller
          name="nombre"
          control={control}
          rules={{
            required: {
              value: true,
              message: "El Nombre es obligatorio",
            },
          }}
          render={(controller) => (
            <FormText
              input={{
                ...controller.field,
                placeholder: "Nombre",
              }}
              fieldState={controller.fieldState}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          rules={{
            required: { value: true, message: "El Email es obligatorio" },
          }}
          render={(controller) => (
            <FormText
              input={{
                ...controller.field,
                type: "email",
                placeholder: "Email",
              }}
              fieldState={controller.fieldState}
            />
          )}
        />
      </div>

      <div>
        <Controller
          name="select"
          control={control}
          rules={{
            required: { value: true, message: "Este campo es obligatorio" },
          }}
          render={(controller) => (
            <FormSelect
              input={{
                ...controller.field,
                placeholder: "Que nos tienes que decir ? Ej. Feedback",
              }}
              fieldState={controller.fieldState}
              options={[
                { id: crypto.randomUUID(), name: "Feedback" },
                { id: crypto.randomUUID(), name: "Bugs" },
                { id: crypto.randomUUID(), name: "Mensaje" },
              ]}
            />
          )}
        />
      </div>

      <div>
        <Controller
          name="message"
          control={control}
          rules={{
            required: { value: true, message: "Este campo es obligatorio" },
          }}
          render={({ field, fieldState }) => (
            <FormTextarea
              fieldState={fieldState}
              input={{ ...field, rows: 6, placeholder: "Pon aqui tu mensaje" }}
            />
          )}
        />
      </div>

      <div>
        <Controller
          name="captcha"
          control={control}
          rules={{ required: { value: true, message: "Completa el captcha" } }}
          render={({ field, fieldState }) => (
            <>
              <ReCAPTCHA
                ref={recaptchaRef}
                size="normal"
                sitekey="6LfyHLYjAAAAAJLodIZI4Bl1WBPB-d2SDOEYyXku"
                onChange={field.onChange}
              />
              <span className="text-red-500">
                {fieldState.error && fieldState.error.message}
              </span>
            </>
          )}
        />
      </div>

      <button disabled={formState.isSubmitSuccessful} className="dark:bg-stone-900 flex justify-center p-2 rounded-full dark:border-white border w-[120px] bg-white border-black transition-all  dark:enabled:hover:bg-white dark:enabled:hover:text-black enabled:hover:bg-black enabled:hover:text-white">
        <Skeleton
        value={!formState.isSubmitting}
        skeleton={<div className="invert dark:invert-0"><SpinnerButton /></div>}
        >
        Enviar
        </Skeleton>
      </button>
    </form>
  );
};

export default Contact;
