<template>
  <div class="container">
    <div class="row">
      <div class="col-md-2 text-left">
        <b-button @click="sortMessage">Order by {{ sort }}</b-button>
      </div>
      <div class="col">
        <form class="row row-cols-lg-auto g-3 align-items-center">
          <div class="col-12">
            <label class="visually-hidden" for="message">Message</label>
            <div class="input-group">
              <input type="text" class="form-control" v-model="message" id="message" placeholder="message">
            </div>
          </div>
          <div class="col-12">
            <button type="button" @click="sendMessage" class="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
    <div class="row">
      <b-table striped hover :items="items"></b-table>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import messageServices from "../services/messageServices";
import {IReadCsv} from "@/types/IMessage";
import {AxiosResponse} from "axios";

export default defineComponent({
  name: "ListMessages",
  data() {
    return {
      items: [] as IReadCsv[],
      sort: "asc",
      message: '' as string
    };
  },

  mounted() {
    this.getMessages();
  },

  methods: {
    getMessages() {
      messageServices.getMessage().then((response: AxiosResponse) => {
        this.items = response.data;
        this.sort = this.sort === "asc" ? "desc" : "asc";
      });
    },

    sortMessage() {
      switch (this.sort) {
        case 'asc':
          this.items.sort((a, b) => +new Date(a.time) - +new Date(b.time));
          break;
        case 'desc':
          this.items.sort((a, b) => +new Date(b.time) - +new Date(a.time));
          break;
      }
      this.sort = this.sort === "asc" ? "desc" : "asc";
      return this.items;
    },

    sendMessage() {
      if (this.isHex(this.message) && this.message.length === 10) {
        const hex = this.splitBy2Chars(this.message);
        const [_, ...rest] = hex;
        const message = this.hexToMessage(rest);

        this.items.push({time: (new Date).toISOString(), message})
        this.message = '';
      } else {
        alert('message is not valid.')
      }

    },

    isHex(hex: string) {
      const hexDecimal = this.hexToDecimal(hex);
      return (hexDecimal.toString(16).toUpperCase() === hex)
    },

    splitBy2Chars(hexString: string): string[] {
      let result: string[] = []
      for (let i = 0; i < hexString.length; i += 2) {
        result.push(hexString.substr(i, 2))
      }
      return result
    },

    hexToDecimal(hex: string): number {
      return parseInt(hex, 16)
    },

    hexToMessage(hex: string[]): number {
      return hex.map(h => this.hexToDecimal(h)).reduce((acc, curr) => acc + curr, 0);
    }
  },
});
</script>
