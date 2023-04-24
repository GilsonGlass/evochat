<template>
  <evo-reports
    key="team-reports"
    type="team"
    getter-key="teams/getTeams"
    action-key="teams/get"
    :download-button-label="$t('TEAM_REPORTS.DOWNLOAD_TEAM_REPORTS')"
  />
</template>

<script>
import EvoReports from './components/EvoReports';

export default {
  components: {
    EvoReports,
  },
};
</script>
