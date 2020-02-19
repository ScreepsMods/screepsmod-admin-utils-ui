<template>
  <v-row justify="center">
    <v-col xs=12 sm=8 md=6 lg=4>
      <v-card>
        <v-card-title>Change Password</v-card-title>
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
          </v-form>
          <br>
          <v-alert type="error" v-if="error">
            {{ error }}
          </v-alert>
          <v-alert type="success" v-if="success">
            Password has been updated.
          </v-alert>
        </v-card-text>
        <v-card-actions>
          <v-row no-gutters>
            <v-col>
              <SteamSignin @token="setToken($event)" />
            </v-col>
            <v-col>
            </v-col>
              <v-btn text color="primary" @click="changePassword()">Change Password</v-btn>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
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
      if (!this.token) {
        this.error = 'Please signin with steam first'
        return
      }
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
