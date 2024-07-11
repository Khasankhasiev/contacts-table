<template>
  <div id="app">
    <button class="add-button" @click="toggleModal">Добавить пользователя</button>

    <UserTable :userContacts="userContacts" @sort="sortContacts" />

    <AddUserModal :show="isShownModal" :userContacts="userContacts" @close="toggleModal" @add="addUser" />
  </div>
</template>

<script>
import UserTable from './components/UserTable.vue'
import AddUserModal from './components/AddUserModal.vue'

export default {
  name: 'App',
  components: {
    UserTable,
    AddUserModal,
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

<style>
#app {
  font-family: Arial, sans-serif;
  padding: 20px;
}

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
