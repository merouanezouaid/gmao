import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title> Application GMAO </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Application de GMAO
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Nombre de materiel" total={6} icon={'ant-design:area-chart-outlined'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Nombre d'interventions reussites" total={14} color="info" icon={'ant-design:check-square-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Nombre d'interventions en cours" total={2} color="warning" icon={'ant-design:clock-circle-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Nombre d'interventions non reussites" total={2} color="error" icon={'ant-design:close-circle-filled'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Interventions sur les machines"
              subheader="(+43%) d'interventions reussites plus que l'annee precedente"
              chartLabels={[
                '01/01/2023',
                '02/01/2023',
                '03/01/2023',
                '04/01/2023',
                '05/01/2023',
                '06/01/2023',
                '07/01/2023',
                '08/01/2023',
                '09/01/2023',
                '10/01/2023',
                '11/01/2023',
              ]}
              chartData={[
                {
                  name: 'interventions reussites',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'interventions non reussites',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 35, 40, 36, 39],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Interventions sur les machines"
              chartData={[
                { label: 'Interventions reussites', value: 714 },
                { label: 'Interventions non reussites', value: 23 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Nombre d'interventions sur la machine"
              subheader="(+23%) plus que l'annee precedente"
              chartData={[
                { label: 'Machine demballage ', value: 400 },
                { label: 'Robot de soudure', value: 430 },
                { label: 'Convoyeur à bande', value: 448 },
                { label: 'Scie circulaire', value: 470 },
                { label: 'Presse hydraulique', value: 540 },
                { label: 'Tour CNC', value: 580 },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Chronologie des interventions"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  'Intervention sur Robot de soudure recu',
                  'Intervention sur Presse hydraulique reussite',
                  'Affectation du technicien Brahim a une intervention sur Presse hydraulique',
                  'Intervention sur Presse hydraulique recu',
                  'Intervention sur Convoyeur à bande non reussite',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>

        </Grid>
      </Container>
    </>
  );
}