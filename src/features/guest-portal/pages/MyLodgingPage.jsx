import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import ContentLayout from '../components/ui/organisms/ContentLayout/ContentLayout.jsx';
import PageHeader from '../components/ui/molecules/PageHeader/PageHeader.jsx';
import LodgingCard from '../components/ui/molecules/LodgingCard/LodgingCard.jsx';
import GuestIncidentItem from '../components/ui/organisms/GuestIncidentItem/GuestIncidentItem.jsx';
import EmptyState from '../components/ui/organisms/EmptyState/EmptyState.jsx';
import PrimaryButton from '../components/ui/atoms/PrimaryButton/PrimaryButton.jsx';
import TextButton from '../components/ui/atoms/TextButton/TextButton.jsx';
import NoticeBox from '../../../shared/components/ui/molecules/NoticeBox/NoticeBox.jsx';
import { useGuestAuthStore } from '../store/guestAuthStore.js';
import { fetchGuestIncidents } from '../services/guestApi.js';
import './MyLodgingPage.scss';

export default function MyLodgingPage() {
  const lodgingName = useGuestAuthStore((state) => state.lodgingName);
  const [incidents, setIncidents] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | error | success
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    fetchGuestIncidents()
      .then((data) => {
        if (!active) return;
        const sorted = [...data].sort(
          (a, b) => new Date(b.openedAt) - new Date(a.openedAt)
        );
        setIncidents(sorted);
        setStatus('success');
      })
      .catch((err) => {
        if (!active) return;
        setError(
          err.response?.data?.message ??
          'No se pudieron cargar las incidencias. Inténtalo de nuevo.'
        );
        setStatus('error');
      });

    return () => {
      active = false;
    };
  }, []);

  const handleRetry = () => {
    setStatus('loading');
    setError('');
    fetchGuestIncidents()
      .then((data) => {
        const sorted = [...data].sort(
          (a, b) => new Date(b.openedAt) - new Date(a.openedAt)
        );
        setIncidents(sorted);
        setStatus('success');
      })
      .catch((err) => {
        setError(
          err.response?.data?.message ??
          'No se pudieron cargar las incidencias. Inténtalo de nuevo.'
        );
        setStatus('error');
      });
  };

  return (
    <ContentLayout
      header={
        <PageHeader
          eyebrow="Tu alojamiento"
          title={lodgingName ?? 'Mi alojamiento'}
        />
      }
    >
      <div className="my-lodging-page">
        <LodgingCard name={lodgingName ?? 'Mi alojamiento'} reference="" />

        <div className="my-lodging-page__section-head">
          <h2 className="my-lodging-page__section-title">Incidencias</h2>
          <Link to="/incidencias/nueva" className="my-lodging-page__new-link">
            Reportar
          </Link>
        </div>

        {status === 'loading' && (
          <p className="my-lodging-page__status">Cargando…</p>
        )}

        {status === 'error' && (
          <div className="my-lodging-page__error">
            <AlertCircle size={24} aria-hidden="true" />
            <p>{error}</p>
            <PrimaryButton onClick={handleRetry}>Reintentar</PrimaryButton>
          </div>
        )}

        {status === 'success' && incidents.length === 0 && (
          <EmptyState
            icon={CheckCircle2}
            title="Todo en orden"
            action={
              <TextButton to="/incidencias/nueva">
                Reportar una incidencia
              </TextButton>
            }
          >
            No hay incidencias en tu alojamiento.
          </EmptyState>
        )}

        {status === 'success' && incidents.length > 0 && (
          <>
            <NoticeBox>
              Para incidencias urgentes como una fuga de agua o un corte de luz,
              llama directamente al teléfono de emergencias del alojamiento.
            </NoticeBox>
            <ul className="my-lodging-page__list">
              {incidents.map((incident) => (
                <GuestIncidentItem
                  key={incident.id}
                  to={`/incidencias/${incident.id}`}
                  code={incident.code}
                  title={incident.description}
                  status={incident.status}
                  openedAt={incident.openedAt}
                  closedAt={incident.closedAt}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </ContentLayout>
  );
}