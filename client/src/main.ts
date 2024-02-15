import { createApp, h } from "vue";
import { createPinia } from "pinia";
import "./styles/tailwind.css";
import "./styles/style.css";
import App from "./App.vue";
import router from "./router/router";

const app = createApp({
  render: () => h(App),
});
const pinia = createPinia();

app.use(pinia);
app.use(router).mount("#app");
