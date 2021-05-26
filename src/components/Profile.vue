<template>
    <div v-if="!error" style="max-width:600px; margin:auto;">
        <div class="row mb-3">
            <label for="username" class="col-sm-2 col-form-label">user:</label>
            <div class="col-sm-10" style="text-align:left">
                <label class="col-form-label" id="username"> {{result.username}} </label>
            </div>
        </div>
        <div class="row mb-3">
            <label for="created" class="col-sm-2 col-form-label">created:</label>
            <div class="col-sm-10" style="text-align:left">
                <label class="col-form-label" id="created"> {{result.date_joined}} </label>
            </div>
        </div>
        <div class="row mb-3">
            <label for="karma" class="col-sm-2 col-form-label">karma:</label>
            <div class="col-sm-10" style="text-align:left">
                <label class="col-form-label" id="karma"> {{result.karma}} </label>
            </div>
        </div>

        <div v-if="!isAuthenticated" class="row mb-3">
            <label for="about" class="col-sm-2 col-form-label">about:</label>
            <div class="col-sm-10" style="text-align:left">
                <label class="col-form-label" id="about"> {{result.description}} </label>
            </div>
        </div>

        <div v-if="isAuthenticated">
            <div class="row mb-3">
                <label for="inputAbout" class="col-sm-2 col-form-label">about:</label>
                <div class="col-sm-10">
                    <textarea class="form-control" id="inputAbout" style="height: 100px" v-model="about"> </textarea>
                </div>
            </div>
            <div class="row mb-3">
                <label for="inputEmail" class="col-sm-2 col-form-label">email:</label>
                <div class="col-sm-10">
                    <input type="email" class="form-control" id="inputEmail" v-model="email">
                </div>
            </div>

            <div v-if="bademail">
                El correo no es valido
            </div>

            <div class="row mb-3"> </div>

            <div class="row mb-3">
                <label for="inputShowDead" class="col-sm-2 col-form-label">showdead:</label>
                <div class="col-sm-10">
                    <select id="inputShowDead" class="form-select" v-model="selectedDead">
                        <option>Yes</option>
                        <option>No</option>
                    </select>
                </div>
            </div>
            <div class="row mb-3">
                <label for="inputNoProcrast" class="col-sm-2 col-form-label">noprocrast:</label>
                <div class="col-sm-10">
                    <select id="inputNoProcrast" class="form-select" v-model="selectedProcrast">
                        <option selected>Yes</option>
                        <option>No</option>
                    </select>
                </div>
            </div>
            <div class="row mb-3">
                <label for="inputMaxVisit" class="col-sm-2 col-form-label">maxvisit:</label>
                <div class="col-sm-10">
                    <input type="number" class="form-control" id="inputMaxVisit" v-model="maxvisit">
                </div>
            </div>
            <div class="row mb-3">
                <label for="inputMinAway" class="col-sm-2 col-form-label">minaway:</label>
                <div class="col-sm-10">
                    <input type="number" class="form-control" id="inputMinAway" v-model="minaway">
                </div>
            </div>
            <div class="row mb-3">
                <label for="inputDelay" class="col-sm-2 col-form-label">delay:</label>
                <div class="col-sm-10">
                    <input type="number" class="form-control" id="inputDelay" v-model="delay">
                </div>
            </div>
        </div>
        <router-link v-bind:class="{ active: $route.path == '/submit' }" to="/submit">submissions</router-link>
        <div class="row mb-1"> </div>
        <router-link v-bind:class="{ active: $route.path == '/threads' }" :to="{path: '/threads', query: { id: result.id }}">comments</router-link>
        <div class="row mb-1"> </div>
        <div v-if="isAuthenticated">
            <router-link v-bind:class="{ active: $route.path == '/submit' }" to="/submit">upvoted submissions</router-link> / <router-link v-bind:class="{ active: $route.path == '/submit' }" to="/submit">comments</router-link> (private)
        </div>
        <div class="row mb-3"> </div>
        <button v-if="isAuthenticated" @click="submit()" class="btn btn-primary">update</button>
    </div>

    <div v-if="error"> {{this.errormsg}} </div>

</template>

<script>
    import axios from "axios";
    export default {
        data() {
            return {
                result: null,
                isAuthenticated: false,
                error: false,
                bademail: false,
                errormsg: "Error",

                about: "",
                email: "",
                selectedDead: "No",
                selectedProcrast: "No",
                maxvisit: 20,
                minaway: 180,
                delay: 0,
            }
        },
        watch: {
            $route(to, from) {
                this.reload()
            }
        },
        created() {
            this.reload();
        }, methods: {
            reload() {

                axios.get("http://127.0.0.1:8000/api/users/" + this.$route.query.userid, {
                    headers: {
                        'Authorization': 'Token 104e4820a2c082a040dba19a4a10ea9483d11844'
                    }
                }).then((result) => {
                    if (result.status === 200) {
                        if (this.$route.query.userid != 4) {
                            this.result = result.data;
                            this.isAuthenticated = false;
                        } else {

                            this.result = result.data;
                            this.isAuthenticated = true;

                            this.about = result.data.description;
                            this.email = result.data.email;
                            this.maxvisit = result.data.maxvisit;
                            this.minaway = result.data.minaway;
                            this.delay = result.data.delay;

                            if (result.data.showdead) this.selectedDead = "Yes";
                            if (result.data.noprocrast) this.selectedProcrast = "Yes";
                        }
                    } else {
                        console.log(result.data);
                    }
                }).catch((error) => {
                    console.log(error.response)
                    if (error.response.status === 404) {
                        this.error = true;
                        this.errormsg = "Error 404: Usuario no encontrado";
                    }
                    else {
                        console.log(error.response.data);
                    }
                })
            },
            submit() {
                this.bademail = !this.email.includes("@");

                if (!this.bademail) {

                    let showdead = (this.selectedDead == "Yes");
                    let noprocast = (this.selectedProcrast == "Yes");

                    console.log(this.userid)

                    axios.put("http://127.0.0.1:8000/api/users/" + this.$route.query.userid + "/", {
                        "email": this.email,
                        "description": this.about,
                        "showdead": showdead,
                        "noprocrast": noprocast,
                        "maxvisit": this.maxvisit,
                        "minaway": this.minaway,
                        "delay": this.delay,
                    }, {
                        headers: {
                            'Authorization': 'Token 104e4820a2c082a040dba19a4a10ea9483d11844'
                        }
                    }).then((result) => {
                        if (result.status === 200) {
                            console.log("success");
                            this.reload();
                        } else if (result.status === 401) {
                            this.error = true;
                            this.errormsg = "Authentication credentials were not provided";
                        } else if (result.status === 403) {
                            this.error = true;
                            this.errormsg = "You do not have permission to perform this action";
                        } else if (result.status === 404) {
                            this.error = true;
                            this.errormsg = "Not Found";

                        } else {
                            console.log(result.data);
                        }
                    })
                } else {
                    this.reload();
                }
            }
        }
    }
</script>
