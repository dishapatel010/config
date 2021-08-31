<template>
  <b-container>
    <h1>libDrive Config</h1>
    <p>
      Generate a config for
      <code><a href="https://github.com/libDrive/libDrive">libDrive</a></code
      >, the Google Drive media library
    </p>
    <p>
      Check out the
      <code
        ><a href="https://github.com/libDrive/libDrive/wiki"
          >config glossary</a
        ></code
      >
      for help!
    </p>
    <p>
      You must add the <code>Redirect URI</code> to your Developer Console web
      client credentials
    </p>
    <hr />

    <b-form>
      <h2>Config Sections</h2>

      <b-row>
        <b-col>
          <b-form-group>
            <b-form-radio-group
              id="starting-state-group"
              v-model="workflow.state"
              :options="workflow.options"
              buttons
              name="radios-btn-default"
              button-variant="outline-primary"
            ></b-form-radio-group>
          </b-form-group>
        </b-col>
      </b-row>

      <div v-if="isGoogle">
        <b-row>
          <b-col lg="6">
            <b-form-group
              id="client-id-group"
              label="Client ID"
              label-for="client-id-input"
            >
              <b-form-input
                id="client-id-input"
                v-model="form.client_id"
                type="text"
                placeholder=""
                required
                :state="form.client_id.length > 0 ? null : false"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="6">
            <b-form-group
              id="client-secret-group"
              label="Client Secret"
              label-for="client-secret-input"
            >
              <b-form-input
                id="client-secret-input"
                v-model="form.client_secret"
                type="text"
                placeholder=""
                required
                :state="form.client_secret.length > 0 ? null : false"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col lg="6">
            <b-form-group
              id="authorization-endpoint-group"
              label="Authorization Endpoint"
              label-for="authorization-endpoint-input"
            >
              <b-form-input
                id="authorization-endpoint-input"
                v-model="form.auth_endpoint"
                type="text"
                :disabled="true"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="6">
            <b-form-group
              id="token-endpoint-group"
              label="Token Endpoint"
              label-for="token-endpoint-input"
            >
              <b-form-input
                id="token-endpoint-input"
                v-model="form.token_endpoint"
                type="text"
                :disabled="true"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col lg="6">
            <b-form-group
              id="redirect-uri-group"
              label="Redirect URI"
              label-for="redirect-uri-input"
            >
              <b-form-input
                id="redirect-uri-input"
                v-model="form.redirect_uri"
                type="text"
                :disabled="true"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="6">
            <b-form-group
              id="scope-group"
              label="Scope"
              label-for="scope-input"
            >
              <b-form-input
                id="scope-input"
                v-model="form.scope"
                type="text"
                placeholder=""
                :disabled="true"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col lg="6">
            <b-form-group
              id="state-group"
              label="State"
              label-for="state-input"
            >
              <b-form-input
                id="state-input"
                v-model="form.state"
                type="text"
                :disabled="true"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="6">
            <b-form-group
              id="custom-parameters-group"
              label="Custom Parameters (Form-Encoded, Optional)"
              label-for="custom-parameters-input"
            >
              <b-form-input
                id="custom-parameters-input"
                v-model="form.custom_parameters"
                type="text"
                placeholder=""
                :disabled="true"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <b-form-group
              id="authorization-code-group"
              label="Authorization Code"
              label-for="authorization-code-input"
            >
              <b-input-group>
                <b-form-input
                  id="authorization-code-input"
                  v-model="form.auth_code"
                  type="text"
                  :disabled="true"
                ></b-form-input>
                <b-input-group-append>
                  <b-button variant="primary" v-clipboard:copy="form.auth_code"
                    >Copy</b-button
                  >
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col lg="6">
            <b-form-group
              id="access-token-group"
              label="Access Token"
              label-for="access-token-input"
            >
              <b-input-group>
                <b-form-input
                  id="access-token-input"
                  v-model="form.access_token"
                  type="text"
                  :disabled="true"
                ></b-form-input>
                <b-input-group-append>
                  <b-button
                    variant="primary"
                    v-clipboard:copy="form.access_token"
                    >Copy</b-button
                  >
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col lg="6">
            <b-form-group
              id="refresh-token-group"
              label="Refresh Token"
              label-for="refresh-token-input"
            >
              <b-input-group>
                <b-form-input
                  id="refresh-token-input"
                  v-model="form.refresh_token"
                  type="text"
                  :disabled="true"
                ></b-form-input>
                <b-input-group-append>
                  <b-button
                    variant="primary"
                    v-clipboard:copy="form.refresh_token"
                    >Copy</b-button
                  >
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <b-button variant="primary" @click="getauth_code">
              Get Credentials
              <b-spinner small v-if="workflow.showSpinner" />
            </b-button>
          </b-col>
        </b-row>
      </div>
    </b-form>

    <div v-if="isAccounts">
      <div
        v-for="(account, index) in form.account_list"
        :key="'account-' + index"
      >
        <b-card-title :title="'Account ' + index"></b-card-title>
        <b-row v-if="isAccounts">
          <b-col lg="6">
            <b-form-group
              id="accounts-username-group"
              label="Username"
              label-for="accounts-username-input"
            >
              <b-form-input
                id="accounts-username-input"
                v-model="form.account_list[index].username"
                type="text"
                required
                :state="
                  form.account_list[index].username.length > 0 ? null : false
                "
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="6">
            <b-form-group
              id="accounts-password-group"
              label="Password"
              label-for="accounts-password-input"
            >
              <b-form-input
                id="accounts-password-input"
                v-model="form.account_list[index].password"
                type="password"
                required
                :state="
                  form.account_list[index].password.length > 0 ? null : false
                "
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="6">
            <b-form-group
              id="accounts-pic-group"
              label="Picture"
              label-for="accounts-pic-input"
            >
              <b-form-input
                id="accounts-pic-input"
                v-model="form.account_list[index].pic"
                type="text"
                placeholder=""
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="6">
            <b-form-group
              id="accounts-auth-group"
              label="Auth"
              label-for="accounts-auth-input"
            >
              <b-form-input
                id="accounts-auth-input"
                v-model="form.account_list[index].auth"
                type="text"
                placeholder=""
                :disabled="true"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
      </div>
      <br />
      <b-row>
        <b-button variant="primary" class="ml-3" @click="appendAccounts">
          Add Account
          <b-spinner small v-if="workflow.showSpinner" />
        </b-button>
        <b-button variant="primary" class="ml-2" @click="removeAccounts">
          Remove Account
          <b-spinner small v-if="workflow.showSpinner" />
        </b-button>
      </b-row>
    </div>

    <div v-if="isCategories">
      <div
        v-for="(category, index) in form.category_list"
        :key="'category-' + index"
      >
        <b-card-title :title="'Category ' + index"></b-card-title>
        <b-row>
          <b-col lg="6">
            <b-form-group
              id="category-name-group"
              label="Name"
              label-for="category-name-input"
            >
              <b-form-input
                id="category-name-input"
                v-model="form.category_list[index].name"
                type="text"
                required
                :state="
                  form.category_list[index].name.length > 0 ? null : false
                "
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="6">
            <b-form-group
              id="category-id-group"
              label="Folder ID"
              label-for="category-id-input"
            >
              <b-form-input
                id="category-id-input"
                v-model="form.category_list[index].id"
                type="text"
                required
                :state="form.category_list[index].id.length > 0 ? null : false"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="4">
            <b-form-group
              id="category-language-group"
              label="Language"
              label-for="category-language-input"
            >
              <b-form-input
                id="category-language-input"
                v-model="form.category_list[index].language"
                type="text"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col lg="1.5">
            <b-form-group
              id="category-type-group"
              label="Type"
              label-for="category-type-input"
            >
              <b-dropdown
                variant="primary"
                :text="form.category_list[index].type"
                id="category-type-input"
                v-model="form.category_list[index].type"
              >
                <b-dropdown-item disabled value="Movies"
                  >Select the media library's type</b-dropdown-item
                >
                <b-dropdown-item
                  v-for="option in ['Movies', 'TV Shows']"
                  :key="option"
                  :value="option"
                  @click="form.category_list[index].type = option"
                >
                  {{ option }}
                </b-dropdown-item>
              </b-dropdown>
            </b-form-group>
          </b-col>
          <b-col lg="1" class="switch-css">
            <b-form-checkbox
              v-model="form.category_list[index].anilist"
              name="category-anilist-switch"
              size="lg"
              switch
            >
              Anilist
            </b-form-checkbox>
          </b-col>
        </b-row>
      </div>
      <br />
      <b-row>
        <b-button variant="primary" class="ml-3" @click="appendCategories">
          Add Category
          <b-spinner small v-if="workflow.showSpinner" />
        </b-button>
        <b-button variant="primary" class="ml-2" @click="removeCategories">
          Remove Category
          <b-spinner small v-if="workflow.showSpinner" />
        </b-button>
      </b-row>
    </div>

    <div v-if="isUI">
      <b-row>
        <b-col lg="6">
          <b-form-group
            id="title-group"
            label="Website Title"
            label-for="title-input"
          >
            <b-input-group>
              <b-form-input
                id="title-input"
                v-model="form.ui_config.title"
                type="text"
              ></b-form-input>
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col lg="6">
          <b-form-group
            id="icon-group"
            label="Website Icon URL"
            label-for="icon-input"
          >
            <b-input-group>
              <b-form-input
                id="icon-input"
                v-model="form.ui_config.icon"
                type="text"
              ></b-form-input>
            </b-input-group>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="6">
          <b-form-group
            id="custom-button-text-group"
            label="Custom Button Text"
            label-for="custom-button-text-input"
          >
            <b-input-group>
              <b-form-input
                id="custom-button-text-input"
                v-model="form.ui_config.custom_button.text"
                type="text"
              ></b-form-input>
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col lg="6">
          <b-form-group
            id="custom-button-url-group"
            label="Custom Button URL"
            label-for="custom-button-url-input"
          >
            <b-input-group>
              <b-form-input
                id="custom-button-url-input"
                v-model="form.ui_config.custom_button.url"
                type="text"
              ></b-form-input>
            </b-input-group>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="2">
          <b-form-group id="range-group" label="Range" label-for="range-input">
            <b-input-group>
              <b-form-input
                id="range-input"
                v-model="form.ui_config.range"
                type="number"
              ></b-form-input>
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col lg="2" class="switch-css">
          <b-form-checkbox
            v-model="form.ui_config.icon_on_nav"
            name="icon-on-nav-switch"
            switch
          >
            Icon On Nav
          </b-form-checkbox>
        </b-col>
        <b-col lg="2" class="switch-css">
          <b-form-checkbox
            v-model="form.ui_config.hide_news"
            name="hide-news-nav-switch"
            switch
          >
            Hide News
          </b-form-checkbox>
        </b-col>
      </b-row>
    </div>

    <b-row v-if="isExtras">
      <b-col lg="6">
        <b-form-group
          id="secret-key-group"
          label="Secret Key"
          label-for="secret-key-input"
        >
          <b-input-group>
            <b-form-input
              id="secret-key-input"
              v-model="form.secret_key"
              type="text"
              required
              :state="form.secret_key.length > 0 ? null : false"
            ></b-form-input>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col lg="6">
        <b-form-group
          id="tmdb-api-key-group"
          label="TMDB API Key"
          label-for="tmdb-api-key-input"
        >
          <b-input-group>
            <b-form-input
              id="tmdb-api-key-input"
              v-model="form.tmdb_api_key"
              type="text"
              required
              :state="form.tmdb_api_key.length > 0 ? null : false"
            ></b-form-input>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group
          id="cloudflare-group"
          label="Cloudflare"
          label-for="cloudflare-input"
        >
          <b-input-group>
            <b-form-input
              id="cloudflare-input"
              v-model="form.cloudflare"
              type="text"
            ></b-form-input>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row v-if="isExtras">
      <b-col lg="2">
        <b-form-group id="arcio-group" label="Arc.io" label-for="arcio-input">
          <b-input-group>
            <b-form-input
              id="arcio-input"
              v-model="form.arcio"
              type="text"
            ></b-form-input>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col lg="3">
        <b-form-group
          id="language-group"
          label="Language"
          label-for="language-input"
        >
          <b-input-group>
            <b-form-input
              id="language-input"
              v-model="form.language"
              type="text"
            ></b-form-input>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col lg="3">
        <b-form-group id="service-accounts-group" label="Service Accounts">
          <b-form-file
            ref="file-input"
            id="service-accounts-input"
            @change="sa_zip_file"
          ></b-form-file>
        </b-form-group>
      </b-col>
      <b-col lg="2">
        <b-form-group
          id="build-interval-group"
          label="Build Interval"
          label-for="build-interval-input"
        >
          <b-input-group>
            <b-form-input
              id="build-interval-input"
              v-model="form.build_interval"
              type="number"
              required
              :state="form.build_interval > 0 ? null : false"
            ></b-form-input>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group
          id="build-type-group"
          label="Build Type"
          label-for="build-type-input"
        >
          <b-dropdown
            variant="primary"
            :text="form.build_type"
            id="build-type-input"
            v-model="form.build_type"
          >
            <b-dropdown-item disabled value="hybrid"
              >Select which type of metadata build to use</b-dropdown-item
            >
            <b-dropdown-item
              v-for="option in ['hybrid', 'full']"
              :key="option"
              :value="option"
              @click="form.build_type = option"
            >
              {{ option }}
            </b-dropdown-item>
          </b-dropdown>
        </b-form-group>
      </b-col>
    </b-row>

    <div v-if="isExtras">
      <b-row>
        <b-col lg="3" class="switch-css">
          <b-form-checkbox
            class="no__overflow"
            v-model="form.transcoded"
            name="transcoded-switch"
            switch
          >
            Transcoded
          </b-form-checkbox>
        </b-col>
        <b-col lg="3" class="switch-css">
          <b-form-checkbox
            class="no__overflow"
            v-model="form.fetch_assets"
            name="fetch-assets-switch"
            switch
          >
            Fetch Assets
          </b-form-checkbox>
        </b-col>
        <b-col lg="3" class="switch-css">
          <b-form-checkbox
            class="no__overflow"
            v-model="form.signup"
            name="signup-switch"
            switch
          >
            Sign Up
          </b-form-checkbox>
        </b-col>
        <b-col lg="3" class="switch-css">
          <b-form-checkbox
            class="no__overflow"
            v-model="form.adult"
            name="adult-switch"
            switch
          >
            Adult
          </b-form-checkbox>
        </b-col>
      </b-row>
      <br />
      <b-row>
        <b-col lg="3" class="switch-css">
          <b-form-checkbox
            class="no__overflow"
            v-model="form.remove_duplicates"
            name="remove-duplicates-switch"
            switch
          >
            Remove Duplicates
          </b-form-checkbox>
        </b-col>
        <b-col lg="3" class="switch-css">
          <b-form-checkbox
            class="no__overflow"
            v-model="form.auth"
            name="auth-switch"
            switch
          >
            Authentication
          </b-form-checkbox>
        </b-col>
        <b-col lg="3" class="switch-css">
          <b-form-checkbox
            class="no__overflow"
            v-model="form.prefer_mkv"
            name="prefer-mkv-switch"
            switch
          >
            Prefer MKV
          </b-form-checkbox>
        </b-col>
        <b-col lg="3" class="switch-css">
          <b-form-checkbox
            class="no__overflow"
            v-model="form.prefer_mp4"
            name="prefer-mp4-switch"
            switch
          >
            Prefer MP4
          </b-form-checkbox>
        </b-col>
      </b-row>
      <br />
      <b-row>
        <b-col lg="3" class="switch-css">
          <b-form-checkbox
            class="no__overflow"
            v-model="form.remove_no_poster"
            name="remove-no-poster-switch"
            switch
          >
            Remove No Posters
          </b-form-checkbox>
        </b-col>
      </b-row>
    </div>

    <b-row v-if="isGenerate">
      <b-form-textarea
        id="textarea"
        v-model="form.config_box"
        spellcheck="false"
        placeholder=""
        rows="18"
      ></b-form-textarea>
    </b-row>

    <br v-if="isGenerate" />

    <b-row v-if="isGenerate">
      <b-button variant="primary" class="mr-2" @click="returnConfig">
        Generate Config
        <b-spinner small v-if="workflow.showSpinner" />
      </b-button>
      <b-button variant="primary" class="mr-2" @click="returnOneLineConfig">
        One Liner
        <b-spinner small v-if="workflow.showSpinner" />
      </b-button>
      <b-button variant="primary" class="mr-2" @click="downloadToFile">
        Download
        <b-spinner small v-if="workflow.showSpinner" />
      </b-button>
      <b-button variant="primary" class="mr-2" @click="importFromFile">
        Import
        <b-spinner small v-if="workflow.showSpinner" />
      </b-button>
      <b-button
        variant="primary"
        class="mr-2"
        v-clipboard:copy="form.config_box"
      >
        Copy
        <b-spinner small v-if="workflow.showSpinner" />
      </b-button>
      <input
        id="file-input"
        type="file"
        accept=".json"
        style="display: none"
        @change="handleFileChange"
      />
    </b-row>

    <hr />
    <footer class="text-center">
      <i
        >Source code is available on
        <a
          href="https://github.com/libDrive/config"
          target="_blank"
          rel="noopener noreferrer"
          >GitHub</a
        >.</i
      >
    </footer>
  </b-container>
