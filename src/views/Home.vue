<template>

  <v-container>

    <v-snackbar
        v-model="installDialog"
        :vertical="false"
        :timeout="installDialogTimeout">

      <template>
        <p class="text-center"> آیا میخواهید app را نصب کنید؟</p>

        <div class="d-flex justify-end">
          <v-btn
              color="green"
              text
              @click="installApp">بله نصب کن
          </v-btn>
          <v-btn
              color="indigo"
              text
              @click="dismissInstall">خیر
          </v-btn>
        </div>

      </template>
    </v-snackbar>

    <!--    <v-snackbar-->
    <!--        vertical-->
    <!--        v-model="installDialog"-->
    <!--        :timeout="installDialogTimeout">-->
    <!--      <template v-slot:action="{ attrs }">-->
    <!--       <div class="d-block">-->
    <!--         <p class="text&#45;&#45;black">آیا میخواهید اپ را نصب کنید؟</p>-->
    <!--         <br>-->
    <!--         <v-btn color="green" dark block rounded @click="installApp">بله</v-btn>-->
    <!--         <v-btn color="red" dark block text @click="dismissInstall">خیر</v-btn>-->
    <!--       </div>-->
    <!--      </template>-->
    <!--    </v-snackbar>-->


    <v-row class="justify-center">
      <v-col cols="12" md="6">
        <v-card class="pa-4" elevation="2">
          <v-card-title>
            TODO your works body
          </v-card-title>
          <v-row>
            <v-col cols="12" sm="6" md="12">

              <v-text-field
                  v-model="item.title"
                  label="What is your work title?"
                  placeholder="write your work title here..."
                  outlined
                  dense
                  clearable
              ></v-text-field>


              <v-text-field
                  v-model="item.content"
                  label="What to do?"
                  placeholder="write your work here..."
                  outlined
                  dense
                  clearable
              ></v-text-field>

            </v-col>
            <v-col cols="12" sm="6" md="12">
              <v-btn color="green" @click="saveToDo()" block dark>
                save Todo
              </v-btn>
            </v-col>
          </v-row>

          <div v-if="items.length !== 0">
            <br>

            <v-divider></v-divider>

            <v-list
                flat
                subheader
                three-line>
              <v-subheader>Todo List</v-subheader>

              <v-list-item-group
                  multiple
                  active-class="">

                <v-list-item v-for="(item,index) in items" v-bind:key="index">
                  <template v-slot:default="{ active }">

                    <v-list-item-action>
                      <v-checkbox v-model="item.active"></v-checkbox>
                    </v-list-item-action>

                    <v-list-item-content>
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                      <v-list-item-subtitle>{{ item.content }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </v-list-item>

                <v-btn
                    color="red"
                    dark
                    block
                    @click="removeDoneTodos">
                  remove done todos
                </v-btn>

              </v-list-item-group>
            </v-list>
          </div>
        </v-card>

      </v-col>
    </v-row>
  </v-container>

</template>

<script>


export default {
  name: 'Home',
  components: {},
  data() {
    return {
      item: {
        title: '',
        content: '',
        active: false,
      },
      items: [],
      installDialog: false,
      installDialogTimeout: 10000,
      differedPrompt: null
    }
  },
  methods: {
    saveToDo() {
      if (this.item.title !== '') {
        this.items.push(this.item)
        this.item = {
          title: '',
          content: '',
          active: false,
        }
      }
    },
    removeDoneTodos() {
      let i = this.items.length
      while (i--) {
        if (this.items[i].active === true) {
          this.items.splice(i, 1)
        }
      }
    },
    installApp() {
      this.installDialog = false
      this.differedPrompt.prompt()
      this.differedPrompt.userChoice
          .then(choiceResult => {
            if (choiceResult.outcome === 'accepted') {
              console.log('user accepted the A2HS prompt')
            } else {
              console.log('user dismissed the A2HS prompt')
            }
            this.installDialog = false
            this.differedPrompt = null
          })
    },
    dismissInstall() {
      this.installDialog = false
    },
  },
  watch: {
    items: {
      handler() {
        localStorage.setItem('todos', JSON.stringify(this.items))
      }
    }
  },
  // mounted() {
  //   window.addEventListener('beforeinstallprompt', (e) => {
  //     e.preventDefault()
  //     this.differedPrompt = e
  //     if (this.isMobileCheck) {
  //       this.installDialog = true
  //     }
  //   })
  //   if (localStorage.getItem('todos')) {
  //     this.items = JSON.parse(localStorage.getItem('todos'))
  //   }
  // }
}
</script>
