<template>
  <div id="app">
    <MainButton @toggle-modal="toggleModal"/>
    <UserTable :userContacts="userContacts" @sort="sortContacts" />

    <AddUserModal :show="isShownModal" :userContacts="userContacts" @close="toggleModal" @add="addUser" />
  </div>
</template>

<script>
import UserTable from './components/UserTable.vue'
import AddUserModal from './components/AddUserModal.vue'
import MainButton from './components/MainButton.vue'

export default {
  name: 'App',
  components: {
    UserTable,
    AddUserModal,
    MainButton,
  },

  data() {
    return {
      isShownModal: false,
      userContacts: JSON.parse(localStorage.getItem('userContacts')) || [],
      sortKey: null,
      sortOrders: {
        name: 1,
      },
    }
  },

  methods: {

    toggleModal() {
      this.isShownModal = !this.isShownModal
    },

    addUser(newUser) {
      newUser.id = Date.now()
      this.userContacts.push(newUser)
      this.saveContacts()
      this.isShownModal = false
    },

    saveContacts() {
      localStorage.setItem('userContacts', JSON.stringify(this.userContacts))
    },

    sortContacts(key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
      this.userContacts.sort((a, b) => {
        if (a[key] > b[key]) return 1 * this.sortOrders[key]
        if (a[key] < b[key]) return -1 * this.sortOrders[key]
      })
      this.saveContacts()
    },
  },

  watch: {
    userContacts: {
      handler() {
        this.saveContacts()
      },
      deep: true,
    },
  },
}
</script>

<style scoped>
#app {
  font-family: Arial, sans-serif;
  padding: 20px;
}
</style>
