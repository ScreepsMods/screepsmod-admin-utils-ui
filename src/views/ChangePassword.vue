<template>
  <v-layout column>
    <v-card>
      <v-card-text>
        <v-form ref="form" autocomplete="off" v-if="!success">
          <v-text-field
            type="password"
            v-model="oldpass"
            label="Old Password"
            hint="Leave blank if not set" />
          <v-text-field
            type="password"
            v-model="newpass"
            label="New Password"
            :rules="rules.newpass"/>
          <v-text-field
            type="password"
            v-model="newpass2"
            label="New Password (repeat)"
            :rules="rules.newpass2"/>
          <br>
          <SteamSignin @token="setToken($event)" />
          <br>
          <v-btn class="primary" @click="changePassword()">Change Password</v-btn>
        </v-form>
        <br>
        <v-alert type="error" v-if="error">
          {{ error }}
        </v-alert>
        <v-alert type="success" v-if="success">
          Password has been updated.
        </v-alert>
      </v-card-text>
    </v-card>
  </v-layout>
</template>
<script>
import SteamSignin from '@/components/SteamSignin'

export default {
  components: {
    SteamSignin
  },
  data () {
    const data = {
      success: false,
      error: '',
      token: '',
      oldpass: '',
      newpass: '',
      newpass2: '',
      rules: {
        newpass: [
          v => !!v || 'Password must be provided',
          v => v !== data.oldpass || 'New password cannot be the same as old password'
        ],
        newpass2: [
          v => !!v || 'Password must be provided',
          v => (!!v && v === data.newpass) || 'Passwords do not match'
        ]
      }
    }
    return data
  },
  methods: {
    setToken (token) {
      this.token = token
    },
    async changePassword () {
      if (!this.$refs.form.validate()) return
      if (!this.token) return alert('Please signin first')
      try {
        const { data } = await this.$axios.post('/api/user/password', {
          oldPassword: this.oldpass,
          password: this.newpass
        }, {
          headers: {
            'X-Token': this.token,
            'X-Username': this.token
          }
        })
        if (data.ok) this.success = true
      } catch (err) {
        this.error = 'Password change failed, check your old password and try again. If this is the first time changing your password, leave old password blank.'
      }
    }
  }
}
</script>
