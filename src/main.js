import { createApp } from "vue";
import App from "./App.vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import "./assets/main.css";

const app = createApp(App);
app.use(Toast);
createApp(App).mount("#app");
