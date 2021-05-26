<template>
    <div class="container">
        <div class="card text-white bg-dark mb-3" style="margin-bottom: 10px" v-for="item in result" :key="item">
            <div class="row">
                <div v-if="item.voted" class="col-1" @click="voteclick(item)" style="background-image: url('arrow-down.svg'); background-repeat: no-repeat; background-size: 40px; background-position: center center;"></div>
                <div v-if="!item.voted" class="col-1" @click="voteclick(item)" style="background-image: url('arrow-up.svg'); background-repeat: no-repeat; background-size: 40px; background-position: center center;"></div>
                <div class="col-11 card-body" style="text-align: left; font-size: 0.8em;">
                    <router-link class="link" v-if="item.type == 'a'" :to="{path: '/contribution', query: { id: item.id }}"><h5 class="card-title">{{item.title}}</h5></router-link>
                    <h5 class="card-title" v-if="item.type == 'u'"><a class="link" :href=item.url>{{item.title}}</a><a class="link link-2" style="font-size: 0.9em" :href="'https://' + item.domain"> ({{item.domain}})</a></h5>
                    <p class="card-text" style="color: rgb(179, 179, 179);">{{ item.points }} points by <router-link class="link" :to="{path: '/profile', query: { userid: item.user_id }}">{{item.username}}</router-link>
                        {{item.time}}
                        <router-link v-if="item.type == 'r' || item.type == 'c'" class="link" :to="{path: '/contribution', query: {id: item.parent}}">| parent</router-link>
                        <router-link v-if="item.type == 'r' || item.type == 'c'" class="link" :to="{path: '/contribution', query: {id: item.super_parent}}"> | On: {{item.super_parent_title}}</router-link>
                        <span style="float:right;">
                            <router-link v-if="item.type == 'a' || item.type == 'u'" class="link" :to="{path: '/contribution', query: { id: item.id }}">{{ item.number_comments != 0 ? item.number_comments + ' comments' : 'discuss' }}</router-link>
                            <router-link v-if="item.type == 'c' || item.type == 'r'" class="link" :to="{path: '/contribution', query: { id: item.id }}">reply</router-link>
                        </span>
                    </p>
                    <h6 v-if="item.type == 'r' || item.type == 'c'" class="card-text">
                        {{item.description}}
                    </h6>
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
        },
        user_id: {
        type: Number,
        default: 0
        }
    },
    watch:{
        'path' : 'reload'
    },
    created() {
        this.reload();
    }, methods: {
        voteclick(item) {
            const user_id = 12, cont_id = item.id, voted = item.voted;
            if (voted) {
                axios.delete("https://asw-edu-jd-eric-arnau.herokuapp.com/api/votes/?contribution_id=" + cont_id + "&user_id=" + user_id, {
                    headers: {
                        'Authorization': 'Token 0eaf2aac090866a76186b82094bca43d7233c9cd'
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
                axios.post("https://asw-edu-jd-eric-arnau.herokuapp.com/api/votes/", {
                    user_id: user_id,
                    contribution_id: cont_id
                }, {
                    headers: {
                        'Authorization': 'Token 0eaf2aac090866a76186b82094bca43d7233c9cd'
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
            let url = this.$props.path;
            if (this.$route.query.id) url += '&user_id=' + this.$route.query.id;
            axios.get("https://asw-edu-jd-eric-arnau.herokuapp.com/api/contributions/" + url, {
                headers: {
                    'Authorization': 'Token 0eaf2aac090866a76186b82094bca43d7233c9cd'
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
