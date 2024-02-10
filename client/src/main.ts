import { createApp, h } from "vue";
import "./styles/tailwind.css";
import "./styles/style.css";
import App from "./App.vue";
import router from "./router/router";

const app = createApp({
  render: () => h(App),
});

app.use(router).mount("#app");
