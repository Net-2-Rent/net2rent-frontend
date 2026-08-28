import { useForm, Controller } from 'react-hook-form';
import TextField from '../../../../../../shared/components/ui/atoms/TextField/TextField.jsx';
import TextArea from '../../../../../../shared/components/ui/atoms/TextArea/TextArea.jsx';
import FormField from '../../../../../../shared/components/ui/molecules/FormField/FormField.jsx';
import FileUpload from '../../../../../../shared/components/ui/molecules/FileUpload/FileUpload.jsx';
import PrimaryButton from '../../atoms/PrimaryButton/PrimaryButton.jsx';
import './NewIncidentForm.scss';

const DESCRIPTION_MIN = 10;
const DESCRIPTION_MAX = 2000;

export default function NewIncidentForm({ onSubmit, submitError }) {
    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        mode: 'onTouched',
        defaultValues: {
            firstName: '',
            lastName: '',
            contact: '',
            description: '',
            photo: null,
        },
    });

    const descriptionLength = watch('description').length;

    function describedBy(name, hasHint) {
        if (errors[name]) return `${name}-error`;
        if (hasHint) return `${name}-hint`;
        return undefined;
    }

    return (
        <form className="new-incident-form" onSubmit={handleSubmit(onSubmit)} noValidate>
            {submitError && (
                <div className="new-incident-form__alert" role="alert">
                    {submitError}
                </div>
            )}

            <div className="new-incident-form__row">
                <FormField id="firstName" label="Nombre" error={errors.firstName?.message}>
                    <TextField
                        id="firstName"
                        invalid={!!errors.firstName}
                        autoComplete="given-name"
                        aria-describedby={describedBy('firstName', false)}
                        {...register('firstName', {
                            required: 'El nombre es obligatorio',
                            maxLength: { value: 80, message: 'Máximo 80 caracteres' },
                        })}
                    />
                </FormField>

                <FormField id="lastName" label="Apellido" error={errors.lastName?.message}>
                    <TextField
                        id="lastName"
                        invalid={!!errors.lastName}
                        autoComplete="family-name"
                        aria-describedby={describedBy('lastName', false)}
                        {...register('lastName', {
                            required: 'El apellido es obligatorio',
                            maxLength: { value: 80, message: 'Máximo 80 caracteres' },
                        })}
                    />
                </FormField>
            </div>

            <FormField
                id="contact"
                label="Teléfono o email de contacto"
                optional
                error={errors.contact?.message}
                hint="Por si necesitamos contactarte sobre la incidencia."
            >
                <TextField
                    id="contact"
                    invalid={!!errors.contact}
                    autoComplete="email"
                    aria-describedby={describedBy('contact', true)}
                    {...register('contact', {
                        maxLength: { value: 120, message: 'Máximo 120 caracteres' },
                    })}
                />
            </FormField>

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
                    aria-describedby={describedBy('description', true)}
                    {...register('description', {
                        required: 'La descripción es obligatoria',
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

            <div className="new-incident-form__field">
                <label className="new-incident-form__label" htmlFor="photo">
                    Foto <span className="new-incident-form__optional">(opcional)</span>
                </label>
                <Controller
                    name="photo"
                    control={control}
                    render={({ field }) => (
                        <FileUpload
                            id="photo"
                            value={field.value}
                            onChange={field.onChange}
                        />
                    )}
                />
            </div>

            <PrimaryButton type="submit" isLoading={isSubmitting}>
                Enviar incidencia
            </PrimaryButton>
        </form>
    );
}