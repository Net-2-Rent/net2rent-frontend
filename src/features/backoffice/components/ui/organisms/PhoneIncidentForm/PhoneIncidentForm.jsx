import { useForm } from "react-hook-form";
import TextField from "../../../../../../shared/components/ui/atoms/TextField/TextField.jsx";
import TextArea from "../../../../../../shared/components/ui/atoms/TextArea/TextArea.jsx";
import FormField from "../../../../../../shared/components/ui/molecules/FormField/FormField.jsx";
import { INCIDENT_PRIORITY, INCIDENT_PRIORITY_LABEL } from "../../../../../../shared/constants/incidentPriority.js";
import { INCIDENT_CATEGORY, INCIDENT_CATEGORY_LABEL } from "../../../../../../shared/constants/incidentCategory.js";
import NoticeBox from "../../../../../../shared/components/ui/molecules/NoticeBox/NoticeBox.jsx";
import Button from "../../../../../../shared/components/ui/atoms/Button/Button.jsx";
import "./PhoneIncidentForm.scss";

const E164 = /^\+[1-9]\d{1,14}$/;
const DESC_MIN = 10;
const DESC_MAX = 2000;

function today() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function PhoneIncidentForm({
                                            lodgings = [],
                                            operators = [],
                                            onSubmit,
                                            submitError,
                                          }) {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      lodgingId: "",
      operatorId: "",
      openedDate: today(),
      openedTime: new Date().toTimeString().slice(0, 5),
      firstName: "",
      lastName: "",
      contact: "",
      category: "",
      priority: INCIDENT_PRIORITY.NORMAL,
      description: "",
    },
  });

  const descriptionLength = watch("description").length;

  return (
      <form
          className="phone-incident-form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
      >
        <NoticeBox tone="brand">
          Registro por vía telefónica. Solo aparecen los alojamientos activos de tu cuenta; el título y el código se generan al guardar.
        </NoticeBox>
        {submitError && (
            <div className="phone-incident-form__alert" role="alert">
              {submitError}
            </div>
        )}

        <div className="phone-incident-form__row">
          <FormField
              id="lodgingId"
              label="Alojamiento (activos)"
              error={errors.lodgingId?.message}
              required
          >
            <select
                className="text-field"
                {...register("lodgingId", {
                  required: "Selecciona un alojamiento",
                })}
            >
              <option value="">Selecciona un alojamiento</option>
              {lodgings.map((lodging) => (
                  <option key={lodging.id} value={lodging.id}>
                    {lodging.ref} · {lodging.name}
                  </option>
              ))}
            </select>
          </FormField>

          <FormField id="operatorId" label="Operario asignado (opcional)">
            <select className="text-field" {...register("operatorId")}>
              <option value="">Sin asignar · va al pool</option>
              {operators.map((operator) => (
                  <option key={operator.id} value={operator.id}>
                    {operator.name}
                  </option>
              ))}
            </select>
          </FormField>
        </div>

        <div className="phone-incident-form__row">
          <FormField
              id="openedDate"
              label="Fecha de apertura"
              error={errors.openedDate?.message}
              required
          >
            <TextField
                type="date"
                max={today()}
                invalid={!!errors.openedDate}
                {...register("openedDate", {
                  required: "La fecha de apertura es obligatoria",
                  validate: (date) => {
                    const time = getValues("openedTime") || "00:00";
                    return (
                        new Date(`${date}T${time}`) <= new Date() ||
                        "No se admiten fechas ni horas futuras."
                    );
                  },
                })}
            />
          </FormField>

          <FormField
              id="openedTime"
              label="Hora de apertura"
              helper="Se admiten aperturas pasadas; no futuras."
              error={errors.openedTime?.message}
              required
          >
            <TextField
                type="time"
                invalid={!!errors.openedTime}
                {...register("openedTime", {
                  required: "La hora de apertura es obligatoria",
                })}
            />
          </FormField>
        </div>

        <div className="phone-incident-form__row">
          <FormField
              id="firstName"
              label="Nombre"
              error={errors.firstName?.message}
              required
          >
            <TextField
                placeholder="Nombre del reportante"
                invalid={!!errors.firstName}
                autoComplete="given-name"
                {...register("firstName", { required: "El nombre es obligatorio" })}
            />
          </FormField>

          <FormField
              id="lastName"
              label="Apellido"
              error={errors.lastName?.message}
              required
          >
            <TextField
                placeholder="Apellido"
                invalid={!!errors.lastName}
                autoComplete="family-name"
                {...register("lastName", {
                  required: "El apellido es obligatorio",
                })}
            />
          </FormField>
        </div>

        <div className="phone-incident-form__row">
          <FormField
              id="contact"
              label="Teléfono (opcional)"
              error={errors.contact?.message}
              helper="Formato internacional, p. ej. +34600111222"
          >
            <TextField
                type="tel"
                placeholder="+34600111222"
                invalid={!!errors.contact}
                autoComplete="tel"
                {...register("contact", {
                  validate: (v) =>
                      !v ||
                      E164.test(v) ||
                      "Usa formato internacional, p. ej. +34600111222",
                })}
            />
          </FormField>

          <FormField
              id="category"
              label="Categoría"
              error={errors.category?.message}
              required
          >
            <select
                className="text-field"
                {...register("category", {
                  required: "Selecciona una categoría",
                })}
            >
              <option value="">Selecciona una categoría</option>
              {Object.values(INCIDENT_CATEGORY).map((value) => (
                  <option key={value} value={value}>
                    {INCIDENT_CATEGORY_LABEL[value]}
                  </option>
              ))}
            </select>
          </FormField>
        </div>

        <FormField id="priority" label="Prioridad">
          <select className="text-field" {...register("priority")}>
            {Object.values(INCIDENT_PRIORITY).map((value) => (
                <option key={value} value={value}>
                  {INCIDENT_PRIORITY_LABEL[value]}
                  {value === INCIDENT_PRIORITY.NORMAL ? " (por defecto)" : ""}
                </option>
            ))}
          </select>
        </FormField>

        <FormField
            id="description"
            label={`Descripción (${descriptionLength}/${DESC_MAX})`}
            error={errors.description?.message}
            helper={`Mínimo ${DESC_MIN} caracteres`}
            required
        >
          <TextArea
              invalid={!!errors.description}
              placeholder="Qué ocurre, desde cuándo, qué ha intentado el cliente"
              {...register("description", {
                required: "La descripción es obligatoria",
                minLength: { value: DESC_MIN, message: `Mínimo ${DESC_MIN} caracteres` },
                maxLength: { value: DESC_MAX, message: `Máximo ${DESC_MAX} caracteres` },
              })}
          />
        </FormField>

        <div className="phone-incident-form__actions">
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            Registrar incidencia
          </Button>
          <Button type="button" variant="secondary">
            Cancelar
          </Button>
        </div>
      </form>
  );
}