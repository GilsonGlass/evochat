<template>
  <evo-modal :show.sync="show" :on-close="onCancel">
    <div class="column content-box">
      <evo-modal-header
        :header-title="$t('NEW_CONVERSATION.TITLE')"
        :header-content="$t('NEW_CONVERSATION.DESC')"
      />
      <conversation-form
        :contact="contact"
        :on-submit="onSubmit"
        @success="onSuccess"
        @cancel="onCancel"
      />
    </div>
  </evo-modal>
</template>

<script>
import ConversationForm from './ConversationForm';

export default {
  components: {
    ConversationForm,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    contact: {
      type: Object,
      default: () => ({}),
    },
  },
  watch: {
    'contact.id'(id) {
      this.$store.dispatch('contacts/fetchContactableInbox', id);
    },
  },
  mounted() {
    const { id } = this.contact;
    this.$store.dispatch('contacts/fetchContactableInbox', id);
  },
  methods: {
    onCancel() {
      this.$emit('cancel');
    },
    onSuccess() {
      this.$emit('cancel');
    },
    async onSubmit(contactItem) {
      const data = await this.$store.dispatch(
        'contactConversations/create',
        contactItem
      );
      return data;
    },
  },
};
</script>
