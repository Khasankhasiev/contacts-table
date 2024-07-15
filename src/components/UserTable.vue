<template>
  <div>
    <table class="users-table">

      <thead>
        <tr>
          <th class="table-head" @click="sort('name')">Имя</th>
          <th>Телефон</th>
          <th>Начальник</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="userContact in nestedContacts" :key="userContact.id">
          <td>
            <p :style="{ 'margin-left': userContact.level * 15 + 'px' }">
              {{ userContact.name }}
            </p>
          </td>
          <td>{{ userContact.phone }}</td>
          <td>{{ getContactName(userContact.boss) }}</td>
        </tr>
      </tbody>

    </table>
  </div>
</template>

<script>
export default {
  name: 'UserTable',
  props: {
    userContacts: {
      type: Array,
      required: true,
    },
  },

  computed: {
    nestedContacts() {
      const map = new Map()

      this.userContacts.forEach((userContact) => {
        userContact.children = []
        map.set(userContact.id, userContact)
      })

      const result = []

      this.userContacts.forEach((userContact) => {
        if (userContact.boss) {
          const boss = map.get(userContact.boss)

          if (boss) {
            userContact.level = (boss.level || 0) + 1
            boss.children.push(userContact)
          } else {
            result.push(userContact)
          }
        } else {
          userContact.level = 0
          result.push(userContact)
        }
      })

      const flatten = (userContacts) => {
        return userContacts.reduce((acc, userContact) => {
          acc.push(userContact)

          if (userContact.children.length) {
            acc = acc.concat(flatten(userContact.children))
          }

          return acc
        }, [])
      }

      return flatten(result)
    },
  },

  methods: {
    getContactName(id) {
      const userContact = this.userContacts.find((c) => c.id === id)
      return userContact ? userContact.name : null
    },

    sort(key) {
      this.$emit('sort', key)
    },
  },
}
</script>

<style scoped>
.users-table {
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 18px;
  min-width: 400px;
  width: 100%;
}

.users-table thead tr {
  background-color: #009879;
  color: #ffffff;
  text-align: left;
}

.table-head {
  cursor: pointer;
}

.users-table th,
.users-table td {
  padding: 12px 15px;
  border: 1px solid #dddddd;
}

.users-table tbody tr {
  border-bottom: 1px solid #dddddd;
}

.users-table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

.users-table tbody tr:last-of-type {
  border-bottom: 2px solid #009879;
}
</style>
