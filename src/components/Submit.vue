<template>

    <form @submit.prevent="submitForm"
        style="max-width:600px;margin:auto;">
        <p class="h4 text-center mb-4">Submit</p>
        
        <div class="form-floating mt-3 mb-3" style="color:black">
            <input

            type="title"
            v-model="title"
            class="form-control"
            id="floatingInput"
            placeholder="Title"
            
            />
            <label for="floatingInput" class="title">Title</label>

        
            
        </div>
        <div class="form-floating " style="color:black">
            <input
            type="url"
            v-model="url"
            class="form-control"
            id="floatingInput"
            placeholder="Url"
            />
            <label for="floatingInput">Url</label>
        </div>
         <div class="form-floating mt-3">
            <tr>
                <td></td>
                <td><b>or</b></td>
            </tr>
        </div>
  
        <div class="form-floating mt-3" style="color:black">
            <input
            type="text"
            v-model="text"
            class="form-control"
            id="floatinginput"
            placeholder="Text"
            />
            <label for="floatingInput">Text</label>
        </div>
        <div class="col-12 mt-3">
            <button class="btn btn-primary mt-3" :disabled="((this.title=='' || ( this.text=='' && this.url=='' )))">Submit </button>
        </div>
    </form>
</template>

<script>


import useValidate from '@vuelidate/core'
import { required,minLength,sameAs } from '@vuelidate/validators'
import axios from "axios";


export default {
  
  data() {
    return {  
     title: '',
     url: '',
     text: '',
    }
  },

  methods : {
     submitForm() {
        const isAsk = !!this.text && !this.url
        const isUrl = !!this.url && !this.text
        const isComment = !!this.text && !!this.url
    
        
        if(isAsk){
           
            axios.post("https://asw-edu-jd-eric-arnau.herokuapp.com/api/contributions/" ,{
                    
                        title: this.title,
                        description: this.text 
                    }, {
                    headers: {
                        'Authorization' : 'Token f18ec8d59279592f810ebe5842256bf332f4acc7'
                    }
                }).then((result) => {
                    if (result.status == 201) {
                        console.log("success");
                         this.$router.push({ path: '/newest'});
                    } else {
                        console.log(result.data);
                    }
                })
        }
        else if(isUrl){
            
            axios.post("https://asw-edu-jd-eric-arnau.herokuapp.com/api/contributions/" ,{
                    
                        title: this.title,
                        url : this.url 
                    }, {
                    headers: {
                        'Authorization' : 'Token f18ec8d59279592f810ebe5842256bf332f4acc7'
                    }
                }).then((result) => {
                    if (result.status == 201) {
                        console.log("success");
                        this.$router.push({ path: '/newest'});
                    }
                }).catch((error) => {
                    console.log(error.response)
                    if (error.response.status === 409) {
                        const id = error.response.data.detail.split(": ")[1];
                        this.$router.push({ path: '/contribution?id='+id });

                    }
                    else {
                        console.log(error.response.data);
                    }
                })
        }
        else if(isComment){
                                   
            axios.post("https://asw-edu-jd-eric-arnau.herokuapp.com/api/contributions/" ,{
                    
                        title: this.title,
                        url: this.url,
                        description: this.description
                    }, {
                    headers: {
                        'Authorization' : 'Token f18ec8d59279592f810ebe5842256bf332f4acc7'
                    }
                }).then((result) => {
                    if (result.status == 201) {
                        console.log("success");
                        this.$router.push({ path: '/newest'});
                    } 
                }).catch((error) => {
                    console.log(error.response)
                    if (error.response.status === 409) {
                        const id = error.response.data.detail.split(": ")[1];
                        this.$router.push({ path: '/contribution?id='+id});

                    }
                    else {
                        console.log(error.response.data);
                    }
                })
        }
       
        
     },

     
 }
};

</script>
