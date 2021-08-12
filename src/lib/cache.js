module.exports = {
  get auth_endpoint() {
    return window.sessionStorage.getItem("auth_endpoint") || "";
  },
  set auth_endpoint(value) {
    window.sessionStorage.setItem("auth_endpoint", "");
  },

  get token_endpoint() {
    return window.sessionStorage.getItem("token_endpoint") || "";
  },
  set token_endpoint(value) {
    window.sessionStorage.setItem("token_endpoint", value);
  },

  get auth() {
    return window.sessionStorage.getItem("auth") || true;
  },
  set auth(value) {
    window.sessionStorage.setItem("auth", value);
  },

  get arcio() {
    return window.sessionStorage.getItem("arcio") || "dev";
  },
  set arcio(value) {
    window.sessionStorage.setItem("arcio", value);
  },

  get client_id() {
    return window.sessionStorage.getItem("client_id") || "";
  },
  set client_id(value) {
    window.sessionStorage.setItem("client_id", value);
  },

  get client_secret() {
    return window.sessionStorage.getItem("client_secret") || "";
  },
  set client_secret(value) {
    window.sessionStorage.setItem("client_secret", value);
  },

  get adult() {
    return window.sessionStorage.getItem("adult") || false;
  },
  set adult(value) {
    window.sessionStorage.setItem("adult", value);
  },

  get cloudflare() {
    return window.sessionStorage.getItem("cloudflare") || "";
  },
  set cloudflare(value) {
    window.sessionStorage.setItem("cloudflare", value);
  },

  get build_interval() {
    return parseInt(window.sessionStorage.getItem("build_interval")) || 360;
  },
  set build_interval(value) {
    window.sessionStorage.setItem("build_interval", toString(value));
  },

  get build_type() {
    return window.sessionStorage.getItem("build_type") || "hybrid";
  },
  set build_type(value) {
    window.sessionStorage.setItem("build_type", value);
  },

  get language() {
    return window.sessionStorage.getItem("language") || "en";
  },
  set language(value) {
    window.sessionStorage.setItem("language", value);
  },

  get prefer_mkv() {
    return window.sessionStorage.getItem("prefer_mkv") || false;
  },
  set prefer_mkv(value) {
    window.sessionStorage.setItem("prefer_mkv", value);
  },

  get prefer_mp4() {
    return window.sessionStorage.getItem("prefer_mp4") || true;
  },
  set prefer_mp4(value) {
    window.sessionStorage.setItem("prefer_mp4", value);
  },

  get transcoded() {
    return window.sessionStorage.getItem("transcoded") || true;
  },
  set transcoded(value) {
    window.sessionStorage.setItem("transcoded", value);
  },

  get signup() {
    return window.sessionStorage.getItem("signup") || false;
  },
  set signup(value) {
    window.sessionStorage.setItem("signup", value);
  },

  get subtitles() {
    return window.sessionStorage.getItem("subtitles") || false;
  },
  set subtitles(value) {
    window.sessionStorage.setItem("subtitles", value);
  },

  get ui_config() {
    var config = JSON.parse(window.sessionStorage.getItem("ui_config") || "{}");
    if (!config.custom_button) {
      config.custom_button = {};
    }
    return config;
  },
  set ui_config(value) {
    window.sessionStorage.setItem("ui_config", JSON.stringify(value));
  },

  get scope() {
    return window.sessionStorage.getItem("scope") || "";
  },
  set scope(value) {
    window.sessionStorage.setItem("scope", value);
  },

  get custom_parameters() {
    return window.sessionStorage.getItem("custom_parameters") || "";
  },
  set custom_parameters(value) {
    window.sessionStorage.setItem("custom_parameters", value);
  },

  get state() {
    return window.sessionStorage.getItem("state") || "";
  },
  set state(value) {
    window.sessionStorage.setItem("state", value);
  },

  get auth_code() {
    return window.sessionStorage.getItem("auth_code") || "";
  },
  set auth_code(value) {
    window.sessionStorage.setItem("auth_code", value);
  },

  get access_token() {
    return window.sessionStorage.getItem("access_token") || "";
  },
  set access_token(value) {
    window.sessionStorage.setItem("access_token", value);
  },

  get refresh_token() {
    return window.sessionStorage.getItem("refresh_token") || "";
  },
  set refresh_token(value) {
    window.sessionStorage.setItem("refresh_token", value);
  },

  get account_list() {
    return JSON.parse(window.sessionStorage.getItem("account_list")) || [];
  },
  set account_list(value) {
    window.sessionStorage.setItem("account_list", JSON.stringify(value));
  },

  get category_list() {
    return JSON.parse(window.sessionStorage.getItem("category_list")) || [];
  },
  set category_list(value) {
    window.sessionStorage.setItem("category_list", JSON.stringify(value));
  },

  set service_accounts(value) {
    window.sessionStorage.setItem("service_accounts", JSON.stringify(value));
  },
  get service_accounts() {
    return JSON.parse(window.sessionStorage.getItem("service_accounts")) || [];
  },

  get secret_key() {
    return window.sessionStorage.getItem("secret_key") || "";
  },
  set secret_key(value) {
    window.sessionStorage.setItem("secret_key", value);
  },

  get tmdb_api_key() {
    return window.sessionStorage.getItem("tmdb_api_key") || "";
  },
  set tmdb_api_key(value) {
    window.sessionStorage.setItem("tmdb_api_key", value);
  },

  get config_box() {
    return window.sessionStorage.getItem("config_box") || "";
  },
  set config_box(value) {
    window.sessionStorage.setItem("config_box", value);
  },
};
