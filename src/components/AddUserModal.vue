<template>
  <div class="modal" v-if="show" @click.self="closeModal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2>Добавить пользователя</h2>

      <form class="modal-form" @submit.prevent="addUser">

        <div>
          <label for="name">Имя:</label>
          <input class="form-input" type="text" v-model="newUser.name" required v-focus/>
        </div>

        <div>
          <label for="phone">Телефон:</label>
          <input class="form-input" type="number" v-model="newUser.phone" required />
        </div>

        <div>
          <label for="boss">Начальник:</label>
          <select class="form-input" v-model="newUser.boss">
            <option value="">Нет</option>
            <option v-for="userContact in userContacts" :key="userContact.id" :value="userContact.id">{{ userContact.name }}</option>
          </select>
        </div>

        <button class="submit" type="submit">Добавить</button>
      </form>

    </div>
  </div>
</template>

<script>
export default {
  name: 'AddUserModal',
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    userContacts: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      newUser: {
        name: null,
        phone: null,
        boss: null,
      },
    }
  },

  methods: {
    closeModal() {
      this.$emit('close')
    },

    addUser() {
      if (this.newUser.name && this.newUser.phone) {
        this.$emit('add', { ...this.newUser, })
        this.newUser = { name: null, phone: null, boss: null, }
      }
    },
  },
}
</script>

<style scoped>
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4);
  font-size: 18px;
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.submit{
  background-color: rgb(0, 152, 121);
  padding: 8px 14px;
  border: none;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  transition: all 5ms;
}

.submit {
  background-color: rgb(0, 152, 121);
}
.submit:hover {
  background-color: #1d8b75;
}

.submit:active {
  box-shadow: 0 0 5px rgb(0, 152, 121, 0.5);
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.modal-form label {
  display: inline-block;
  width: 100px;
}

.form-input {
  outline: none;
  border: 1px solid rgb(0, 152, 121);
  padding: 5px;
  font-size: 18px;
  color: #000;
  width: 200px;
  box-sizing: border-box;
}
.form-input:focus {
  border: 2px solid rgb(0, 152, 121);
}
</style>
