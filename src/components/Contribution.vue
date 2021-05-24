<template>
     <div class="container">
        <div class="card text-white bg-dark mb-3" style="margin-bottom: 10px" :key="item">
            <div class="row">
                <div v-if="item.voted" class="col-1" @click="voteclick(item)" style="background-image: url('arrow-down.svg'); background-repeat: no-repeat; background-size: 40px; background-position: center center;"></div>
                <div v-if="!item.voted" class="col-1" @click="voteclick(item)" style="background-image: url('arrow-up.svg'); background-repeat: no-repeat; background-size: 40px; background-position: center center;"></div>
                <div class="col-11 card-body" style="text-align: left">
                    <router-link class="link" v-if="item.type == 'a'" :to="{path: '/contibution', query: { id: item.id }}"><h5 class="card-title">{{item.title}}</h5></router-link>
                    <a class="link" v-if="item.type == 'u'" :href=item.url><h5 class="card-title">{{item.title}}</h5></a>
                    <p class="card-text">{{ item.points }} points by <router-link class="link" :to="{path: '/profile', query: { username: item.username }}">{{item.username}}</router-link>
                    {{item.time}}
                        <span style="float:right;">
                        <router-link class="link" :to="{path: '/contibution', query: { id: item.id }}">{{ item.number_comments != 0 ? item.number_comments + ' comments' : 'discuss' }}</router-link>
                        </span></p>
                </div>
            </div>
        </div>
    </div>
</template>