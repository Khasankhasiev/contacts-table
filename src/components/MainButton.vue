<template>
   <div>
      <button class="add-button" @click="emitToggleModal">Добавить пользователя</button>
   </div>
</template>

<script>
export default {
  name: 'ButtonComponent',
  methods: {
    emitToggleModal() {
      this.$emit('toggle-modal')
    },
  },
}
</script>

<style scoped>

.add-button {
  background-color: rgb(0, 152, 121);
  padding: 8px 14px;
  border: none;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  transition: all 5ms;
}

.add-button:hover {
  background-color: #1d8b75;
}

.add-button:active {
  box-shadow: 0 0 5px rgb(0, 152, 121, 0.5);
}
</style>