</template>

<script>
import rand from "csprng";
import cache from "./lib/cache";
import JSZip from "jszip";
import {
  GOOGLE,
  ACCOUNTS,
  CATEGORIES,
  UI,
  EXTRAS,
  GENERATE,
} from "./lib/workflowStates";

function objToFormEncoded(obj) {
  return Object.entries(obj).reduce(
    (acc, [key, value]) =>
      acc
        ? `${acc}&${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        : `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    ""
  );
}

function generateState() {
  return rand(256, 36);
}

export default {
  name: "app",
  components: {},
  computed: {
    isGoogle() {
      return this.workflow.state === GOOGLE;
    },
    isAccounts() {
      return this.workflow.state === ACCOUNTS;
    },
    isCategories() {
      return this.workflow.state === CATEGORIES;
    },
    isUI() {
      return this.workflow.state === UI;
    },
    isExtras() {
      return this.workflow.state === EXTRAS;
    },
    isGenerate() {
      return this.workflow.state === GENERATE;
    },
  },
  data() {
    return {
      form: {
        access_token: cache.access_token,
        account_list: cache.account_list,
        adult: cache.adult,
        arcio: cache.arcio,
        auth: cache.auth,
        auth_code: cache.auth_code,
        auth_endpoint: cache.auth_endpoint,
        build_interval: cache.build_interval,
        build_type: cache.build_type,
        category_list: cache.category_list,
        client_id: cache.client_id,
        client_secret: cache.client_secret,
        cloudflare: cache.cloudflare,
        config_box: cache.config_box,
        custom_parameters: cache.custom_parameters,
        fetch_assets: cache.fetch_assets,
        prefer_mkv: cache.prefer_mkv,
        prefer_mp4: cache.prefer_mp4,
        redirect_uri: window.location.origin,
        refresh_token: cache.refresh_token,
        remove_duplicates: cache.remove_duplicates,
        remove_no_poster: cache.remove_no_poster,
        scope: cache.scope,
        secret_key: cache.secret_key,
        service_accounts: cache.service_accounts,
        signup: cache.signup,
        state: cache.state || generateState(),
        tmdb_api_key: cache.tmdb_api_key,
        token_endpoint: cache.token_endpoint,
        transcoded: cache.transcoded,
        ui_config: cache.ui_config,
      },
      workflow: {
        options: [GOOGLE, ACCOUNTS, CATEGORIES, UI, EXTRAS, GENERATE],
        showSpinner: false,
        state: GOOGLE,
      },
    };
  },
  methods: {
    async sa_zip_file(e) {
      var sa_files = [];
      await JSZip.loadAsync(e.target.files[0]).then((zip) => {
        zip.forEach((path, file) => {
          file.async("string").then((fileData) => {
            if (!(fileData == null || fileData == "")) {
              sa_files.push(JSON.parse(fileData));
            }
          });
        });
      });
      this.form.service_accounts = sa_files;
    },
    getauth_code() {
      this.updateAllCacheValues();

      let query = objToFormEncoded({
        response_type: "code",
        redirect_uri: this.form.redirect_uri,
        client_id: this.form.client_id,
        scope: this.form.scope,
        state: this.form.state,
      });

      if (this.form.custom_parameters) {
        query += `&${this.form.custom_parameters}`;
      }

      window.location.href = `${this.form.auth_endpoint}?${query}`;
    },
    handleError(msg, workflowStateOnError = GOOGLE) {
      this.$bvToast.toast(msg, {
        appendToast: false,
        noAutoHide: true,
        solid: true,
        title: "Error",
        toaster: "b-toaster-bottom-center",
        variant: "danger",
      });

      this.workflow.state = workflowStateOnError;
    },
    async requestTokens(body, workflowStateOnError) {
      this.workflow.showSpinner = true;
      const response = await fetch(this.form.token_endpoint, {
        method: "POST",
        headers: {
          Authorization: `Basic ${btoa(
            `${this.form.client_id}:${this.form.client_secret}`
          )}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: objToFormEncoded(body),
      });

      if (!response.ok) {
        const responseText = await response.text();
        this.handleError(
          `Authorization server rejected the request with a status code of '${response.status}'. ` +
            `Body: '${responseText}'`,
          workflowStateOnError
        );
      }

      try {
        const { access_token, refresh_token } = await response.json();
        return { access_token, refresh_token };
      } catch (err) {
        const responseText = await response.text();
        this.handleError(
          `Unable to parse authorization server response: '${responseText}'`,
          workflowStateOnError
        );
      } finally {
        this.workflow.showSpinner = false;
      }
    },
    async tradeInauth_code() {
      this.updateAllCacheValues();

      const body = {
        grant_type: "authorization_code",
        redirect_uri: this.form.redirect_uri,
        code: this.form.auth_code,
      };

      const { access_token, refresh_token } = await this.requestTokens(
        body,
        GOOGLE
      );

      this.form.auth_code = `(Used) ${this.form.auth_code}`;
      this.form.access_token = access_token;
      this.form.refresh_token =
        refresh_token || "Not provided by authorization server.";
      this.workflow.state = GOOGLE;
    },
    async tradeInrefresh_token() {
      this.updateAllCacheValues();

      const body = {
        grant_type: "refresh_token",
        refresh_token: this.form.refresh_token,
        scope: this.form.scope,
      };

      const { access_token, refresh_token } = await this.requestTokens(
        body,
        GOOGLE
      );

      this.form.access_token = access_token;
      this.form.refresh_token = refresh_token || this.form.refresh_token;
      this.workflow.state = GOOGLE;
    },
    async appendAccounts() {
      this.updateAllCacheValues();

      this.form.account_list.push({
        username: "",
        password: "",
        pic: "",
        auth: generateState(),
      });
    },
    async removeAccounts() {
      this.updateAllCacheValues();

      this.form.account_list.pop();
    },
    async appendCategories() {
      this.updateAllCacheValues();

      this.form.category_list.push({
        adult: false,
        anilist: false,
        id: "",
        language: "en",
        name: "",
        type: "Movies",
      });
    },
    async removeCategories() {
      this.updateAllCacheValues();

      this.form.category_list.pop();
    },
    async returnConfig() {
      let config = {};
      config.access_token = this.form.access_token;
      config.account_list = this.form.account_list;
      config.adult = this.form.adult;
      config.arcio = this.form.arcio;
      config.auth = this.form.auth;
      config.build_interval = parseInt(this.form.build_interval);
      config.build_type = this.form.build_type;
      config.category_list = this.form.category_list;
      config.client_id = this.form.client_id;
      config.client_secret = this.form.client_secret;
      config.cloudflare = this.form.cloudflare;
      config.fetch_assets = this.form.fetch_assets;
      config.refresh_token = this.form.refresh_token;
      config.remove_duplicates = this.form.remove_duplicates;
      config.remove_no_poster = this.form.remove_no_poster;
      config.secret_key = this.form.secret_key;
      config.tmdb_api_key = this.form.tmdb_api_key;
      config.token_expiry = "";
      config.prefer_mkv = this.form.prefer_mkv;
      config.prefer_mp4 = this.form.prefer_mp4;
      config.transcoded = this.form.transcoded;
      config.service_accounts = this.form.service_accounts;
      config.signup = this.form.signup;
      config.ui_config = this.form.ui_config;
      this.form.config_box = JSON.stringify(config, null, 4);

      this.updateAllCacheValues();
    },
    async returnOneLineConfig() {
      let config = {};
      config.access_token = this.form.access_token;
      config.account_list = this.form.account_list;
      config.adult = this.form.adult;
      config.arcio = this.form.arcio;
      config.auth = this.form.auth;
      config.build_interval = parseInt(this.form.build_interval);
      config.build_type = this.form.build_type;
      config.category_list = this.form.category_list;
      config.client_id = this.form.client_id;
      config.client_secret = this.form.client_secret;
      config.cloudflare = this.form.cloudflare;
      config.fetch_assets = this.form.fetch_assets;
      config.refresh_token = this.form.refresh_token;
      config.remove_duplicates = this.form.remove_duplicates;
      config.remove_no_poster = this.form.remove_no_poster;
      config.secret_key = this.form.secret_key;
      config.tmdb_api_key = this.form.tmdb_api_key;
      config.token_expiry = "";
      config.prefer_mkv = this.form.prefer_mkv;
      config.prefer_mp4 = this.form.prefer_mp4;
      config.transcoded = this.form.transcoded;
      config.service_accounts = this.form.service_accounts;
      config.signup = this.form.signup;
      config.ui_config = this.form.ui_config;
      this.form.config_box = JSON.stringify(config);

      this.updateAllCacheValues();
    },
    async downloadToFile() {
      const a = document.createElement("a");
      const file = new Blob([this.form.config_box], { type: "text/plain" });

      a.href = URL.createObjectURL(file);
      a.download = "config.json";
      a.click();

      URL.revokeObjectURL(a.href);
    },
    async importFromFile() {
      document.getElementById("file-input").click();
    },
    async handleFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      let reader = new FileReader();
      reader.readAsText(files[0]);
      reader.onload = () => {
        var lines = reader.result;
        var config = JSON.parse(lines);
        let newConfig = {};
        this.form.config_box = lines;
        for (var key in config) {
          eval("newConfig." + key + "= config." + key);
        }
        this.form = { ...this.form, ...newConfig };
      };
      reader.onerror = () => {
        return;
      };
      this.updateAllCacheValues();
    },
    updateAllCacheValues() {
      cache.access_token = this.form.access_token;
      cache.account_list = this.form.account_list;
      cache.adult = this.form.adult;
      cache.arcio = this.form.arcio;
      cache.auth = this.form.auth;
      cache.auth_code = this.form.auth_code;
      cache.auth_endpoint = this.form.auth_endpoint;
      cache.config_box = this.form.config_box;
      cache.build_interval = parseInt(this.form.build_interval);
      cache.build_type = this.form.build_type;
      cache.category_list = this.form.category_list;
      cache.client_id = this.form.client_id;
      cache.client_secret = this.form.client_secret;
      cache.cloudflare = this.form.cloudflare;
      cache.custom_parameters = this.form.custom_parameters;
      cache.fetch_assets = this.form.fetch_assets;
      cache.prefer_mkv = this.form.prefer_mkv;
      cache.prefer_mp4 = this.form.prefer_mp4;
      cache.refresh_token = this.form.refresh_token;
      cache.remove_duplicates = this.form.remove_duplicates;
      cache.remove_no_poster = this.form.remove_no_poster;
      cache.scope = this.form.scope;
      cache.secret_key = this.form.secret_key;
      cache.service_accounts = this.form.service_accounts;
      cache.signup = this.form.signup;
      cache.state = this.form.state;
      cache.tmdb_api_key = this.form.tmdb_api_key;
      cache.token_endpoint = this.form.token_endpoint;
      cache.token_expiry = "";
      cache.transcoded = this.form.transcoded;
      cache.ui_config = this.form.ui_config;
    },
  },
  mounted() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const state = params.get("state");
    window.history.pushState({}, document.title, "/");

    if (state) {
      if (state !== this.form.state) {
        this.handleError(
          `State from authorization server (${state}) did not match the state we sent (${this.form.state}). They must match to prevent cross-site request forgery. Please try again.`
        );
        this.form.state = generateState();
        return;
      }

      if (!code) {
        this.handleError(
          'Authorization server returned an invalid response (missing "code" query string parameter).'
        );
        this.form.state = generateState();
        return;
      }

      this.form.auth_code = code;
      this.tradeInauth_code();
      this.workflow.state = GOOGLE;
    }

    this.form.state = generateState();
  },
};
</script>

<style>
body {
  padding: 2vh 0;
}
.switch-css {
  display: flex;
  align-items: center;
}
.no__overflow {
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
