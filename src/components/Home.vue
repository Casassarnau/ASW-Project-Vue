<template>
    <div class="container">
        <div class="card text-white bg-dark mb-3" style="margin-bottom: 10px" v-for="item in result" :key="item">
            <div class="row">
                <div v-if="item.voted" class="col-1" @click="voteclick(item)" style="background-image: url('arrow-down.svg'); background-repeat: no-repeat; background-size: 40px; background-position: center center;"></div>
                <div v-if="!item.voted" class="col-1" @click="voteclick(item)" style="background-image: url('arrow-up.svg'); background-repeat: no-repeat; background-size: 40px; background-position: center center;"></div>
                <div class="col-11 card-body" style="text-align: left">
                    <router-link v-if="item.type == 'a'" :to="{path: '/contibution', query: { id: item.id }}"><h5 class="card-title">{{item.title}}</h5></router-link>
                    <a v-if="item.type == 'u'" :href=item.url><h5 class="card-title">{{item.title}}</h5></a>
                    <p class="card-text">{{ item.points }} points by <router-link :to="{path: '/profile', query: { username: item.username }}">{{item.username}}</router-link>
                    {{item.time}}<span style="float:right;">
                        <router-link :to="{path: '/contibution', query: { id: item.id }}">{{ item.number_comments != 0 ? item.number_comments + ' comments' : 'discuss' }}</router-link>
                        </span></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data () {
        return {
            result: null,
        }
    },
    props: {
        path: {
        type: String,
        default: ''
        }
    },
    watch:{
        $route (to, from){
            this.reload()
        }
    },
    created() {
        this.reload();
    }, methods: {
        voteclick(item) {
            const user_id = 3, cont_id = item.id, voted = item.voted;
            if (voted) {
                axios.delete("http://localhost:8000/api/votes/?contribution_id=" + cont_id + "&user_id=" + user_id, {
                    headers: {
                        'Authorization': 'Token 1641c6bb85cd01f0ff961658daf3385212e0c9fc'
                    }
                }).then((result) => {
                    if (result.status == 204) {
                        item.voted = !voted;
                        item.points--;
                    } else {
                        console.log(result.data);
                    }
                })
            } else {
                axios.post("http://localhost:8000/api/votes/", {
                    user_id: user_id,
                    contribution_id: cont_id
                }, {
                    headers: {
                        'Authorization': 'Token 1641c6bb85cd01f0ff961658daf3385212e0c9fc'
                    }
                }).then((result) => {
                    if (result.status == 201) {
                        item.voted = !voted;
                        item.points++;
                    } else {
                        console.log(result.data);
                    }
                })
            }
        },
        reload() {
            axios.get("http://localhost:8000/api/contributions/" + this.$props.path, {
                headers: {
                    'Authorization': 'Token 1641c6bb85cd01f0ff961658daf3385212e0c9fc'
                }
            }).then((result) => {
                if (result.status == 200) {
                    this.result = result.data;
                } else {
                    console.log(result.data);
                }
            })
        }
    }
};
</script>
