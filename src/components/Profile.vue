<template>
    <form style="max-width:600px; margin:auto;">
        <div class="row mb-3">
            <label for="username" class="col-sm-2 col-form-label">user:</label>
            <div class="col-sm-10" style="text-align:left">
                <label class="col-form-label" id="username"> {{result.username}} </label>
            </div>
        </div>
        <div class="row mb-3">
            <label for="created" class="col-sm-2 col-form-label">created:</label>
            <div class="col-sm-10" style = "text-align:left">
                <label class="col-form-label" id="created"> {{result.date_joined}} </label>
            </div>
        </div>
        <div class="row mb-3">
            <label for="karma" class="col-sm-2 col-form-label">karma:</label>
            <div class="col-sm-10" style="text-align:left">
                <label class="col-form-label" id="karma"> {{result.karma}} </label>
            </div>
        </div>
        <div class="row mb-3">
            <label for="inputAbout" class="col-sm-2 col-form-label">about:</label>
            <div class="col-sm-10">
                <textarea class="form-control" id="inputAbout" style="height: 100px" v-model="result.description"> </textarea>
            </div>
        </div>
        <div class="row mb-3">
            <label for="inputEmail" class="col-sm-2 col-form-label">email:</label>
            <div class="col-sm-10">
                <input type="email" class="form-control" id="inputEmail" v-model="result.email">
            </div>
        </div>
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
                <input type="number" class="form-control" id="inputMaxVisit" v-model="result.maxvisit">
            </div>
        </div>
        <div class="row mb-3">
            <label for="inputMinAway" class="col-sm-2 col-form-label">minaway:</label>
            <div class="col-sm-10">
                <input type="number" class="form-control" id="inputMinAway" v-model="result.minaway">
            </div>
        </div>
        <div class="row mb-3">
            <label for="inputDelay" class="col-sm-2 col-form-label">delay:</label>
            <div class="col-sm-10">
                <input type="number" class="form-control" id="inputDelay" v-model="result.delay">
            </div>
        </div>
        <div class="row mb-3">
            <label for="token" class="col-sm-2 col-form-label">API token:</label>
            <div class="col-sm-10" style="text-align:left">
                <label class="col-form-label" id="token">b42735f7cf4f3d64f5b0c7d8eed6906dbd547d4d</label>
            </div>
        </div>
        <button type="submit" class="btn btn-primary">update</button>
    </form>
</template>

<script>
    import axios from "axios";
    export default {
        data() {
            return {
                result: null,
                selectedDead: "No",
                selectedProcrast: "No",
            }
        },
        props: {
            email: String
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
                const user_id = 4;
                axios.get("http://127.0.0.1:8000/api/users/" + user_id, {
                    headers: {
                        'Authorization': 'Token 104e4820a2c082a040dba19a4a10ea9483d11844'
                    }
                }).then((result) => {
                    if (result.status == 200) {
                        this.result = result.data;
                        if (result.data.showdead) this.selectedDead = "Yes";
                        if (result.data.noprocrast) this.selectedProcrast = "Yes";
                        console.log(result.data);
                    } else {
                        console.log(result.data);
                    }
                })
            }
        }
    }
</script>
