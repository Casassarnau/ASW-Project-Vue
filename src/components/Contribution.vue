<template>
     <div class="container">
        <div class="card text-white bg-dark mb-3" style="margin-bottom: 10px">
            <div class="row">
                <div v-if="result.voted" class="col-1" @click="voteclick(result)" style="background-image: url('arrow-down.svg'); background-repeat: no-repeat; background-size: 40px; background-position: center center;"></div>
                <div v-if="!result.voted" class="col-1" @click="voteclick(result)" style="background-image: url('arrow-up.svg'); background-repeat: no-repeat; background-size: 40px; background-position: center center;"></div>
                <div class="col-11 card-body" style="text-align: left; font-size: 0.8em;">
                    <router-link class="link" v-if="result.type == 'a'" :to="{path: '/contribution', query: { id: result.id }}"><h5 class="card-title">{{result.title}}</h5></router-link>
                    <h5 class="card-title" v-if="result.type == 'u'"><a class="link" :href=result.url>{{result.title}}</a><a class="link link-2" style="font-size: 0.9em" :href="'https://' + result.domain"> ({{result.domain}})</a></h5>
                    <p class="card-text" style="color: rgb(179, 179, 179);">{{ result.points }} points by <router-link class="link" :to="{path: '/profile', query: { userid: result.user_id }}">{{result.username}}</router-link>
                        {{result.time}}
                        <router-link v-if="result.type == 'r' || result.type == 'c'" class="link" :to="{path: '/contribution', query: {id: result.parent}}">| parent</router-link>
                        <router-link v-if="result.type == 'r' || result.type == 'c'" class="link" :to="{path: '/contribution', query: {id: result.super_parent}}"> | On: {{result.super_parent_title}}</router-link>
                        <span style="float:right;">
                            <router-link v-if="result.type == 'a' || result.type == 'u'" class="link" :to="{path: '/contribution', query: { id: result.id }}">{{ result.number_comments != 0 ? result.number_comments + ' comments' : 'discuss' }}</router-link>
                            <router-link v-if="result.type == 'c' || result.type == 'r'" class="link" :to="{path: '/contribution', query: { id: result.id }}">reply</router-link>
                        </span>
                    </p>
                    <h6 v-if="result.type == 'r' || result.type == 'c' || result.type == 'a'" class="card-text">
                        {{result.description}}
                    </h6>
                </div>
            </div>
        </div>
        
        <div>
            <div>
                
                <textarea class="form-control"  v-model="comment_form" placeholder="Leave a comment here" id="floatingTextarea" maxlength="5000" rows="4"></textarea>
            </div>

            <div class="col-auto" :style="'margin-top: 15px;'">
                    <span style="float:right; "> 
                        <button class="btn btn-primary mb-3" @click="submit()" :disabled="comment_form==''">Post</button>
                    </span> 
            </div>    
        </div>

        

        <div :style="'margin-top: 100px'">
            <p class="text-start">Comments</p>
            <hr>
            <div class="card text-white bg-dark mb-3" :style="'margin-bottom: 10px; margin-left: '+ item.level + 'px'" v-for="item in comments" :key="item">
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
        
        
    </div>



</template>



<script>
    import axios from "axios";
    
    export default {
        data () {
            return {
                result: {},
                comments: null,
                comment_form: ''
            }
        },
        watch:{
            '$route.query.id' : 'reload'
        },
        created() {
            this.reload();
        }, methods: {
            reload() {
                
                let id = this.$route.query.id;
                axios.get("https://asw-edu-jd-eric-arnau.herokuapp.com/api/contributions/" + id, {
                    headers: {
                        'Authorization': 'Token 0eaf2aac090866a76186b82094bca43d7233c9cd'
                    }
                }).then((result) => {
                    if (result.status == 200) {
                        let comments = result.data.comments.slice();
                        result.data.comments = this.list_comments(comments, 0);
                        this.comments = result.data.comments;
                        this.result = result.data;
                        console.log(result.data);
                    } else {
                        console.log(result.data);
                    }
                })
            },
            submit() {
                console.log(this.comment_form);
                axios.post("https://asw-edu-jd-eric-arnau.herokuapp.com/api/contributions/" ,{
                        description : this.comment_form,
                        contribution_id : this.result.id 
                    }, {
                    headers: {
                        'Authorization' : 'Token 0eaf2aac090866a76186b82094bca43d7233c9cd'
                    }
                }).then((result) => {
                    if (result.status == 201) {
                        console.log("success");
                        this.comment_form = '';
                        this.reload();
                    } else {
                        console.log(result.data);
                    }
                })
            },
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
            list_comments(list, level) { 
                console.log(list);
                console.log(level);
                let list_new = [];
                            
                for (let i = 0; i < list.length; i++) {
                    let item = list[i];
                    item['level'] = level;
                    let aux = this.list_comments(item.comments, level+30);
                    list_new.push(item);
                    for (let j = 0; j < aux.length; j++) {
                        list_new.push(aux[j]);    
                    }
                } 
                
                return list_new;
            }
            
        }
    }

</script>
