// base
import Vue from "vue";

// material-vue
import { MdToolbar } from "vue-material/dist/components";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";

// app
import App from "./App.vue";
import "./style/index.scss";

// dependencies
import Meta from "vue-meta";
import axios from "axios";
import VueAxios from "vue-axios";

// set as vue component
Vue.use(MdToolbar);
Vue.use(Meta);
Vue.use(VueAxios, axios);

// pull name from package
import {name} from "../package.json";
let packageName = (name.split("-").map(function(d) { return d.charAt(0).toUpperCase() + d.slice(1);; })).join(" ");

// render app and mount to DOM
new Vue({
  render: h => h(App),
    metaInfo: {
      title: packageName, 
      htmlAttrs: {
        lang: "en"
      },
      link: [
          {
              rel: "icon", 
              href: "/favicon.ico"
          }
      ],
      meta: [
          {
              "property": "og:title",
              "content": packageName
          },
          {
              "property": "og:image",
              "content": process.env.VUE_APP_DEMO_POSTER
          },
          {
              "property": "og:type",
              "content": "website"
          },
          {
              "property": "og:url",
              "content": process.env.VUE_APP_DEMO_URL
          }
      ]
    }
}).$mount("#app")
