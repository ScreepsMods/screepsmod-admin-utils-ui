<template>
  <v-layout column>
    <v-flex grow>
      <vue-term ref="term"/>
    </v-flex>
  </v-layout>
</template>
<script>
import vueTerm from '~/components/Term'
export default {
  components: {
    vueTerm
  },
  data () {
    return {
      buffer: ''
    }
  },
  mounted () {
    console.log(this.$refs)
    this.$refs.term.fit()
    this.$socket = new WebSocket(`${location.protocol.replace('http', 'ws')}//${location.host}/api/cli/socket`)
    this.$refs.term.$terminal.attach(this.$socket)
    this.$refs.term.$terminal.on('resize', size => {
      this.$socket.send(`@resize|${size.cols}|${size.rows}`)
    })
    /*
    this.$socket.addEventListener('message', msg => {
      console.log(msg.data)
      this.$refs.term.$terminal.write(data)
    })
    this.$refs.term.$terminal.on('data', data => {
      if (data == "\n" || data == "\r") {
        this.$socket.send(this.buffer)
        this.buffer = ''
      } else {
        this.buffer += data
      }
    })
    */
    // this.$refs.term.$stream.pipe(this.$refs.term.$stream)
  },
  beforeDestroy () {
    if (this.$socket) {
      this.$socket.close()
    }
  }
}
</script>
