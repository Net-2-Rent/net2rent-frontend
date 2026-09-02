import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/ui/organisms/AuthLayout/AuthLayout.jsx";
import PrimaryButton from "../components/ui/atoms/PrimaryButton/PrimaryButton.jsx";
import PinInput from "../../../shared/components/ui/atoms/PinInput/PinInput.jsx";
import TextField from "../../../shared/components/ui/atoms/TextField/TextField.jsx";
import FormField from "../../../shared/components/ui/molecules/FormField/FormField.jsx";
import InlineError from "../../../shared/components/ui/atoms/InlineError/InlineError.jsx";
import { useGuestAuthStore } from "../store/guestAuthStore.js";
import "./IdentificationPage.scss";
 
export default function IdentificationPage() {
  const navigate = useNavigate();
  const access = useGuestAuthStore((state) => state.access);
  const isLoading = useGuestAuthStore((state) => state.status === "loading");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState("");
  const [serverError, setServerError] = useState("");

  const onSubmit = async ({ ref }) => {
    setServerError("");
    setPinError("");

    if (pin.length !== 4) {
      setPinError("El PIN debe tener 4 dígitos");
      return;
    }

    const result = await access({ ref, pin });
    if (result.ok) {
      navigate("/alojamiento");
    } else {
      setServerError(result.message);
    }
  };

  return (
    <AuthLayout>
      <h1 className="identification-page__title">Bienvenido</h1>
      <p className="identification-page__subtitle">
        Introduce la referencia de tu alojamiento y tu PIN para ver y reportar incidencias.
      </p>

      <form className="identification-page__form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormField id="ref" label="Referencia del alojamiento" error={errors.ref?.message}>
          <TextField
            type="text"
            placeholder="Ej. APT-1001"
            {...register("ref", {
              required: "La referencia del alojamiento es obligatoria",
            })}
          />
        </FormField>

        <FormField id="pin" label="PIN de acceso">
          <PinInput value={pin} onChange={setPin} invalid={!!pinError} />
        </FormField>
        {pinError && <InlineError>{pinError}</InlineError>}

        {serverError && <InlineError>{serverError}</InlineError>}

        <PrimaryButton type="submit" isLoading={isLoading}>
          Acceder
        </PrimaryButton>
      </form>
    </AuthLayout>
  );
}