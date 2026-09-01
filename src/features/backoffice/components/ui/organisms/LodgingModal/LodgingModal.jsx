import { useId } from "react";
import { useForm, Controller } from "react-hook-form";
import Modal from "../../../../../../shared/components/ui/molecules/Modal/Modal.jsx";
import TextField from "../../../../../../shared/components/ui/atoms/TextField/TextField.jsx";
import TextArea from "../../../../../../shared/components/ui/atoms/TextArea/TextArea.jsx";
import FormField from "../../../../../../shared/components/ui/molecules/FormField/FormField.jsx";
import InlineError from "../../../../../../shared/components/ui/atoms/InlineError/InlineError.jsx";
import HelperText from "../../../../../../shared/components/ui/atoms/HelperText/HelperText.jsx";
import Button from "../../../../../../shared/components/ui/atoms/Button/Button.jsx";
import PinGenerator from "../../molecules/PinGenerator/PinGenerator.jsx";
import "./LodgingModal.scss";

const TITLE_BY_MODE = {
  edit: "Editar alojamiento",
  pin: "Cambiar PIN de acceso",
  create: "Nuevo alojamiento",
};

export default function LodgingModal({
  isOpen,
  onClose,
  onSubmit,
  mode = "create",
  defaultValues,
  submitError,
}) {
  const formId = useId();
  const isPinOnly = mode === "pin";
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      name: "",
      address: "",
      reference: "",
      pin: "",
      notes: "",
      ...defaultValues,
    },
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={TITLE_BY_MODE[mode]}
      className={isPinOnly ? "lodging-modal--pin-only" : ""}
      footer={
        <div className="lodging-modal__actions">
          <Button
            type="submit"
            form={formId}
            variant="primary"
            disabled={isSubmitting}
          >
            Guardar
          </Button>
          <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
            Cancelar
          </Button>
        </div>
      }
    >
      <form id={formId} onSubmit={handleSubmit(onSubmit)} noValidate>
        {submitError && (
          <div className="lodging-modal__alert" role="alert">
            {submitError}
          </div>
        )}

        {!isPinOnly && (
          <>
            <FormField
              id="name"
              label="Nombre del alojamiento"
              error={errors.name?.message}
              required
            >
              <TextField
                invalid={!!errors.name}
                {...register("name", { required: "El nombre es obligatorio" })}
              />
            </FormField>

            <FormField
              id="address"
              label="Dirección"
              error={errors.address?.message}
              required
            >
              <TextField
                invalid={!!errors.address}
                {...register("address", {
                  required: "La dirección es obligatoria",
                })}
              />
            </FormField>

            <FormField
              id="reference"
              label="Referencia interna"
              error={errors.reference?.message}
              required
            >
              <TextField
                invalid={!!errors.reference}
                {...register("reference", {
                  required: "La referencia es obligatoria",
                })}
              />
            </FormField>
          </>
        )}

        <div className="lodging-modal__pin-field">
          <p className="lodging-modal__pin-label">
            PIN de seguridad (4 dígitos)
          </p>
          <Controller
            name="pin"
            control={control}
            rules={{
              validate: (value) => {
                if (mode !== "edit" && !value) return "El PIN es obligatorio";
                if (value && !/^\d{4}$/.test(value))
                  return "El código debe tener 4 dígitos";
                return true;
              },
            }}
            render={({ field }) => (
              <PinGenerator
                value={field.value}
                onChange={field.onChange}
                invalid={!!errors.pin}
              />
            )}
          />
          {errors.pin && <InlineError>{errors.pin.message}</InlineError>}
          <HelperText>
            Al guardar, el PIN anterior deja de funcionar.
          </HelperText>
        </div>

        {!isPinOnly && (
          <FormField id="notes" label="Notas privadas de acceso (uso interno)">
            <TextArea className="lodging-modal__notes" {...register("notes")} />
          </FormField>
        )}
      </form>
    </Modal>
  );
}
