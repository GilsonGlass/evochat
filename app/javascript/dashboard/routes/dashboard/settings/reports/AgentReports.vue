<template>
  <evo-reports
    key="agent-reports"
    type="agent"
    getter-key="agents/getAgents"
    action-key="agents/get"
    :download-button-label="$t('REPORT.DOWNLOAD_AGENT_REPORTS')"
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
