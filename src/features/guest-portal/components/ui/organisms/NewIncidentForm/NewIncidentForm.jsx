import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from "../../../../../../shared/components/ui/atoms/TextField/TextField.jsx";
import TextArea from "../../../../../../shared/components/ui/atoms/TextArea/TextArea.jsx";
import FormField from "../../../../../../shared/components/ui/molecules/FormField/FormField.jsx";
import PhotoUploadList from "../PhotoUploadList/PhotoUploadList.jsx";
import PrimaryButton from "../../atoms/PrimaryButton/PrimaryButton.jsx";
import DropdownField from "../../../../../../shared/components/ui/atoms/DropdownField/DropdownField.jsx";
import {
  INCIDENT_CATEGORY,
  INCIDENT_CATEGORY_LABEL,
} from "../../../../../../shared/constants/incidentCategory.js";
import ReadonlyField from "../../../../../../shared/components/ui/molecules/ReadonlyField/ReadonlyField.jsx";
import PhoneField from "../../../../../../shared/components/ui/molecules/PhoneField/PhoneField.jsx";
import { isPossiblePhoneNumber } from "react-phone-number-input";
import "./NewIncidentForm.scss";

const DESCRIPTION_MIN = 10;
const DESCRIPTION_MAX = 2000;

export default function NewIncidentForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      firstName: "",
      lastName: "",
      contact: "",
      description: "",
      category: "",
      images: [],
    },
  });

  const [submitError, setSubmitError] = useState(null);

  const descriptionValue = watch("description");
  const descriptionLength = descriptionValue.length;
  const titlePreview = descriptionValue.trim().slice(0, 80);

  function describedBy(name, hasHint) {
    if (errors[name]) return `${name}-error`;
    if (hasHint) return `${name}-hint`;
    return undefined;
  }

  async function submit(values) {
    setSubmitError(null);
    try {
      await onSubmit(values);
    } catch (err) {
      const fieldErrors = err.response?.data?.errors;
      if (fieldErrors?.length) {
        fieldErrors.forEach(({ field, message }) => {
          setError(field, { type: "server", message });
        });
      } else {
        setSubmitError(
          err.response?.data?.message ??
            "No se pudo enviar la incidencia. Inténtalo de nuevo.",
        );
      }
    }
  }

  return (
    <form
      className="new-incident-form"
      onSubmit={handleSubmit(submit)}
      noValidate
    >
      {submitError && (
        <div className="new-incident-form__alert" role="alert">
          {submitError}
        </div>
      )}

      <div className="new-incident-form__row">
        <FormField
          id="firstName"
          label="Nombre"
          error={errors.firstName?.message}
        >
          <TextField
            id="firstName"
            invalid={!!errors.firstName}
            autoComplete="given-name"
            aria-describedby={describedBy("firstName", false)}
            {...register("firstName", {
              required: "El nombre es obligatorio",
              maxLength: { value: 80, message: "Máximo 80 caracteres" },
            })}
          />
        </FormField>

        <FormField
          id="lastName"
          label="Apellido"
          error={errors.lastName?.message}
        >
          <TextField
            id="lastName"
            invalid={!!errors.lastName}
            autoComplete="family-name"
            aria-describedby={describedBy("lastName", false)}
            {...register("lastName", {
              required: "El apellido es obligatorio",
              maxLength: { value: 80, message: "Máximo 80 caracteres" },
            })}
          />
        </FormField>
      </div>

      <FormField
        id="contact"
        label="Teléfono de contacto"
        optional
        error={errors.contact?.message}
        hint="Por si necesitamos contactarte sobre la incidencia."
      >
        <Controller
          name="contact"
          control={control}
          rules={{
            validate: (v) =>
              !v || isPossiblePhoneNumber(v) || "Introduce un teléfono válido",
          }}
          render={({ field }) => (
            <PhoneField
              id="contact"
              invalid={!!errors.contact}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </FormField>

      <FormField
        id="category"
        label="Categoría"
        optional
        error={errors.category?.message}
      >
        <DropdownField
          id="category"
          invalid={!!errors.category}
          {...register("category")}
        >
          <option value="">Selecciona una categoría</option>
          {Object.values(INCIDENT_CATEGORY).map((value) => (
            <option key={value} value={value}>
              {INCIDENT_CATEGORY_LABEL[value]}
            </option>
          ))}
        </DropdownField>
      </FormField>

      <ReadonlyField label="Título de la incidencia" tag="Automático">
        {titlePreview || (
          <span style={{ color: "var(--color-text-muted)" }}>
            Se generará a partir de la descripción
          </span>
        )}
      </ReadonlyField>

      <FormField
        id="description"
        label="Descripción del problema"
        error={errors.description?.message}
        hint={`Describe qué ocurre, entre ${DESCRIPTION_MIN} y ${DESCRIPTION_MAX} caracteres.`}
        counter={`${descriptionLength}/${DESCRIPTION_MAX}`}
      >
        <TextArea
          id="description"
          invalid={!!errors.description}
          aria-describedby={describedBy("description", true)}
          {...register("description", {
            required: "La descripción es obligatoria",
            minLength: {
              value: DESCRIPTION_MIN,
              message: `Describe el problema con al menos ${DESCRIPTION_MIN} caracteres`,
            },
            maxLength: {
              value: DESCRIPTION_MAX,
              message: `La descripción no puede superar los ${DESCRIPTION_MAX} caracteres`,
            },
          })}
        />
      </FormField>

      <fieldset className="new-incident-form__field new-incident-form__fieldset">
        <legend className="new-incident-form__label">
          Fotos{" "}
          <span className="new-incident-form__optional">
            (opcional, máx. 3)
          </span>
        </legend>
        <Controller
          name="images"
          control={control}
          render={({ field }) => (
            <PhotoUploadList value={field.value} onChange={field.onChange} />
          )}
        />
      </fieldset>

      <PrimaryButton type="submit" isLoading={isSubmitting}>
        Enviar incidencia
      </PrimaryButton>
    </form>
  );
}
